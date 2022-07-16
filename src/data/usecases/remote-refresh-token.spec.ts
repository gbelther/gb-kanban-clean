import { faker } from '@faker-js/faker';
import { UnexpectedError } from '@/domain/errors';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../contracts/http';
import { RemoteRefreshToken } from './remote-refresh-token';

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
  sut: RemoteRefreshToken;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteRefreshToken(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteRefreshToken', () => {
  it('should call HttpClient with correct url', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const refreshToken = faker.datatype.uuid();
    await sut.refresh({ refreshToken });
    expect(httpClientSpy.url).toEqual(url);
  });

  it('should call HttpClient with correct method', async () => {
    const { sut, httpClientSpy } = makeSut();
    const refreshToken = faker.datatype.uuid();
    await sut.refresh({ refreshToken });
    expect(httpClientSpy.method).toEqual('POST');
  });

  it('should call HttpClient with correct param', async () => {
    const { sut, httpClientSpy } = makeSut();
    const refreshToken = faker.datatype.uuid();
    await sut.refresh({ refreshToken });
    expect(httpClientSpy.body).toEqual({ refreshToken });
  });

  it('should return AccessToken and RefreshToken if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const returnData = {
      accessToken: faker.datatype.uuid(),
      refreshToken: faker.datatype.uuid(),
    };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      data: returnData,
    };
    const tokens = await sut.refresh({
      refreshToken: faker.datatype.uuid(),
    });
    expect(tokens).toEqual(returnData);
  });

  it('should return AccessToken and RefreshToken if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(async () => ({
      statusCode: HttpStatusCode.badRequest,
      data: faker.random.words(),
    }));
    const promise = sut.refresh({
      refreshToken: faker.datatype.uuid(),
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
