import { Module } from "@nestjs/common";
import { EventPublisherKafkaModule } from "@pooky/event-publisher-kafka";
import { EventStoreKurrentModule } from "@pooky/event-store-kurrent";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		EventPublisherKafkaModule.register(),
		EventStoreKurrentModule.register(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
