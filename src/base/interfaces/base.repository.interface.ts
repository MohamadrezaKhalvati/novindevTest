import { SelectQueryBuilder } from 'typeorm'
import { FindAll } from '../interfaces/find-all'
import {
	QueryBuilderParams,
	QueryParams,
	SingleQueryParams,
} from '../validators/query-param.validator'

export interface IBaseRepository<T> {
    exists(filter: Partial<T>): Promise<boolean>

    findOrCreate(filter: Partial<T>, defaultData: Partial<T>): Promise<T>

    create(body: Partial<T>): Promise<T>

    hardDelete(id: number): Promise<T>

    findAllNoPagination(query: QueryParams<T>): Promise<T[]>

    findAll(
        query: QueryParams<T> | QueryBuilderParams<T>,
        withDeleted?: boolean,
    ): Promise<FindAll<T>>

    findOne(
        id: number,
        query?: SingleQueryParams<T>,
        ignoreValidation?: boolean,
    ): Promise<T>

    bulkCreate(bodies: Partial<T>[]): Promise<T[]>

    bulkUpdate(updates: { id: number; data: Partial<T> }[]): Promise<T[]>

    bulkDelete(ids: number[]): Promise<void>

    findOneBy(
        obj: Partial<T>,
        query?: SingleQueryParams<T>,
        ignoreValidation?: boolean,
    ): Promise<T>

    findOneByWithOutThrowError(
        obj: Partial<T>,
        query?: SingleQueryParams<T>,
    ): Promise<T | null>

    update(id: number, body: Partial<T>): Promise<T>

    softDelete(id: number): Promise<T>

    count(query: QueryBuilderParams<T>, withDeleted?: boolean): Promise<number>

    softRemove(entity: T | T[]): Promise<T | T[]>

    findAllQueryBuilder(
        query: QueryBuilderParams<T>,
        cb: SelectQueryBuilder<T>,
    ): Promise<FindAll<T>>

    findAllRaw(
        query: QueryBuilderParams<T>,
        cb: SelectQueryBuilder<T>,
    ): Promise<FindAll<T>>
}
