import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadTaskStatusList } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../contracts/http';

export class RemoteLoadTaskStatusList implements LoadTaskStatusList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadTaskStatusList.Model[]>,
  ) {}

  async loadAll(): Promise<LoadTaskStatusList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return httpResponse.data || ([] as LoadTaskStatusList.Model[]);
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
