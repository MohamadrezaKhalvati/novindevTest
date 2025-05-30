import { BaseEntity } from 'src/base/entity/base.entity'
import { Chat } from 'src/modules/chat/entities/chat.entity'
import { UserGroup } from 'src/modules/group/entities/user-group.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    username: string

    @Column()
    email: string

    @OneToMany('UserGroup', 'user')
    userGroups: UserGroup[]

    @OneToMany(() => Chat, chat => chat.sender)
    messages: Chat[]
}
