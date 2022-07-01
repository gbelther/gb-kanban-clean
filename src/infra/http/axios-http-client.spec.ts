import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    mockedAxios.request.mockResolvedValue({ data: 'any_data', status: 123 });
    const { sut } = makeSut();
    const requestParams = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod(),
    };
    await sut.request(requestParams);
    expect(mockedAxios.request).toHaveBeenCalledWith(requestParams);
  });
});
