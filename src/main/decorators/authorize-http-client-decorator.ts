import { GetStorage } from '@/data/contracts/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/contracts/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient,
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('@GB-Kanban/session-account');
    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          authorization: account.accessToken,
        }),
      });
    }
    const httpRequest = await this.httpClient.request(data);
    return httpRequest;
  }
}
