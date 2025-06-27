import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeOrmBaseEntity,
	UpdateDateColumn,
} from "typeorm";

export default abstract class BaseEntity extends TypeOrmBaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn({
		type: "timestamp",
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: "timestamp",
	})
	updatedAt: Date;
}
