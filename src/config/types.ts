export interface AppConfig {
  env: "development" | "preview" | "production";
  apiUrl: string;
  apiVersion: string;
  geoapifyApiKey: string;
  analyticsEnabled: boolean;
  logLevel: "debug" | "info" | "warn" | "error" | "none";
  featureFlags: {
    newOnboarding: boolean;
    aiAssistant: boolean;
  };
}
