import express from "express";
import usersService from "../services/users.service";
import argon2 from "argon2";
import debug from "debug";

import { PatchUserDto } from "../dto/patch.user.dto";
import { APIError } from "../../common/utils/error.utils";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.body._id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    try {
      const user = await usersService.create(req.body);
      res.status(201).send(user);
    } catch (e) {
      log(e);
      res.status(500).send({
        errors: ["Something went wrong when creating this user"],
      });
      throw new APIError("Something went wrong when creating this user");
    }
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.patchById(req.body._id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await usersService.putById(req.body._id, req.body));
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await usersService.deleteById(req.body._id));
    res.status(204).send();
  }

  async updatePermissionFlags(req: express.Request, res: express.Response) {
    const patchUserDto: PatchUserDto = {
      permissionFlags: parseInt(req.params.permissionFlags),
    };
    log(await usersService.patchById(req.body._id, patchUserDto));
    res.status(204).send();
  }
}

export default new UsersController();
