import express from "express";
import debug from "debug";

import featureFlagsService from "../services/featureFlags.service";

import { getObjectId } from "../../common/utils/db.utils";
import { APIError, HTTP404Error } from "../../common/utils/error.utils";

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
      throw new HTTP404Error(`Feature ${req.params.userId} not found`);
    }
  }

  async extractFeatureId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      req.body._id = getObjectId(req.params.featureId.toString());
    } catch (e) {
      res.status(500).send({
        errors: [
          "Something went wrong when getting this object id",
        ],
      });
      throw new APIError(
        "Something went wrong when getting this object id"
      );
    }
    next();
  }
}

export default new FeatureFlagsMiddleware();
