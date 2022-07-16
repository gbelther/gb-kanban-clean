import { RefreshToken } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../contracts/http';

export class RemoteRefreshToken implements RefreshToken {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RefreshToken.Model>,
  ) {}

  async refresh(params: RefreshToken.Params): Promise<RefreshToken.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return httpResponse.data;
      default:
        return null;
    }
  }
}
