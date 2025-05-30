import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from '../../../base/repository/base.repository'
import { Chat } from '../entities/chat.entity'

@Injectable()
export class ChatRepository extends BaseRepository<Chat> {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ) {
        super(chatRepository)
    }
}
