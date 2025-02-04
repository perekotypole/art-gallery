import {
  type APIHandlerResponse,
  BaseController,
} from "~/libs/controller/controller.js";
import { APIPath } from "~/libs/enums/enums.js";

class ArtworkController extends BaseController {
  public constructor() {
    super(APIPath.ARTWORKS);

    this.addRoute({
      handler: () => this.findAll(),
      method: "GET",
      path: "/",
    });
  }

  private findAll(): APIHandlerResponse {
    return {
      payload: [],
      status: 200,
    };
  }
}

export { ArtworkController };
