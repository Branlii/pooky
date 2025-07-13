import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse } from "@nestjs/swagger";
import { GetAllModulesQuery } from "../definitions";

@Controller("modules")
export class ModulesController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	@ApiOkResponse({
		description: "Returns all modules",
	})
	async getModules() {
		return this.queryBus.execute(new GetAllModulesQuery());
	}
}
