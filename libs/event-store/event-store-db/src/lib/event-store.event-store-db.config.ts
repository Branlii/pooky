import { registerAs } from "@nestjs/config";

export const EVENT_STORE_DB_CONFIG_TOKEN = "EventStoreDBConfig";

export interface EventStoreDBConfig {
  baseUrl?: string;
  insecure: boolean
}

export const eventStoreDBConfig = registerAs(EVENT_STORE_DB_CONFIG_TOKEN, (): EventStoreDBConfig => {
  return {
    baseUrl: process.env["EVENT_STORE_BASE_URL"],
    insecure: process.env["EVENT_STORE_INSECURE"] === "true" || false,
  };
});