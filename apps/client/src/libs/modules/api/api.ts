import {
  configureQueryString,
  configureString,
} from "./libs/helpers/helpers.js";
import type { HTTPApiOptions, HTTPApiResponse } from "./libs/types/types.js";

const BASE_API_URL = import.meta.env["VITE_APP_SERVER_URL"] as string;

type Constructor = {
  path: string;
};

class BaseHTTPApi {
  private baseUrl = BASE_API_URL;

  private path: string;

  public constructor({ path }: Constructor) {
    this.path = path;
  }

  private async checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `HTTP Error: ${String(response.status)} - ${response.statusText} | ${errorText}`,
      );
    }

    return response;
  }

  protected async load(
    path: string,
    options: HTTPApiOptions,
  ): Promise<HTTPApiResponse> {
    const { method, payload = null, query } = options;

    const url = configureQueryString(path, query);

    const response = await fetch(url, {
      body: payload,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return (await this.checkResponse(response)) as HTTPApiResponse;
  }

  protected getFullEndpoint<T extends Record<string, string>>(
    ...parameters: [...string[], T]
  ): string {
    const copiedParameters = [...parameters];

    const options = copiedParameters.pop() as T;

    return configureString(
      this.baseUrl,
      this.path,
      ...(copiedParameters as string[]),
      options,
    );
  }
}

export { BaseHTTPApi };
