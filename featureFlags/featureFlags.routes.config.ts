import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import { body } from "express-validator";

import FeatureFlagsController from "./controller/featureFlags.controller";

import FeatureFlagsMiddleware from "./middleware/featureFlags.middleware";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";

export class FeatureFlagsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "FeatureFlagsRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/features`)
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        FeatureFlagsController.listFeatures
      )
      .post(
        body("name")
          .isLength({ min: 5 })
          .withMessage("Must include password (+5 characters)"),
        body("version").isString(),
        body("minimumAppVersion").isString(),
        body("enabledIOS").isBoolean(),
        body("enabledAndroid").isBoolean(),
        body("enabledWeb").isBoolean(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        FeatureFlagsController.createFeature
      );

    this.app.param(`featureId`, FeatureFlagsMiddleware.extractFeatureId);

    this.app
      .route(`/features/:featureId`)
      .all(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        FeatureFlagsMiddleware.validateFeatureExists
      )
      .get(FeatureFlagsController.getFeatureById)
      .delete(FeatureFlagsController.removeFeature);

    this.app.put(`/features/:featureId`, [
      body("name")
        .isLength({ min: 5 })
        .withMessage("Must include password (+5 characters)"),
      body("version").isString(),
      body("minimumAppVersion").isString(),
      body("enabledIOS").isBoolean(),
      body("enabledAndroid").isBoolean(),
      body("enabledWeb").isBoolean(),
      body("permissionFlags").isInt(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      FeatureFlagsController.put,
    ]);

    this.app.patch(`/features/:featureId`, [
      body("name")
        .isLength({ min: 5 })
        .withMessage("Must include password (+5 characters)"),
      body("version").isString(),
      body("minimumAppVersion").isString(),
      body("enabledIOS").isBoolean(),
      body("enabledAndroid").isBoolean(),
      body("enabledWeb").isBoolean(),
      body("permissionFlags").isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      FeatureFlagsController.patch,
    ]);

    this.app.put(`/features/:featureId/permissionFlags/:permissionFlags`, [
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      FeatureFlagsController.updatePermissionFlags,
    ]);

    return this.app;
  }
}
