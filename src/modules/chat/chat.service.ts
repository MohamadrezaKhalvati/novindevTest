import { Injectable } from '@nestjs/common'
import { QueryParams } from '../../base/validators/query-param.validator'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Chat } from './entities/chat.entity'
import { ChatRepository } from './repositories/chat.repository'

@Injectable()
export class ChatService {
    constructor(private readonly chatRepository: ChatRepository) {}

    async create(createChatDto: CreateChatDto): Promise<Chat> {
        return this.chatRepository.create(createChatDto)
    }

    async findAll(query?: QueryParams<Chat>) {
        return this.chatRepository.findAll(query)
    }

    async findOne(id: number) {
        return this.chatRepository.findOne(id)
    }

    async update(id: number, updateChatDto: UpdateChatDto) {
        return this.chatRepository.update(id, updateChatDto)
    }

    async remove(id: number) {
        return this.chatRepository.softDelete(id)
    }
}
