export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export enum HttpStatusCode {
  success = 200,
  badRequest = 400,
  serverError = 500,
}

export type HttpRequest = {
  url: string;
  method: HttpMethod;
};

export type HttpResponse<T = any> = {
  data: T;
  status: HttpStatusCode;
};

export interface HttpClient {
  request: (data: HttpRequest) => Promise<HttpResponse>;
}
