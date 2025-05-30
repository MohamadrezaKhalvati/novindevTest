import { BadRequestException, Injectable } from '@nestjs/common'
import { UserRepository } from '../user/repositories/user.repository'
import { CreateGroupDto, JoinGroupDto } from './dto/create-group.dto'
import { Group } from './entities/group.entity'
import { UserGroup } from './entities/user-group.entity'
import { GroupRepository } from './repositories/group.repository'
import { UserGroupRepository } from './repositories/user-group.repository'

@Injectable()
export class GroupService {
    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly userRepository: UserRepository,
        private readonly userGroupRepository: UserGroupRepository,
    ) {}

    async createGroup(input: CreateGroupDto): Promise<Group> {
        const { user_id, name, description } = input

        const existGroup =
            await this.groupRepository.findOneByWithOutThrowError({
                name: name,
            })

        if (existGroup) {
            throw new BadRequestException('Group is exist with this name')
        }
        const group = await this.groupRepository.create({ name, description })

        await this.userGroupRepository.create({
            user_id,
            group_id: group.id,
        })

        return await this.groupRepository.findOne(group.id, {
            relation: { userGroups: { user: true } },
        })
    }

    async joinGroup(group_id: number, input: JoinGroupDto): Promise<UserGroup> {
        const group = await this.groupRepository.findOne(group_id)

        if (!group) {
            throw new BadRequestException('Group not found')
        }

        const user = await this.userRepository.findOne(input.user_id)
        if (!user) {
            throw new BadRequestException('User not found')
        }

        const existingMembership =
            await this.userGroupRepository.findByUserAndGroup(
                input.user_id,
                group_id,
            )
        if (existingMembership) {
            throw new BadRequestException('User already in group')
        }

        const userGroup = await this.userGroupRepository.create({
            user_id: input.user_id,
            group_id: group_id,
        })

        console.log('asdasdasdas>>>>>.', userGroup)
        return await this.userGroupRepository.findOne(userGroup.id, {
            relation: { user: true, group: true },
        })
    }
}
