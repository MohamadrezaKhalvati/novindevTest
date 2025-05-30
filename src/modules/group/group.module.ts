import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { UserModule } from '../user/user.module'
import { GroupController } from './group.controller'
import { GroupService } from './group.service'
import { GroupRepository } from './repositories/group.repository'
import { UserGroupRepository } from './repositories/user-group.repository'

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [GroupController],
    providers: [GroupService, GroupRepository, UserGroupRepository],
    exports: [GroupRepository, UserGroupRepository],
})
export class GroupModule {}
