import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from '../../../base/repository/base.repository'
import { Group } from '../entities/group.entity'

@Injectable()
export class GroupRepository extends BaseRepository<Group> {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) {
        super(groupRepository)
    }
}
