import axios from 'axios';

export type HttpRequest = {
  url: string;
  method: string;
};

export type HttpResponse = {
  data: any;
  status: number;
};

interface HttpClient {
  request: (data: HttpRequest) => Promise<HttpResponse>;
}

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    const axiosResponse = await axios.request({
      url: data.url,
      method: data.method,
    });
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
    };
  }
}
