import { BaseEntity } from 'src/base/entity/base.entity'
import { Chat } from 'src/modules/chat/entities/chat.entity'
import { Group } from 'src/modules/group/entities/group.entity'
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    username: string

    @Column()
    email: string

    @Column()
    password: string // Should be hashed in practice

    @ManyToMany(() => Group, group => group.members)
    groups: Group[]

    @OneToMany(() => Chat, chat => chat.sender)
    messages: Chat[]
}
