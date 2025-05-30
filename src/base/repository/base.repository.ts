import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IBaseRepository } from '../interfaces/base.repository.interface'
import { FindAll } from '../interfaces/find-all'
import { PaginateData } from '../utils/paginate-data'
import {
	QueryBuilderParams,
	QueryParams,
	SingleQueryParams,
} from '../validators/query-param.validator'

@Injectable()
export abstract class BaseRepository<T> implements IBaseRepository<T> {
    private readonly entityName: string

    protected constructor(protected repository: Repository<T | any>) {
        this.entityName = repository.metadata.targetName
    }

    async exists(filter: Partial<T>): Promise<boolean> {
        return (await this.repository.count({ where: filter })) > 0
    }

    async findOrCreate(
        filter: Partial<T>,
        defaultData: Partial<T>,
    ): Promise<T> {
        const existing = await this.repository.findOne({ where: filter })
        if (existing) return existing

        defaultData['createdAt'] = new Date()
        defaultData['updatedAt'] = new Date()
        const data = await this.repository.create({ ...filter, ...defaultData })
        return await this.repository.save(data)
    }

    async create(body: Partial<T>): Promise<T> {
        try {
            body['createdAt'] = new Date()
            body['updatedAt'] = new Date()
            const data = await this.repository.create(body)
            return await this.repository.save(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async hardDelete(id: number) {
        const res = await this.findOne(id)
        try {
            await this.repository.delete(id)
            return res
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findAllNoPagination(query: QueryParams<T>): Promise<T[]> {
        return this.repository.find({
            where: query.filter,
            relations: query.relation,
            ...query,
        })
    }

    parseBooleanValues(obj: any): any {
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                return obj.map(this.parseBooleanValues)
            } else {
                const result: any = {}
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key]
                        if (
                            typeof value === 'string' &&
                            (value === 'true' || value === 'false')
                        ) {
                            result[key] = value === 'true'
                        } else {
                            result[key] = this.parseBooleanValues(value)
                        }
                    }
                }
                return result
            }
        } else {
            return obj
        }
    }

    async findAll(
        query: QueryParams<T> | QueryBuilderParams<T>,
        withDeleted?: boolean,
    ): Promise<FindAll<T>> {
        const { page = 0, take = 200000, filter, sort } = query
        query.relation = this.parseBooleanValues(query?.relation)
        query.select = this.parseBooleanValues(query.select)
        const count = await this.repository.count({
            where: filter,
            relations: query.relation,
        })

        const data = await this.repository.find({
            take,
            withDeleted,
            skip: page * take,
            where: filter,
            order: sort ?? { id: -1 },
            relations: query.relation,
            select: query.select,
        })

        return PaginateData(data, page, take, count)
    }

    async findOne(
        id: number,
        query?: SingleQueryParams<T>,
        ignoreValidation?: boolean,
    ): Promise<T> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException('Not Found')
        }

        if (query?.relation)
            query.relation = this.parseBooleanValues(query?.relation)
        const res = await this.repository.findOne({
            where: { id },
            relations: query?.relation,
            select: query?.select,
        })

        if (!res && !ignoreValidation) {
            throw new NotFoundException('Not Found')
        }

        return res
    }

    async bulkCreate(bodies: Partial<T>[]): Promise<T[]> {
        try {
            const entities = bodies.map(body => {
                body['createdAt'] = new Date()
                body['updatedAt'] = new Date()
                return this.repository.create(body)
            })
            return await this.repository.save(entities, { chunk: 100 })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async bulkUpdate(
        updates: { id: number; data: Partial<T> }[],
    ): Promise<T[]> {
        try {
            const updatedEntities: T[] = []
            await this.repository.manager.transaction(
                async transactionalEntityManager => {
                    for (const { id, data } of updates) {
                        data['updatedAt'] = new Date()
                        await transactionalEntityManager.update(
                            this.repository.target,
                            id,
                            data,
                        )
                        const updated =
                            await transactionalEntityManager.findOne(
                                this.repository.target,
                                { where: { id } },
                            )
                        if (updated) updatedEntities.push(updated)
                    }
                },
            )
            return updatedEntities
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async bulkDelete(ids: number[]): Promise<void> {
        try {
            await this.repository.delete(ids)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findOneBy(
        obj: Partial<T>,
        query?: SingleQueryParams<T>,
        ignoreValidation?: boolean,
    ): Promise<T> {
        if (query?.relation)
            query.relation = this.parseBooleanValues(query?.relation)

        const res = await this.repository.findOne({
            where: obj,
            relations: query?.relation,
            select: query?.select,
            order: {
                id: 'DESC',
            },
        })
        if (!res && !ignoreValidation) {
            throw new NotFoundException('Not Found')
        }
        return res
    }

    async update(id: number, body: Partial<T>) {
        try {
            body['updatedAt'] = new Date()
            await this.repository.update(id, body)
            return await this.findOne(id)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async softDelete(id: number) {
        try {
            const entity = await this.findOne(id)
            await this.repository.softDelete(id)
            return entity
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async count(
        query: QueryBuilderParams<T>,
        withDeleted: boolean = false,
    ): Promise<number> {
        const { filter, relation } = query

        const parsedFilter = this.parseBooleanValues(filter) as Partial<T>
        const parsedRelations = this.parseBooleanValues(relation) as
            | Record<string, boolean>
            | undefined

        try {
            return await this.repository.count({
                where: parsedFilter,
                relations: parsedRelations
                    ? Object.keys(parsedRelations).filter(
                          key => parsedRelations[key],
                      )
                    : undefined,
                withDeleted: withDeleted ?? false,
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async softRemove(entity: T | T[]) {
        try {
            return this.repository.softRemove(entity)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findAllQueryBuilder<T>(
        query: QueryBuilderParams<T>,
        cb: SelectQueryBuilder<T>,
    ) {
        const { page, take, sort } = query

        const res = await cb
            .skip(page * take)
            .take(take)
            .orderBy(sort?.field.toString(), sort?.type)
            .getMany()

        const count = await cb.getCount()
        return PaginateData(res, page, take, count)
    }

    async findAllRaw(
        query: QueryBuilderParams<T>,
        cb: SelectQueryBuilder<T>,
    ): Promise<FindAll<T>> {
        try {
            const total = await cb.getCount()

            const { page = 0, take = 20000 } = query
            cb.skip(page * take).take(take)

            const rawResults = await cb.getRawMany()

            const results = rawResults.map(result => {
                const transformedResult = {}
                Object.keys(result).forEach(key => {
                    const [entity, field] = key.split('_')
                    if (field) {
                        if (!transformedResult[entity]) {
                            transformedResult[entity] = {}
                        }
                        transformedResult[entity][field] = result[key]
                    } else {
                        transformedResult[key] = result[key]
                    }
                })
                return transformedResult
            })

            return PaginateData(results, page, take, total)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
