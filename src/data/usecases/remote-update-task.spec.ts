import { faker } from '@faker-js/faker';
import { UpdateTask } from '@/domain/usecases';
import { HttpClient, HttpRequest, HttpResponse } from '../contracts/http';
import { RemoteUpdateTask } from './remote-update-task';

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

const makeUpdateTaskParams = (): UpdateTask.Params => ({
  id: faker.datatype.uuid(),
  title: faker.random.word(),
  content: faker.random.words(),
  statusId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: RemoteUpdateTask;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteUpdateTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteUpdateTask', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const params = makeUpdateTaskParams();
    await sut.update(params);
    expect(httpClientSpy.url).toEqual(`${url}/${params.id}`);
  });

  it('should call HttpClient with correct Method', async () => {
    const { sut, httpClientSpy } = makeSut();
    await sut.update(makeUpdateTaskParams());
    expect(httpClientSpy.method).toEqual('PATCH');
  });

  it('should call HttpClient with correct Params', async () => {
    const { sut, httpClientSpy } = makeSut();
    const params = makeUpdateTaskParams();
    await sut.update(params);
    expect(httpClientSpy.body).toEqual(params);
  });
});
