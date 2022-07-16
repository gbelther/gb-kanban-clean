import { RemoteRefreshToken } from '@/data/usecases/remote-refresh-token';
import { RefreshToken } from '@/domain/usecases';
import { makeAxiosHttpClient, makeUrl } from '../http';

export const makeRemoteRefreshToken = (): RefreshToken =>
  new RemoteRefreshToken(makeUrl('/refresh-token'), makeAxiosHttpClient());
