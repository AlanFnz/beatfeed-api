import express from "express";
import { validationResult } from "express-validator";
import { HTTP400Error } from "../utils/error.utils";

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      throw new HTTP400Error(
        "One or more errors occurred when validating this request body"
      );
    }
    next();
  }
}

export default new BodyValidationMiddleware();
