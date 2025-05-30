import { BadRequestException, Injectable } from '@nestjs/common'
import { FindAll } from 'src/base/interfaces/find-all'
import { QueryParams } from 'src/base/validators/query-param.validator'
import { GroupRepository } from '../group/repositories/group.repository'
import { UserGroupRepository } from '../group/repositories/user-group.repository'
import { UserRepository } from '../user/repositories/user.repository'
import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'
import { ChatRepository } from './repositories/chat.repository'

@Injectable()
export class ChatService {
    constructor(
        private readonly chatRepository: ChatRepository,
        private readonly userRepository: UserRepository,
        private readonly groupRepository: GroupRepository,
        private readonly userGroupRepository: UserGroupRepository,
    ) {}

    async sendMessage(input: CreateChatDto): Promise<Chat> {
        const { content, group_id, sender_id } = input

        const user = await this.userRepository.findOneByWithOutThrowError({
            id: sender_id,
        })
        if (!user) {
            throw new BadRequestException('User not found')
        }

        const group = await this.groupRepository.findOneByWithOutThrowError({
            id: group_id,
        })
        if (!group) {
            throw new BadRequestException('Group not found')
        }

        const isMember = await this.userGroupRepository.findByUserAndGroup(
            sender_id,
            group_id,
        )
        if (!isMember) {
            throw new BadRequestException('User is not a member of the group')
        }

        return await this.chatRepository.create({
            content,
            sender: user,
            group,
        })
    }

    async getMessages(
        group_id: number,
        query: QueryParams<Chat>,
    ): Promise<FindAll<Chat>> {
        const { page, take } = query
        query.filter = {
            ...query?.filter,
            group: {
                id: group_id,
            },
        }
        return await this.chatRepository.findAll({
            page,
            take,
            filter: query.filter,
            relation: { sender: true, group: true },
            select: {
                sender: { id: true, username: true },
                group: { id: true, name: true },
            },
        })
    }
}
