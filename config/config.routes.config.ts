import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";

import ConfigController from "./controller/config.controller";

import jwtMiddleware from "../auth/middleware/jwt.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";

export class ConfigRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ConfigRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/config`)
      .get(ConfigController.getConfig)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        ConfigController.createConfig
      );

    this.app
      .route(`/config/:configId`)
      .all(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.BASIC_USER_PERMISSION
        )
      )
      .delete(ConfigController.deleteConfig);

    return this.app;
  }
}
