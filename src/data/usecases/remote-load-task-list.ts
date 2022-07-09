import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadTaskList } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../contracts/http';

export class RemoteLoadTaskList implements LoadTaskList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadTaskList.Model>,
  ) {}

  async loadAll(): Promise<LoadTaskList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return null;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
