import { BaseEntity } from 'src/base/entity/base.entity'
import { Chat } from 'src/modules/chat/entities/chat.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { UserGroup } from './user-group.entity'

@Entity()
export class Group extends BaseEntity {
    @Column({ unique: true })
    name: string

    @Column({ nullable: true })
    description?: string

    @OneToMany(() => UserGroup, userGroup => userGroup.group)
    userGroups: UserGroup[]

    @OneToMany(() => Chat, chat => chat.group)
    messages: Chat[]
}
