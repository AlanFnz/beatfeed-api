import express from "express";
import configService from "../services/config.service";
import debug from "debug";

import { getObjectId } from "../../common/utils/db.utils";
import { HttpStatusCode } from "../../common/constants/httpStatusCode.constants";

const log: debug.IDebugger = debug("app:config-controller");

class ConfigController {
  async getConfig(req: express.Request, res: express.Response) {
    const config = await configService.get();
    res.status(HttpStatusCode.SUCCESS).send(config);
  }

  async createConfig(req: express.Request, res: express.Response) {
    const configId = await configService.create(req.body);
    res.status(HttpStatusCode.CREATED).send(configId);
  }

  async updateConfig(req: express.Request, res: express.Response) {
    log(await configService.update(req.body));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async deleteConfig(req: express.Request, res: express.Response) {
    await configService.delete(getObjectId(req.body._id));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

}

export default new ConfigController();
