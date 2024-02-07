import mongoose from "mongoose";
import config from "./config";
import { Server } from "http";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connected successfully");

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (e) {
    console.log("failed to connect database");
  }
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();
