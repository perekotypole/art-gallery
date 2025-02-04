import {
  APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from "~/libs/controller/controller.js";
import { database } from "~/libs/database/database.js";
import { APIPath } from "~/libs/enums/enums.js";

import { ArtworkEntity } from "./artwork.entity.js";

class ArtworkController extends BaseController {
  private repository = database.getRepository(ArtworkEntity);

  public constructor() {
    super(APIPath.ARTWORKS);

    this.addRoute({
      handler: () => this.findAll(),
      method: "GET",
      path: "/",
    });

    this.addRoute({
      handler: (options) => this.create(
        options as APIHandlerOptions<{
          body: {
            title: string,
            artist: string,
            type: string,
            price: number,
            availability?: boolean,
          };
        }>,
      ),
      method: "POST",
      path: "/",
    });
  }

  private async findAll(): Promise<APIHandlerResponse> {
    const list = await this.repository.find()

    return {
      payload: list,
      status: 200,
    };
  }

  private async create(
    options: APIHandlerOptions<{
      body: {
        title: string,
        artist: string,
        type: string,
        price: number,
        availability?: boolean
      };
    }>
  ): Promise<APIHandlerResponse> {
    const newArtwork = await this.repository.create(options.body)
    const result = await this.repository.save(newArtwork)

    return {
      payload: result,
      status: 200,
    };
  }
}

export { ArtworkController };
