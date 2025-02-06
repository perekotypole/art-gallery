type HTTPApiOptions = {
  payload?: BodyInit | null;
  query?: Record<string, string>;
  method: "POST" | "GET" | "DELETE" | "PUT";
};

type HTTPApiResponse = {
  json<T = unknown>(): never | Promise<T>;
} & Response;

export type { HTTPApiOptions, HTTPApiResponse };
