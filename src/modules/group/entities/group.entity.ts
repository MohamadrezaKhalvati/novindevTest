import { BaseEntity } from 'src/base/entity/base.entity'
import { Chat } from 'src/modules/chat/entities/chat.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

@Entity()
export class Group extends BaseEntity {
    @Column()
    name: string

    @Column({ nullable: true })
    description?: string

    @ManyToMany(() => User, user => user.groups)
    @JoinTable()
    members: User[]

    @OneToMany(() => Chat, chat => chat.group)
    messages: Chat[]
}
