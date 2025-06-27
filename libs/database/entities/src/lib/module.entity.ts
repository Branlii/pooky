import { Column, Entity } from "typeorm";
import BaseEntity from "./base.entity";

@Entity("modules")
export default class ModuleEntity extends BaseEntity {
	@Column({ type: "varchar", length: 64, unique: true })
	name: string;

	@Column({ type: "varchar", length: 32, unique: true })
	slug: string;

	@Column({ type: "boolean", default: false })
	enabled: boolean;
}
