import { faker } from '@faker-js/faker';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../contracts/http';
import { RemoteLoadTaskList } from './remote-load-task-list';

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
  sut: RemoteLoadTaskList;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadTaskList(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadTaskList', () => {
  it('should call HttpClient with correct method', async () => {
    const { sut, httpClientSpy } = makeSut();
    await sut.loadAll();
    expect(httpClientSpy.method).toBe('GET');
  });

  it('should call HttpClient with correct url', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
  });

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const loadAllPromise = sut.loadAll();
    await expect(loadAllPromise).rejects.toThrow(new AccessDeniedError());
  });

  it('should throw UnexpectedError if HttpClient returns another statusCode error', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const loadAllPromise = sut.loadAll();
    await expect(loadAllPromise).rejects.toThrow(new UnexpectedError());
  });
});
