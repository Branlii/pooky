import {
	EventStoreDBClient,
	type JSONType,
	jsonEvent,
} from "@eventstore/db-client";
import { Injectable } from "@nestjs/common";
import type { IEventStore } from "@pooky/abstract-interfaces";

@Injectable()
export class EventStoreEventStoreDBService
	implements IEventStore<EventStoreDBClient>
{
	readonly store: EventStoreDBClient;

	constructor(baseUrl: string, insecure: boolean) {
		this.store = new EventStoreDBClient(
			{
				endpoint: baseUrl,
			},
			{
				insecure,
			},
		);
	}

	async appendEvent(
		streamId: string,
		event: JSONType,
		type: string,
	): Promise<void> {
		const evt = jsonEvent({ type, data: event });
		await this.store.appendToStream(streamId, [evt]);
	}

	async readStream<T = unknown>(streamId: string): Promise<T[]> {
		const events = this.store.readStream(streamId, { direction: "forwards" });
		const result: T[] = [];
		for await (const resolved of events) {
			if (resolved.event?.data) {
				result.push(resolved.event.data as T);
			}
		}
		return result;
	}
}
