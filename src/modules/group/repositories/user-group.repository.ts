import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'src/base/repository/base.repository'
import { Repository } from 'typeorm'
import { UserGroup } from '../entities/user-group.entity'

@Injectable()
export class UserGroupRepository extends BaseRepository<UserGroup> {
    constructor(
        @InjectRepository(UserGroup)
        repository: Repository<UserGroup>,
    ) {
        super(repository)
    }

    async findByUserAndGroup(
        user_id: number,
        group_id: number,
    ): Promise<UserGroup> {
        return await this.findOneByWithOutThrowError({ user_id, group_id })
    }
}
