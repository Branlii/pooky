import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { IEventDispatcher } from "@pooky/abstract-interfaces";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class EventDispatcherKafkaService
	implements IEventDispatcher<Producer>, OnModuleInit, OnModuleDestroy
{
	readonly dispatcher: Producer;

	constructor(publisher: Kafka) {
		this.dispatcher = publisher.producer();
	}

	async onModuleInit() {
		await this.dispatcher.connect();
	}

	async onModuleDestroy() {
		await this.dispatcher.disconnect();
	}

	async dispatchEvent(topic: string, message: string): Promise<void> {
		await this.dispatcher.send({
			topic,
			messages: [
				{
					value: message,
				},
			],
		});
	}
}
