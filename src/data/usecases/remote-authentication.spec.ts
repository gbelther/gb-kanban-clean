import { faker } from '@faker-js/faker';
import { Authentication } from '@/domain/usecases';
import { HttpClient, HttpRequest, HttpResponse } from '../contracts';
import { RemoteAuthentication } from './remote-authentication';

class HttpClientSpy implements HttpClient {
  url: string;

  method: string;

  body: any;

  async request(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    return {
      statusCode: 200,
      data: JSON.parse(faker.datatype.json()),
    };
  }
}

const makeAuthParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteAuthentication(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const httpRequest = makeAuthParams();
    await sut.auth(httpRequest);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('POST');
    expect(httpClientSpy.body).toEqual(httpRequest);
  });
});
