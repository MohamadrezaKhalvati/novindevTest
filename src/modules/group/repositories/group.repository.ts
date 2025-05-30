import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'src/base/repository/base.repository'
import { Repository } from 'typeorm'
import { Group } from '../entities/group.entity'

@Injectable()
export class GroupRepository extends BaseRepository<Group> {
    constructor(
        @InjectRepository(Group)
        repository: Repository<Group>,
    ) {
        super(repository)
    }
}
