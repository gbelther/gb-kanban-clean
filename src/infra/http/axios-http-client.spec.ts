import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';
import { HttpRequest, HttpResponse } from '@/data/contracts/http';

jest.mock('axios');

const makeHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.internet.httpMethod(),
  body: JSON.parse(faker.datatype.json()),
  headers: JSON.parse(faker.datatype.json()),
});

const makeHttpResponse = (): HttpResponse => ({
  data: JSON.parse(faker.datatype.json()),
  statusCode: faker.internet.httpStatusCode(),
});

const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(makeHttpResponse());
  return mockedAxios;
};

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut();
    const requestParams = makeHttpRequest();
    await sut.request(requestParams);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: requestParams.url,
      method: requestParams.method,
      data: requestParams.body,
      headers: requestParams.headers,
    });
  });

  it('should return the correct value', async () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = await sut.request(makeHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      data: axiosResponse.data,
      status: axiosResponse.status,
    });
  });

  it('should throw with correct error', async () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.request.mockRejectedValueOnce({ response: makeHttpResponse() });
    const httpResponsePromise = sut.request(makeHttpRequest());
    const axiosResponse = mockedAxios.request.mock.results[0].value;
    expect(httpResponsePromise).toEqual(axiosResponse);
  });
});
