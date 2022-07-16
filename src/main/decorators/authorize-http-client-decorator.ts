import { GetStorage, SetStorage } from '@/data/contracts/cache';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@/data/contracts/http';
import { UnexpectedError } from '@/domain/errors';
import { RefreshToken } from '@/domain/usecases';

export class AuthorizeHttpClientDecorator implements HttpClient {
  private data: HttpRequest;

  constructor(
    private readonly getStorage: GetStorage,
    private readonly setStorage: SetStorage,
    private readonly httpClient: HttpClient,
    private readonly refreshToken: RefreshToken,
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    this.data = data;
    this.setHeader();

    const httpRequest = await this.httpClient.request(this.data);

    if (httpRequest.statusCode === HttpStatusCode.forbidden) {
      const httpRequestRefreshed = await this.refreshTokenRequest();
      return httpRequestRefreshed;
    }
    return httpRequest;
  }

  private setHeader() {
    const account = this.getStorage.get('@GB-Kanban/session-account');
    if (account?.accessToken) {
      this.data = Object.assign(this.data, {
        headers: Object.assign(this.data.headers || {}, {
          Authorization: `Bearer ${account.accessToken}`,
        }),
      });
    }
  }

  private async refreshTokenRequest() {
    const account = this.getStorage.get('@GB-Kanban/session-account');
    const tokens = await this.refreshToken.refresh({
      refreshToken: account.refreshToken,
    });
    if (tokens.accessToken && tokens.refreshToken) {
      this.setStorage.set('@GB-Kanban/session-account', {
        ...account,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      this.setHeader();
      const httpRequestRefreshed = await this.httpClient.request(this.data);
      return httpRequestRefreshed;
    }
    throw new UnexpectedError();
  }
}
