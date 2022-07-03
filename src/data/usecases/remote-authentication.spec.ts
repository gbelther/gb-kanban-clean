import { faker } from '@faker-js/faker';
import { Authentication } from '@/domain/usecases';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../contracts';
import { RemoteAuthentication } from './remote-authentication';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

const makeAuthParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
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

class HttpClientSpy implements HttpClient {
  url: string;

  method: string;

  body: any;

  response: HttpResponse = {
    statusCode: 200,
    data: JSON.parse(faker.datatype.json()),
  };

  async request(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;

    return this.response;
  }
}

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

  it('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut();
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(async () => ({
      statusCode: HttpStatusCode.unauthorized,
      data: faker.random.words(),
    }));
    const authPromise = sut.auth(makeAuthParams());
    await expect(authPromise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should throw UnexpectedError if HttpClient any statusCode not equal 401 and 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(async () => ({
      statusCode: HttpStatusCode.badRequest,
      data: faker.random.words(),
    }));
    const authPromise = sut.auth(makeAuthParams());
    await expect(authPromise).rejects.toThrow(new UnexpectedError());
  });

  it('should return an account if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const accountModel = makeAccountModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      data: accountModel,
    };
    const account = await sut.auth(makeAuthParams());
    expect(account).toEqual(accountModel);
  });
});
