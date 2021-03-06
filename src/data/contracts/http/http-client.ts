export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export enum HttpStatusCode {
  success = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  serverError = 500,
}

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export type HttpResponse<T = any> = {
  data?: T;
  statusCode: HttpStatusCode;
};

export interface HttpClient<T = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<T>>;
}
