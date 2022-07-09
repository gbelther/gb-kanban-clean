import { LoadTaskList } from '@/domain/usecases';
import { HttpClient } from '../contracts/http';

export class RemoteLoadTaskList implements LoadTaskList {
  constructor(private readonly httpClient: HttpClient<LoadTaskList.Model>) {}

  async loadAll(): Promise<LoadTaskList.Model[]> {
    await this.httpClient.request({
      url: '',
      method: 'GET',
    });
    return null;
  }
}
