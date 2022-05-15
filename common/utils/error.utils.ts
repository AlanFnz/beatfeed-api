import { HttpStatusCode } from "../constants/httpStatusCode";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    description: string,
    name = "internal server error",
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    description = "internal server error",
    isOperational = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}

export class HTTP400Error extends BaseError {
  constructor(name = "bad request", description: string) {
    super(name, HttpStatusCode.BAD_REQUEST, description, true);
  }
}

export class HTTP404Error extends BaseError {
  constructor(name = "not found", description: string) {
    super(name, HttpStatusCode.NOT_FOUND, description, true);
  }
}
