import { UpdateTask } from '@/domain/usecases';
import { HttpClient } from '../contracts/http';

export class RemoteUpdateTask implements UpdateTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateTask.Model>,
  ) {}

  async update(data: UpdateTask.Params): Promise<UpdateTask.Model> {
    await this.httpClient.request({
      url: `${this.url}/${data.id}`,
      method: 'PATCH',
      body: data,
    });
    return null;
  }
}
