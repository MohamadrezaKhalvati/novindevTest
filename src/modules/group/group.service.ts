import { Injectable } from '@nestjs/common'
import { QueryParams } from '../../base/validators/query-param.validator'
import { CreateGroupDto } from './dto/create-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { Group } from './entities/group.entity'
import { GroupRepository } from './repositories/group.repository'

@Injectable()
export class GroupService {
    constructor(private readonly groupRepository: GroupRepository) {}

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        return this.groupRepository.create(createGroupDto)
    }

    async findAll(query?: QueryParams<Group>) {
        return this.groupRepository.findAll(query)
    }

    async findOne(id: number) {
        return this.groupRepository.findOne(id)
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        return this.groupRepository.update(id, updateGroupDto)
    }

    async remove(id: number) {
        return this.groupRepository.softDelete(id)
    }
}
