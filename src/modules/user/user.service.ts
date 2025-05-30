import { Injectable } from '@nestjs/common'
import { QueryParams } from '../../base/validators/query-param.validator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserDto)
    }

    async findAll(query?: QueryParams<User>) {
        return this.userRepository.findAll(query)
    }

    async findOne(id: number) {
        return this.userRepository.findOne(id)
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto)
    }

    async remove(id: number) {
        return this.userRepository.softDelete(id)
    }
}
