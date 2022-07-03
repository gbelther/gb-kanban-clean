import { Authentication } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../contracts';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<Authentication.Model>,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.badRequest:
        throw new Error();
      default:
        return null;
    }
  }
}
