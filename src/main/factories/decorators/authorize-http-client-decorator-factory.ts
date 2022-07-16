/* eslint-disable import/no-cycle */
import { HttpClient } from '@/data/contracts/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator';
import { makeLocalStorageAdapter } from '../cache';
import { makeAxiosHttpClient } from '../http';
import { makeRemoteRefreshToken } from '../usecases';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
    makeRemoteRefreshToken(),
  );
