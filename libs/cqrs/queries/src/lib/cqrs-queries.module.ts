import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { allEntities } from "@pooky/database-entities";
import { ModulesController } from "./controllers/modules.controller";
import { GetAllModulesHandler } from "./handlers";

@Module({
	imports: [TypeOrmModule.forFeature(allEntities)],
	controllers: [ModulesController],
	providers: [GetAllModulesHandler],
})
export class CqrsQueriesModule {}
