import { GetStorage } from '@/data/contracts/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/contracts/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(private readonly getStorage: GetStorage) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    this.getStorage.get('@GB-Kanban/session-account');
    return null;
  }
}
