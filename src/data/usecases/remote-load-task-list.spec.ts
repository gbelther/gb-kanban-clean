/* eslint-disable no-plusplus */
import { faker } from '@faker-js/faker';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../contracts/http';
import { RemoteLoadTaskList } from './remote-load-task-list';
import { LoadTaskList } from '@/domain/usecases';

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

const makeRemoteTaskListModel = (length = 2): LoadTaskList.Model[] => {
  const list: LoadTaskList.Model[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: faker.datatype.uuid(),
      title: faker.random.words(),
      content: faker.random.words(),
      statusId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
    });
  }
  return list;
};

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

  it('should return a list of TaskModels if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const length = faker.datatype.number(10);
    const taskList = makeRemoteTaskListModel(length);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      data: taskList,
    };
    const httpResponse = await sut.loadAll();
    expect(httpResponse).toHaveLength(length);
  });
});
