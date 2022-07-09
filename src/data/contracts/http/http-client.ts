export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export enum HttpStatusCode {
  success = 200,
  badRequest = 400,
  unauthorized = 401,
  serverError = 500,
}

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body: any;
};

export type HttpResponse<T = any> = {
  data: T;
  statusCode: HttpStatusCode;
};

export interface HttpClient<T = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<T>>;
}
