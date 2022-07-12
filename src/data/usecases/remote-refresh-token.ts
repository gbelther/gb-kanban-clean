import { RefreshTokenModel } from '@/domain/models';
import { RefreshToken } from '@/domain/usecases';
import { GetStorage } from '../contracts/cache';

export class RemoteRefreshToken implements RefreshToken {
  constructor(private readonly getStorage: GetStorage) {}

  async refresh(): Promise<RefreshTokenModel> {
    this.getStorage.get('@GB-Kanban/session-account');
    return null;
  }
}
