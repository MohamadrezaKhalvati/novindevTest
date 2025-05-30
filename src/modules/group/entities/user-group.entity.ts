import { BaseEntity } from 'src/base/entity/base.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Group } from './group.entity'

@Entity()
export class UserGroup extends BaseEntity {
    @Column()
    user_id: number

    @Column()
    group_id: number

    @ManyToOne(() => User, user => user.userGroups)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Group, group => group.userGroups)
    @JoinColumn({ name: 'group_id' })
    group: Group
}
