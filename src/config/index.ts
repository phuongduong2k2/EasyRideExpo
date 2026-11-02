import development from "./development";
import production from "./production";
import preview from "./preview";
import { AppConfig } from "./types";

const ENV = process.env.APP_ENV

const configs: Record<string, AppConfig> = {
  development,
  preview,
  production,
};
if (!ENV) {
    throw new Error("No ENV found!");
}
const config = configs[ENV];
if (!config) {
  throw new Error(
    `No config found for APP_ENV="${ENV}". ` +
      `Valid values are: ${Object.keys(configs).join(", ")}`,
  );
}
// Log the active environment on startup - makes it obvious which env is running
if (config.logLevel === "debug") {
  console.log(`[Config] Running in ${config.env.toUpperCase()} environment`);
  console.log(`[Config] API: ${config.apiUrl}`);
}
export default config;
export type { AppConfig };
