import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { GroupModule } from '../group/group.module'
import { UserModule } from '../user/user.module'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { ChatRepository } from './repositories/chat.repository'

@Module({
    imports: [DatabaseModule, UserModule, GroupModule],
    controllers: [ChatController],
    providers: [ChatService, ChatRepository],
    exports: [ChatRepository],
})
export class ChatModule {}
