import { faker } from '@faker-js/faker';
import { LocalStorageAdapter } from './local-storage-adapter';

import 'jest-localstorage-mock';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = JSON.parse(faker.datatype.json());
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it('should call localStorage.remoteItem if value is falsy', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, null);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.get(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });
});
