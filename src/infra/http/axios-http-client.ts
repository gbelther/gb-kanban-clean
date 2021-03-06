import axios from 'axios';
import { HttpRequest, HttpResponse, HttpClient } from '@/data/contracts/http';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    try {
      const axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
      return {
        data: axiosResponse.data,
        statusCode: axiosResponse.status,
      };
    } catch (error) {
      return {
        data: error.response.data,
        statusCode: error.response.status,
      };
    }
  }
}
