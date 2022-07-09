import { RemoteAuthentication } from '@/data/usecases/remote-authentication';
import { Authentication } from '@/domain/usecases';
import { makeAxiosHttpClient, makeUrl } from '../http';

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeUrl('/sessions'), makeAxiosHttpClient());
