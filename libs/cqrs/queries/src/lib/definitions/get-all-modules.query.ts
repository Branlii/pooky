import { Query } from "@nestjs/cqrs";
import type { ModuleEntity } from "@pooky/database-entities";

export class GetAllModulesQuery extends Query<ModuleEntity[]> {}
