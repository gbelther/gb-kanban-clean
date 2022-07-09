import { faker } from '@faker-js/faker';
import { HttpClient, HttpRequest, HttpResponse } from '../contracts/http';
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

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadTaskList(httpClientSpy);
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
});
