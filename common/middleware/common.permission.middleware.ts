import express from "express";
import debug from "debug";

import { PermissionFlag } from "./common.permissionflag.enum";
import { APIError, HTTP403Error } from "../utils/error.utils";

class CommonPermissionMiddleware {
  log: debug.IDebugger = debug("app:common-permission-middleware");

  permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
        if (userPermissionFlags & requiredPermissionFlag) {
          next();
        } else {
          res.status(403).send();
          throw new HTTP403Error(
            "This user doesn't have the required permissions"
          );
        }
      } catch (e) {
        this.log(e);
        throw new APIError(
          "Something went wrong when parsing this user's permissions"
        );
      }
    };
  }

  async onlySameUserOrAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
    if (
      req.params &&
      req.params.userId &&
      req.params.userId === res.locals.jwt.userId
    ) {
      return next();
    } else {
      if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
        return next();
      } else {
        res.status(403).send();
        throw new HTTP403Error(
          "This user doesn't have the required permissions"
        );
      }
    }
  }

  async userCantChangePermission(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      "permissionFlags" in req.body &&
      req.body.permissionFlags !== res.locals.user.permissionFlags
    ) {
      res.status(403).send({
        errors: ["User cannot change permission flags"],
      });
      throw new HTTP403Error("User cannot change permission flags");
    } else {
      next();
    }
  }
}

export default new CommonPermissionMiddleware();
