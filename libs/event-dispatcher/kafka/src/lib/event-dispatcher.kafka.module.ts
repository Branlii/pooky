import { type DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Kafka } from "kafkajs";
import {
	EVENT_DISPATCHER_CONFIG_TOKEN,
	type KafkaConfig,
	kafkaConfig,
} from "./event-dispatcher.kafka.config";
import { EVENT_DISPATCHER_TOKEN } from "./event-dispatcher.kafka.constants";
import { EventDispatcherKafkaService } from "./event-dispatcher.kafka.service";

@Module({})
export class EventDispatcherKafkaModule {
	static register(): DynamicModule {
		return {
			module: EventDispatcherKafkaModule,
			imports: [ConfigModule.forFeature(kafkaConfig)],
			providers: [
				{
					provide: EventDispatcherKafkaService,
					useFactory: (configService: ConfigService) => {
						const config = configService.get<KafkaConfig>(
							EVENT_DISPATCHER_CONFIG_TOKEN,
						);

						if (!config?.baseUrl) {
							throw new Error(
								"Kafka baseUrl configuration is missing. Please provide KAFKA_BASE_URL in your environment variables.",
							);
						}

						const kafkaOptions = {
							brokers: [config.baseUrl],
						};

						const kafka = new Kafka(kafkaOptions);
						return new EventDispatcherKafkaService(kafka);
					},
					inject: [ConfigService],
				},
				{
					provide: EVENT_DISPATCHER_TOKEN,
					useExisting: EventDispatcherKafkaService,
				},
			],
			exports: [EventDispatcherKafkaService, EVENT_DISPATCHER_TOKEN],
		};
	}
}
