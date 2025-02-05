import { Router, type Request, type Response } from "express";
import { type Schema as ValidationSchema, ZodError } from "zod";

import { logger, LoggerEntity } from "~/libs/logger/logger.js";

import type {
  ControllerRouteParameters,
  APIHandlerOptions,
  APIHandlerResponse,
} from "./types/types.js";

class BaseController {
  private apiUrl: string;
  public router: Router;

  public constructor(apiPath: string) {
    this.apiUrl = apiPath;
    this.router = Router();
  }

  private validateData = (schema: ValidationSchema, data: unknown): void => {
    schema.parse(data);
  };

  protected addRoute(options: ControllerRouteParameters): void {
    const { handler, method, path, validation } = options;
    const fullPath = this.apiUrl + path;

    const routeHandler = async (req: Request, res: Response): Promise<void> => {
      try {
        if (validation?.body) {
          this.validateData(validation.body, req.body);
        }
        if (validation?.query) {
          this.validateData(validation.query, req.query);
        }

        const handlerOptions: APIHandlerOptions = {
          body: req.body,
          params: req.params,
          query: req.query,
          headers: req.headers,
        };

        const response = await handler(handlerOptions);
        res.status(response.status).json(response.payload);
      } catch (error: unknown) {
        this.handleError(error, req, res);
      }
    };

    switch (method) {
      case "GET":
        this.router.get(fullPath, routeHandler);
        break;
      case "POST":
        this.router.post(fullPath, routeHandler);
        break;
      case "PUT":
        this.router.put(fullPath, routeHandler);
        break;
      case "DELETE":
        this.router.delete(fullPath, routeHandler);
        break;
    }
  }

  private handleError(error: unknown, req: Request, res: Response): void {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    logger.error(
      LoggerEntity.API,
      JSON.stringify({
        message: errorMessage,
        method: req.method,
        path: req.originalUrl,
        body: req.body as unknown,
        query: req.query,
        params: req.params,
      }),
    );

    if (error instanceof ZodError) {
      const errors = error.errors.map((e) => e.message);
      res.status(400).json({
        error: "Validation error",
        message: errors.join(", "),
        details: error.errors,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        error: "Bad request",
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
        message: errorMessage,
      });
    }
  }
}

export { BaseController, type APIHandlerResponse, type APIHandlerOptions };
