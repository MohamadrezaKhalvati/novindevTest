import { BadRequestException, Injectable } from '@nestjs/common'
import { FindAll } from 'src/base/interfaces/find-all'
import { QueryParams } from 'src/base/validators/query-param.validator'
import { GroupRepository } from '../group/repositories/group.repository'
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
    ) {}

    async sendMessage(input: CreateChatDto): Promise<Chat> {
        const { content, senderId, groupId } = input

        const user = await this.userRepository.findOne(senderId)
        if (!user) {
            throw new BadRequestException('User not found')
        }

        const group = await this.groupRepository.findOne(groupId, {
            relation: { members: true },
        })
        if (!group) {
            throw new BadRequestException('Group not found')
        }

        if (!group.members.some(member => member.id === senderId)) {
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
        return await this.chatRepository.findAll({
            page,
            take,
            filter: { group: { id: group_id } },
            relation: { sender: true, group: true },
            select: {
                sender: { id: true, username: true },
                group: { id: true, name: true },
            },
        })
    }
}
