import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetAllModulesQuery } from "../definitions";

@Controller("modules")
export class ModulesController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	async getModules() {
		return this.queryBus.execute(new GetAllModulesQuery());
	}
}
