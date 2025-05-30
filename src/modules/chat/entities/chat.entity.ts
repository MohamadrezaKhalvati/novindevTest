import { BaseEntity } from 'src/base/entity/base.entity'
import { Group } from 'src/modules/group/entities/group.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Chat extends BaseEntity {
    @Column()
    content: string

    @ManyToOne('User', 'messages')
    sender: User

    @ManyToOne('Group', 'messages')
    group: Group
}
