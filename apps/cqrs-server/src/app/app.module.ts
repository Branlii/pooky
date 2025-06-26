import { Module } from "@nestjs/common";
import { EventDispatcherKafkaModule } from "@pooky/event-dispatcher-kafka";
import { EventStoreKurrentModule } from "@pooky/event-store-kurrent";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		EventDispatcherKafkaModule.register(),
		EventStoreKurrentModule.register(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
