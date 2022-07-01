import axios from 'axios';
import { HttpRequest, HttpResponse, HttpClient } from '@/data/contracts';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    try {
      const axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
      });
      return {
        data: axiosResponse.data,
        status: axiosResponse.status,
      };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
}
