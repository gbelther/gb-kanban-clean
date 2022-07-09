/* eslint-disable max-classes-per-file */
import { faker } from '@faker-js/faker';
import { GetStorage } from '@/data/contracts/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/contracts/http';
import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator';

class GetStorageSpy implements GetStorage {
  key: string;

  get(key: string): any {
    this.key = key;
    return null;
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
});
