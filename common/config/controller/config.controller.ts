import express from "express";
import configService from "../services/config.service";
import debug from "debug";

import { PatchConfigDto } from "../dto/patch.config.dto";
import { getObjectId } from "../../utils/util";

const log: debug.IDebugger = debug("app:config-controller");

class ConfigController {
  async getConfig(req: express.Request, res: express.Response) {
    const config = await configService.get();
    res.status(200).send(config);
  }

  async createConfig(req: express.Request, res: express.Response) {
    const configId = await configService.create(req.body);
    res.status(201).send(configId);
  }

  async updateConfig(req: express.Request, res: express.Response) {
    log(await configService.update(req.body));
    res.status(204).send();
  }

  async deleteConfig(req: express.Request, res: express.Response) {
    await configService.delete(getObjectId(req.body._id));
    res.status(204).send();
  }

}

export default new ConfigController();
