import express from "express";
import debug from "debug";

import configService from "../services/config.service";
import { HTTP400Error } from "../../common/utils/error.utils";

const log: debug.IDebugger = debug("app:config-middleware");

class ConfigMiddleware {
  async validateThereIsNoExistingConfig(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const config = await configService.get();
    if (config) {
      res.status(400).send({ error: "A config object already exists" });
      throw new HTTP400Error("A config object already exists");
    } else {
      next();
    }
  }
}

export default new ConfigMiddleware();
