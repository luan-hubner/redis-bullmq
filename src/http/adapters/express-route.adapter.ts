import { Request, Response } from 'express';
import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest } from '../../presentation/protocols/http';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      params: req.params,
      body: req.body,
      headers: req.headers,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  };
};
