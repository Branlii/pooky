import { type DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
	EVENT_STORE_DB_CONFIG_TOKEN,
	type EventStoreDBConfig,
	eventStoreDBConfig,
} from "./event-store.event-store-db.config";
import { EVENT_STORE_TOKEN } from "./event-store.event-store-db.constants";
import { EventStoreEventStoreDBService } from "./event-store.event-store-db.service";

@Module({})
export class EventStoreEventStoreDbModule {
	static register(): DynamicModule {
		return {
			module: EventStoreEventStoreDbModule,
			imports: [ConfigModule.forFeature(eventStoreDBConfig)],
			providers: [
				{
					provide: EventStoreEventStoreDBService,
					useFactory: (configService: ConfigService) => {
						const config = configService.get<EventStoreDBConfig>(
							EVENT_STORE_DB_CONFIG_TOKEN,
						);

						if (!config?.baseUrl) {
							throw new Error(
								"Event Store DB baseUrl configuration is missing. Please provide EVENT_STORE_BASE_URL in your environment variables.",
							);
						}

						return new EventStoreEventStoreDBService(
							config.baseUrl,
							config.insecure,
						);
					},
					inject: [ConfigService],
				},
				{
					provide: EVENT_STORE_TOKEN,
					useExisting: EventStoreEventStoreDBService,
				},
			],
			exports: [EventStoreEventStoreDBService, EVENT_STORE_TOKEN],
		};
	}
}
