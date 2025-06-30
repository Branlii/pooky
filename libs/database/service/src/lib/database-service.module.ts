import { type DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { allEntities } from "@pooky/database-entities";

@Module({})
export class DatabaseServiceModule {
	static forRoot(): DynamicModule {
		const requiredEnvVars = [
			"DB_HOST",
			"DB_USERNAME",
			"DB_PASSWORD",
			"DB_NAME",
		];
		const missingVars = requiredEnvVars.filter(
			(envVar) => !process.env[envVar],
		);

		if (missingVars.length > 0) {
			throw new Error(
				`Missing required environment variables: ${missingVars.join(", ")}`,
			);
		}

		const dbPort = parseInt(process.env.DB_PORT || "5432", 10);
		if (Number.isNaN(dbPort)) {
			throw new Error("DB_PORT must be a valid number");
		}

		return {
			module: DatabaseServiceModule,
			imports: [
				TypeOrmModule.forRoot({
					type: "postgres",
					host: process.env.DB_HOST,
					port: dbPort,
					username: process.env.DB_USERNAME,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_NAME,
					entities: allEntities,
					synchronize: process.env.NODE_ENV !== "production",
					logging: process.env.DB_LOGGING === "true",
					ssl:
						process.env.DB_SSL === "true"
							? { rejectUnauthorized: false }
							: false,
				}),
			],
			exports: [TypeOrmModule],
		};
	}
}
