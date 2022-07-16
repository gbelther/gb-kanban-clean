import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { UpdateTask } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../contracts/http';

export class RemoteUpdateTask implements UpdateTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateTask.Model>,
  ) {}

  async update(data: UpdateTask.Params): Promise<UpdateTask.Model> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${data.id}`,
      method: 'PATCH',
      body: data,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return httpResponse.data;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
    return null;
  }
}
