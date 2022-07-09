import { HttpClient } from '@/data/contracts/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator';
import { makeLocalStorageAdapter } from '../cache';
import { makeAxiosHttpClient } from '../http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
  );
