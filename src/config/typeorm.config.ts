import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'
import { config as dotenvConfig } from 'dotenv'
import { Env } from 'environment'
import * as path from 'path'
import { TypeOrmModels } from 'src/config/entities.array'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

dotenvConfig({ path: '.env' })
export const databaseConfig: TypeOrmModuleOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.POSTGRES_SYNCHRONIZE,
    entities: TypeOrmModels,
    migrations: [path.join(process.cwd(), '../database/migrations/*{.js,.ts}')],
    seeds: ['src/database/seeder/seeds/**/*{.ts,.js}'],
    factories: ['src/database/seeder/factories/**/*{.ts,.js}'],
    logging: false,
}


export const dataSource = new DataSource(databaseConfig as DataSourceOptions)

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService<Env>) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        console.log('test', {
            type: 'postgres',
            host: this.configService.getOrThrow<string>('POSTGRES_HOST', 'localhost'),
            port: this.configService.getOrThrow<number>('POSTGRES_PORT', 5432),
            username: this.configService.getOrThrow<string>('POSTGRES_USER', 'user'),
            password: this.configService.getOrThrow<string>(
                'POSTGRES_PASSWORD',
                'password',
            ),
            database: this.configService.getOrThrow<string>('POSTGRES_DB', 'database'),
            entities: TypeOrmModels,
            synchronize: this.configService.getOrThrow<boolean>(
                'POSTGRES_SYNCHRONIZE',
                true,
            ),
            migrations: [
                path.join(__dirname, '../database/migrations/*{.ts,.js}'),
            ],
            logging: this.configService.getOrThrow<boolean>('POSTGRES_LOGGING', false),
        })
        return {
            type: 'postgres',
            host: this.configService.getOrThrow<string>('POSTGRES_HOST', 'localhost'),
            port: this.configService.getOrThrow<number>('POSTGRES_PORT', 5432),
            username: this.configService.getOrThrow<string>('POSTGRES_USER', 'user'),
            password: this.configService.getOrThrow<string>(
                'POSTGRES_PASSWORD',
                'password',
            ),
            database: this.configService.getOrThrow<string>('POSTGRES_DB', 'database'),
            entities: TypeOrmModels,
            synchronize: this.configService.getOrThrow<boolean>(
                'POSTGRES_SYNCHRONIZE',
                true,
            ),
            migrations: [
                path.join(__dirname, '../database/migrations/*{.ts,.js}'),
            ],
            logging: this.configService.getOrThrow<boolean>('POSTGRES_LOGGING', false),
        }
    }
}
