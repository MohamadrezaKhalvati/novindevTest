import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IBaseRepository } from 'src/base/interfaces/base.repository.interface'
import { BaseRepository } from 'src/base/repository/base.repository'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'

@Injectable()
export class UserRepository
    extends BaseRepository<User>
    implements IBaseRepository<User>
{
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
    ) {
        super(repository)
    }

    async findByUsername(username: string): Promise<User> {
        return await super.findOneByWithOutThrowError({ username })
    }

    async findByEmail(email: string): Promise<User> {
        return await super.findOneByWithOutThrowError({ email })
    }
}
