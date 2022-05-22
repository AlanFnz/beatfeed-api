import express from "express";
import usersService from "../services/users.service";
import argon2 from "argon2";
import debug from "debug";

import { PatchUserDto } from "../dto/patch.user.dto";
import { APIError } from "../../common/utils/error.utils";
import { HttpStatusCode } from "../../common/constants/httpStatusCode.constants";
import { ResponseMessages } from "../../common/constants/responseMessages.constants";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(100, 0);
    res.status(HttpStatusCode.SUCCESS).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.body._id);
    res.status(HttpStatusCode.SUCCESS).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    try {
      const user = await usersService.create(req.body);
      res.status(HttpStatusCode.CREATED).send(user);
    } catch (e) {
      log(e);
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.USER_CREATE_FAIL],
      });
      throw new APIError(ResponseMessages.USER_CREATE_FAIL);
    }
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.patchById(req.body._id, req.body));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await usersService.putById(req.body._id, req.body));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await usersService.deleteById(req.body._id));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async updatePermissionFlags(req: express.Request, res: express.Response) {
    const patchUserDto: PatchUserDto = {
      permissionFlags: parseInt(req.params.permissionFlags),
    };
    log(await usersService.patchById(req.body._id, patchUserDto));
    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}

export default new UsersController();
