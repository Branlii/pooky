import { Module } from "@nestjs/common";
import { EventPublisherKafkaModule } from "@pooky/event-publisher-kafka";
import { EventStoreEventStoreDbModule } from "@pooky/event-store-event-store-db";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		EventPublisherKafkaModule.register(),
		EventStoreEventStoreDbModule.register(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
