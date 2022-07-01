import axios from 'axios';
import { faker } from '@faker-js/faker';
import {
  AxiosHttpClient,
  HttpRequest,
  HttpResponse,
} from './axios-http-client';

jest.mock('axios');

const makeHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.internet.httpMethod(),
});

const makeHttpResponse = (): HttpResponse => ({
  data: JSON.parse(faker.datatype.json()),
  status: faker.internet.httpStatusCode(),
});

const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(makeHttpResponse());
  return mockedAxios;
};

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return {
    sut,
  };
};

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const mockedAxios = mockAxios();
    const { sut } = makeSut();
    const requestParams = makeHttpRequest();
    await sut.request(requestParams);
    expect(mockedAxios.request).toHaveBeenCalledWith(requestParams);
  });

  it('should return the correct value', async () => {
    const mockedAxios = mockAxios();
    const { sut } = makeSut();
    const httpResponse = await sut.request(makeHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      data: axiosResponse.data,
      status: axiosResponse.status,
    });
  });
});
