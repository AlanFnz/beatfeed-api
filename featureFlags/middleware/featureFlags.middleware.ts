import express from "express";
import debug from "debug";

import featureFlagsService from "../services/featureFlags.service";

import { getObjectId } from "../../common/utils/util";

const log: debug.IDebugger = debug("app:feature-flags-middleware");

class FeatureFlagsMiddleware {
  async validateFeatureExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const feature = await featureFlagsService.readById(getObjectId(req.params.featureId));
    if (feature) {
      next();
    } else {
      res.status(404).send({
        error: `Feature ${req.params.featureId} not found`,
      });
    }
  }

  async extractFeatureId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body._id = getObjectId(req.params.featureId.toString());
    next();
  }
}

export default new FeatureFlagsMiddleware();
