import { type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ModuleEntity } from "@pooky/database-entities";
import type { Repository } from "typeorm";
import { GetAllModulesQuery } from "../../definitions";

@QueryHandler(GetAllModulesQuery)
export class GetAllModulesHandler implements IQueryHandler<GetAllModulesQuery> {
	constructor(
		@InjectRepository(ModuleEntity)
		private readonly modulesRepository: Repository<ModuleEntity>,
	) {}

	async execute(_: GetAllModulesQuery): Promise<ModuleEntity[]> {
		return this.modulesRepository.find();
	}
}
