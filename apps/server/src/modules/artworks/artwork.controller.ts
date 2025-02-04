import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from "~/libs/controller/controller.js";
import { database } from "~/libs/database/database.js";
import { APIPath } from "~/libs/enums/enums.js";

import { ArtworkEntity } from "./artwork.entity.js";
import type { ArtworkCreateRequest } from "./libs/types/types.js";
import { artworkCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

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
      handler: (options) =>
        this.create(
          options as APIHandlerOptions<{
            body: ArtworkCreateRequest;
          }>,
        ),
      method: "POST",
      path: "/",
      validation: {
        body: artworkCreateValidationSchema,
      },
    });
  }

  private async findAll(): Promise<APIHandlerResponse> {
    const list = await this.repository.find();

    return {
      payload: list,
      status: 200,
    };
  }

  private async create(
    options: APIHandlerOptions<{
      body: ArtworkCreateRequest;
    }>,
  ): Promise<APIHandlerResponse> {
    const { body } = options;

    const entity = this.repository.create({
      ...body,
      availability: body.availability ?? false,
    });
    const newArtwork = await this.repository.save(entity);

    return {
      payload: newArtwork,
      status: 200,
    };
  }
}

export { ArtworkController };
