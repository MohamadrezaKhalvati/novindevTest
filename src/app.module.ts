import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChatModule } from './modules/chat/chat.module'
import { GroupModule } from './modules/group/group.module'
import { UserModule } from './modules/user/user.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        UserModule,
        GroupModule,
        ChatModule,
    ],
})
export class AppModule {}
