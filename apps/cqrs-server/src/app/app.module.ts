import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CqrsQueriesModule } from "@pooky/cqrs-queries";
import { DatabaseServiceModule } from "@pooky/database-service";
import { EventDispatcherKafkaModule } from "@pooky/event-dispatcher-kafka";
import { EventStoreKurrentModule } from "@pooky/event-store-kurrent";

@Module({
	imports: [
		CqrsModule.forRoot(),
		DatabaseServiceModule.forRoot(),
		EventDispatcherKafkaModule.register(),
		EventStoreKurrentModule.register(),
		CqrsQueriesModule,
	],
})
export class AppModule {}
