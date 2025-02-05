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
  ArtworkUpdateRequest,
} from "./libs/types/types.js";
import {
  artworkCreateValidationSchema,
  artworkUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

class ArtworkController extends BaseController {
  private repository = database.getRepository(ArtworkEntity);

  public constructor() {
    super(APIPath.ARTWORKS);

    this.addRoute({
      handler: (options) =>
        this.find(
          options as APIHandlerOptions<{
            params: {
              id: string;
            };
          }>,
        ),
      method: "GET",
      path: "/:id",
    });

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

    this.addRoute({
      handler: (options) =>
        this.delete(
          options as APIHandlerOptions<{
            params: {
              id: string;
            };
          }>,
        ),
      method: "DELETE",
      path: "/:id",
    });

    this.addRoute({
      handler: (options) =>
        this.update(
          options as APIHandlerOptions<{
            params: {
              id: string;
            };
            body: ArtworkUpdateRequest;
          }>,
        ),
      method: "PUT",
      path: "/:id",
      validation: {
        body: artworkUpdateValidationSchema,
      },
    });
  }

  private async find(
    options: APIHandlerOptions<{
      params: {
        id: string;
      };
    }>,
  ): Promise<APIHandlerResponse> {
    const entity = await this.repository.findOneBy({
      id: options.params.id,
    });

    if (entity === null) {
      return {
        payload: null,
        status: 404,
      };
    }

    return {
      payload: entity,
      status: 200,
    };
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

  private async delete(
    options: APIHandlerOptions<{
      params: {
        id: string;
      };
    }>,
  ): Promise<APIHandlerResponse> {
    const entity = await this.repository.delete(options.params.id);

    return {
      payload: entity,
      status: 200,
    };
  }

  private async update(
    options: APIHandlerOptions<{
      params: {
        id: string;
      };
      body: ArtworkUpdateRequest;
    }>,
  ): Promise<APIHandlerResponse> {
    const entity = await this.repository.findOneBy({
      id: options.params.id,
    });

    if (entity === null) {
      return {
        payload: null,
        status: 404,
      };
    }

    const result = await this.repository.save(
      Object.assign(new ArtworkEntity(), entity, options.body, {
        availability: options.body.availability ?? entity.availability ?? false,
      }),
    );

    return {
      payload: result,
      status: 200,
    };
  }
}

export { ArtworkController };
