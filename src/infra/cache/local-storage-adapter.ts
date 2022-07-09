import { GetStorage, SetStorage } from '@/data/contracts/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : item;
  }
}
