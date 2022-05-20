import express from "express";
import featureFlagsService from "../services/featureFlags.service";
import argon2 from "argon2";
import debug from "debug";

import { PatchFeatureFlagDto } from "../dto/patch.featureFlag.dto";
import { HttpStatusCode } from "../../common/constants/httpStatusCode.constants";

const log: debug.IDebugger = debug("app:feature-flags-controller");

class FeatureFlagsController {
  async listFeatures(req: express.Request, res: express.Response) {
    const features = await featureFlagsService.list(100, 0);
    res.status(HttpStatusCode.SUCCESS).send(features);
  }

  async getFeatureById(req: express.Request, res: express.Response) {
    const feature = await featureFlagsService.readById(req.body._id);
    res.status(HttpStatusCode.SUCCESS).send(feature);
  }

  async createFeature(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const feature = await featureFlagsService.create(req.body);
    res.status(HttpStatusCode.CREATED).send(feature);
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await featureFlagsService.patchById(req.body._id, req.body));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await featureFlagsService.putById(req.body._id, req.body));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async removeFeature(req: express.Request, res: express.Response) {
    log(await featureFlagsService.deleteById(req.body._id));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async updatePermissionFlags(req: express.Request, res: express.Response) {
    const patchFeatureFlagDto: PatchFeatureFlagDto = {
      permissionFlags: parseInt(req.params.permissionFlags),
    };
    log(await featureFlagsService.patchById(req.body._id, patchFeatureFlagDto));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}

export default new FeatureFlagsController();
