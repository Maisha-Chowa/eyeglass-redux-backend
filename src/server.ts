import mongoose from "mongoose";
import config from "./config";
import { Server } from "http";
import app from "./app";

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
}
main();
