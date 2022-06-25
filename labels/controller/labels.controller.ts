import express from "express";
import labelsService from "../services/labels.service";
import argon2 from "argon2";
import debug from "debug";

import { PatchLabelDto } from "../dto/patch.label.dto";
import { APIError } from "../../common/utils/error.utils";
import { HttpStatusCode } from "../../common/constants/httpStatusCode.constants";
import { ResponseMessages } from "../../common/constants/responseMessages.constants";

const log: debug.IDebugger = debug("app:users-controller");

class LabelsController {
  async listLabels(req: express.Request, res: express.Response) {
    let labels: any[];
    try {
      labels = await labelsService.list(100, 0);
    } catch (e) {
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.LABELS_GET_FAIL],
      });
      throw new APIError(ResponseMessages.LABELS_GET_FAIL);
    }
    res.status(HttpStatusCode.SUCCESS).send(labels);
  }

  async getLabelById(req: express.Request, res: express.Response) {
    let label: any;
    try {
      label = await labelsService.readById(req.body._id);
    } catch (e) {
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.LABEL_GET_FAIL],
      });
      throw new APIError(ResponseMessages.LABEL_GET_FAIL);
    }

    if (label) {
      res.status(HttpStatusCode.SUCCESS).send(label);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send({
        errors: [ResponseMessages.LABEL_NOT_FOUND(req.body._id)],
      });
    }
  }

  async createLabel(req: express.Request, res: express.Response) {
    try {
      const label = await labelsService.create(req.body);
      res.status(HttpStatusCode.CREATED).send(label);
    } catch (e) {
      log(e);
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.LABEL_CREATE_FAIL],
      });
      throw new APIError(ResponseMessages.LABEL_CREATE_FAIL);
    }
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      try {
        req.body.password = await argon2.hash(req.body.password);
      } catch (e) {
        log(e);
        res.status(HttpStatusCode.INTERNAL_SERVER).send({
          errors: [ResponseMessages.LABEL_UPDATE_FAIL],
        });
        throw new APIError(ResponseMessages.LABEL_UPDATE_FAIL);
      }
    }

    try {
      log(await labelsService.patchById(req.body._id, req.body));
    } catch (e) {
      log(e)
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.LABEL_UPDATE_FAIL],
      });
      throw new APIError(ResponseMessages.LABEL_UPDATE_FAIL);
    }
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async put(req: express.Request, res: express.Response) {
    try {
      log(await labelsService.putById(req.body._id, req.body));
    } catch (e) {
      log(e)
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.LABEL_UPDATE_FAIL],
      });
      throw new APIError(ResponseMessages.LABEL_UPDATE_FAIL);
    }
    res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async removeLabel(req: express.Request, res: express.Response) {
    try {
      log(await labelsService.deleteById(req.body._id));
    } catch (e) {
      log(e)
      res.status(HttpStatusCode.INTERNAL_SERVER).send({
        errors: [ResponseMessages.LABEL_DELETE_FAIL],
      });
      throw new APIError(ResponseMessages.LABEL_DELETE_FAIL);
    }
    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}

export default new LabelsController();
