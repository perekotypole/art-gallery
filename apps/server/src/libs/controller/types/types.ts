import { type Schema as ValidationSchema } from "zod";

type APIHandlerResponse = {
  payload: unknown;
  status: number;
};

type DefaultApiHandlerOptions = {
  body?: unknown;
  headers?: unknown;
  params?: unknown;
  query?: unknown;
};

type APIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T["body"];
  headers: T["headers"];
  params: T["params"];
  query: T["query"];
};

type ControllerRouteParameters = {
  handler: (
    options: DefaultApiHandlerOptions,
  ) => APIHandlerResponse | Promise<APIHandlerResponse>;
  method: "POST" | "GET" | "DELETE" | "PUT";
  path: string;
  validation?: {
    body?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export type {
  APIHandlerResponse,
  APIHandlerOptions,
  ControllerRouteParameters,
};
