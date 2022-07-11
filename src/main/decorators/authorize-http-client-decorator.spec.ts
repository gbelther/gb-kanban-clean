/* eslint-disable max-classes-per-file */
import { faker } from '@faker-js/faker';
import { GetStorage } from '@/data/contracts/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/contracts/http';
import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator';
import { Authentication } from '@/domain/usecases';

class GetStorageSpy implements GetStorage {
  key: string;
  value: any = JSON.parse(faker.datatype.json());

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}

class HttpClientSpy implements HttpClient {
  url: string;
  method: string;
  body: any;
  headers?: any;

  response: HttpResponse = {
    statusCode: 200,
    data: JSON.parse(faker.datatype.json()),
  };

  async request(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;

    return this.response;
  }
}

const makeHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.internet.httpMethod(),
  body: JSON.parse(faker.datatype.json()),
});

const makeAccountModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  },
});

type SutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  };
};

describe('AuthorizeHttpClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.request(makeHttpRequest());
    expect(getStorageSpy.key).toBe('@GB-Kanban/session-account');
  });

  it('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod(),
      headers: {
        [faker.database.column()]: faker.random.words(),
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  it('should add headers', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = makeAccountModel();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod(),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${getStorageSpy.value.accessToken}`,
    });
  });

  it('should merge headers', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = makeAccountModel();
    const prevHeaders = { [faker.database.column()]: faker.random.words() };
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod(),
      headers: prevHeaders,
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.headers).toEqual({
      ...prevHeaders,
      Authorization: `Bearer ${getStorageSpy.value.accessToken}`,
    });
  });

  it('should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResponse = await sut.request(makeHttpRequest());
    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
