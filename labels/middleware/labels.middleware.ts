import express from "express";
import debug from "debug";

import labelsService from "../services/labels.service";

import { getObjectId } from "../../common/utils/db.utils";
import { HttpStatusCode } from "../../common/constants/httpStatusCode.constants";
import { HTTP404Error } from "../../common/utils/error.utils";
import { ResponseMessages } from "../../common/constants/responseMessages.constants";
import { ObjectId } from "mongodb";

const log: debug.IDebugger = debug("app:labels-middleware");

class LabelsMiddleware {
  async validateLabelExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const label = await labelsService.readById(getObjectId(req.params.labelId));
    if (label) {
      res.locals.label = label;
      next();
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send({
        errors: [ResponseMessages.LABEL_NOT_FOUND(req.params.labelId)],
      });
      throw new HTTP404Error(
        ResponseMessages.LABEL_NOT_FOUND(req.params.labelId)
      );
    }
  }

  async extractLabelId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!ObjectId.isValid(req.body.labelId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({
        errors: [ResponseMessages.INVALID_ID],
      });
    }

    req.body._id = getObjectId(req.params.labelId.toString());
    next();
  }
}

export default new LabelsMiddleware();
