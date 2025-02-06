import { BaseHTTPApi } from "~/libs/modules/api/api.js";

import {
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
  type ArtworkCreateRequest,
  type ArtworkCreateResponse,
  type ArtworkFindResponse,
} from "./types/types.js";

class ArtworkApi extends BaseHTTPApi {
  public constructor() {
    super({ path: "/artworks" });
  }

  public async getAll(
    query: ArtworkFindAllRequest,
  ): Promise<ArtworkFindAllResponse> {
    const response = await this.load(this.getFullEndpoint("/", {}), {
      method: "GET",
      query,
    });

    return await response.json<ArtworkFindAllResponse>();
  }

  public async create(
    payload: ArtworkCreateRequest,
  ): Promise<ArtworkCreateResponse> {
    const response = await this.load(this.getFullEndpoint("/", {}), {
      method: "POST",
      payload: JSON.stringify(payload),
    });

    return await response.json<ArtworkCreateResponse>();
  }

  public async getById(payload: { id: string }): Promise<ArtworkFindResponse> {
    const response = await this.load(
      this.getFullEndpoint("/:id", { id: payload.id }),
      {
        method: "GET",
      },
    );

    return await response.json<ArtworkFindResponse>();
  }
}

export { ArtworkApi };
