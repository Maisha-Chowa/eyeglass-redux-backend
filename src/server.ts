import mongoose from "mongoose";
import config from "./config";
import { Server } from "http";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";

process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("database connected successfully");

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (e) {
    errorLogger.error("failed to connect database");
  }
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();
