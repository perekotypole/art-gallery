import { BaseHTTPApi } from "~/libs/modules/api/api.js";

import {
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
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
}

export { ArtworkApi };
