import express from "express";
import dotenv from "dotenv";
import * as http from "http";
import * as winston from "winston";
import debug from "debug";
import helmet from "helmet";
import * as expressWinston from "express-winston";
import cors from "cors";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";

const app: express.Application = express();
const dotenvResult = dotenv.config();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

// parse all incoming requests as JSON
app.use(express.json());

// allow cross-origin requests
app.use(cors());

// helmet
app.use(helmet());

// expressWinston config
// will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (dotenvResult.error) {
  throw dotenvResult.error;
}

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
  if (typeof global.it === "function") {
    loggerOptions.level = "http"; // for non-debug test runs, squelch entirely
  }
}

// initialize logger
app.use(expressWinston.logger(loggerOptions));

// add routes
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

// make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

export default server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
