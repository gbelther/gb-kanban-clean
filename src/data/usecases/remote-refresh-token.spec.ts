import { faker } from '@faker-js/faker';
import { GetStorage } from '../contracts/cache';
import { RemoteRefreshToken } from './remote-refresh-token';

class GetStorageSpy implements GetStorage {
  key: string;
  value: any = JSON.parse(faker.datatype.json());

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}

type SutTypes = {
  sut: RemoteRefreshToken;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new RemoteRefreshToken(getStorageSpy);
  return {
    sut,
    getStorageSpy,
  };
};

describe('RemoteRefreshToken', () => {
  it('should call GetStorage', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.refresh();
    expect(getStorageSpy.key).toEqual('@GB-Kanban/session-account');
  });
});
