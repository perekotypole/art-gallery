import { Router, type Request, type Response } from "express";
import { type Schema as ValidationSchema } from "zod";

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

  private validateData = (schema: ValidationSchema, data: unknown) => {
    schema.parse(data);
  }

  protected addRoute(options: ControllerRouteParameters): void {
    const { handler, method, path, validation } = options;
    const fullPath = this.apiUrl + path;

    const routeHandler = async (req: Request, res: Response): Promise<void> => {
      try {
        if (validation?.body) {
          this.validateData(validation.body, req.body)
        }
        if (validation?.query) {
          this.validateData(validation.query, req.query)
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
        logger.error(
          LoggerEntity.API,
          `Route handler error: ${error as Error}`,
        );
        res.status(500).json({
          error: "Internal server error",
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
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
}

export { BaseController, type APIHandlerResponse, type APIHandlerOptions };
