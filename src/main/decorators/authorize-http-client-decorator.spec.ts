import { faker } from '@faker-js/faker';
import { GetStorage } from '@/data/contracts/cache';
import { HttpRequest } from '@/data/contracts/http';
import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator';

class GetStorageSpy implements GetStorage {
  key: string;

  get(key: string): any {
    this.key = key;
    return null;
  }
}

const makeHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.internet.httpMethod(),
  body: JSON.parse(faker.datatype.json()),
});

type SutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy);
  return {
    sut,
    getStorageSpy,
  };
};

describe('AuthorizeHttpClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.request(makeHttpRequest());
    expect(getStorageSpy.key).toBe('@GB-Kanban/session-account');
  });
});
