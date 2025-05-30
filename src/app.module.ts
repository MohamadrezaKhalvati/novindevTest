import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { DatabaseModule } from './modules/database/database.module';
import { GroupModule } from './modules/group/group.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, GroupModule, ChatModule],
})
export class AppModule {}
