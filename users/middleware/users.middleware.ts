import express from "express";
import debug from "debug";

import userService from "../services/users.service";

import { getObjectId } from "../../common/utils/db.utils";
import { HttpStatusCode } from "../../common/constants/httpStatusCode.constants";
import {
  APIError,
  HTTP400Error,
  HTTP404Error,
} from "../../common/utils/error.utils";

const log: debug.IDebugger = debug("app:users-middleware");

class UsersMiddleware {
  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(HttpStatusCode.BAD_REQUEST).send({ errors: ["User email already exists"] });
      throw new HTTP400Error("User email already exists");
    } else {
      next();
    }
  }

  async validateSameEmailBelongToSameUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (res.locals.user._id.toString() === req.params.userId.toString()) {
      next();
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).send({ errors: ["Invalid email"] });
      throw new HTTP400Error("Invalid email");
    }
  }

  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.email) {
      log("Validating email", req.body.email);

      this.validateSameEmailBelongToSameUser(req, res, next);
    } else {
      next();
    }
  };

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.readById(getObjectId(req.params.userId));
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send({
        errors: [`User ${req.params.userId} not found`],
      });
      throw new HTTP404Error(`User ${req.params.userId} not found`);
    }
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body._id = getObjectId(req.params.userId.toString());
    next();
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
      res.status(HttpStatusCode.BAD_REQUEST).send({
        errors: ["User cannot change permission flags"],
      });
      throw new HTTP400Error("User cannot change permission flags");
    } else {
      next();
    }
  }

  async updateUserLastLogin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.readById(getObjectId(req.body.userId));
    if (user) {
      try {
        user.lastLogin = Date.now();
        user.save();
        next();
      } catch (e) {
        res.status(HttpStatusCode.INTERNAL_SERVER).send({
          errors: [
            "Something went wrong when updating this user's last login date",
          ],
        });
        throw new APIError(
          "Something went wrong when updating this user's last login date"
        );
      }
    }
  }
}

export default new UsersMiddleware();
