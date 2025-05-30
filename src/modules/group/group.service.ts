import { BadRequestException, Injectable } from '@nestjs/common'
import { UserRepository } from '../user/repositories/user.repository'
import { CreateGroupDto, JoinGroupDto } from './dto/create-group.dto'
import { Group } from './entities/group.entity'
import { GroupRepository } from './repositories/group.repository'

@Injectable()
export class GroupService {
    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async createGroup(input: CreateGroupDto): Promise<Group> {
        return await this.groupRepository.create(input)
    }

    async joinGroup(group_id: number, input: JoinGroupDto): Promise<Group> {
        const group = await this.groupRepository.findOne(group_id, {
            relation: { members: true },
        })
        const user = await this.userRepository.findOne(input.user_id)
        if (!user) {
            throw new BadRequestException('User not found')
        }
        if (group.members.some(member => member.id === user.id)) {
            throw new BadRequestException('User already in group')
        }
        group.members.push(user)
        return await this.groupRepository.update(group_id, group)
    }
}
