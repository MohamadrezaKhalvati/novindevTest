import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { Chat } from './entities/chat.entity'
import { ChatRepository } from './repositories/chat.repository'

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService, ChatRepository],
    exports: [ChatRepository],
})
export class ChatModule {}
