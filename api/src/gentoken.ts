import { generateAccessToken } from "./utils/auth";
import { Logger } from "./utils/logger";

if (process.argv.length < 3) {
  Logger.error("Usage: yarn gentoken <OWNER_NAME>");
  process.exit(-1);
}

const token = generateAccessToken({ name: process.argv[2] }, true);
Logger.info(token);
