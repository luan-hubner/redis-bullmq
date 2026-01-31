export type HttpHeaders = Record<string, string | string[] | undefined>;

export interface HttpResponse<Body = unknown> {
  statusCode: number;
  body?: Body;
  headers?: HttpHeaders;
}

export interface HttpRequest<
  Query = unknown,
  Params = unknown,
  Body = unknown,
  Headers = HttpHeaders,
> {
  query?: Query;
  params?: Params;
  body?: Body;
  headers?: Headers;
}
