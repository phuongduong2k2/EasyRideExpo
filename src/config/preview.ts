import { AppConfig } from "./types";

const config: AppConfig = {
  env: "preview",
  apiUrl: "fas",
  apiVersion: "v1",
  geoapifyApiKey: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY!,
  analyticsEnabled: false,
  featureFlags: {
    newOnboarding: true,
    aiAssistant: true,
  },
  logLevel: "debug",
};
export default config;
