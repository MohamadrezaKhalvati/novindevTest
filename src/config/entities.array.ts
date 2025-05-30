import { Chat } from 'src/modules/chat/entities/chat.entity'
import { Group } from 'src/modules/group/entities/group.entity'
import { UserGroup } from 'src/modules/group/entities/user-group.entity'
import { User } from 'src/modules/user/entities/user.entity'

export const TypeOrmModels = [User, Group, Chat, UserGroup]
