import { HttpRequest, HttpResponse } from './http';

export interface Controller<Query = unknown, Params = unknown, Body = unknown, Res = unknown> {
  handle: (httpRequest: HttpRequest<Query, Params, Body>) => Promise<HttpResponse<Res>>;
}
