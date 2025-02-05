import { type FindManyOptions, type FindOptionsWhere, Like } from "typeorm";

import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from "~/libs/controller/controller.js";
import { database } from "~/libs/database/database.js";
import { APIPath } from "~/libs/enums/enums.js";

import { ArtworkEntity } from "./artwork.entity.js";
import type {
  ArtworkCreateRequest,
  ArtworkFindAllRequest,
} from "./libs/types/types.js";
import { artworkCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class ArtworkController extends BaseController {
  private repository = database.getRepository(ArtworkEntity);

  public constructor() {
    super(APIPath.ARTWORKS);

    this.addRoute({
      handler: (options) =>
        this.findAll(
          options as APIHandlerOptions<{
            query: ArtworkFindAllRequest;
          }>,
        ),
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

  private async findAll(
    options: APIHandlerOptions<{
      query: ArtworkFindAllRequest;
    }>,
  ): Promise<APIHandlerResponse> {
    const { price, artist, type, title } = options.query;

    const findOptions: FindManyOptions<ArtworkEntity> = {
      select: [
        "id",
        "title",
        "artist",
        "price",
        "type",
        "created_at",
        "updated_at",
        "availability",
      ],
    };

    if (price) {
      findOptions.order = { ...findOptions.order, price };
    }

    if (artist) {
      findOptions.where = {
        ...(findOptions.where as FindOptionsWhere<ArtworkEntity>),
        artist,
      };
    }

    if (type) {
      findOptions.where = {
        ...(findOptions.where as FindOptionsWhere<ArtworkEntity>),
        type,
      };
    }

    if (title) {
      findOptions.where = {
        ...(findOptions.where as FindOptionsWhere<ArtworkEntity>),
        title: Like(`%${title}%`),
      };
    }

    const list = await this.repository.find(findOptions);

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
