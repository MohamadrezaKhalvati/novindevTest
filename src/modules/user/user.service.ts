import { BadRequestException, Injectable } from '@nestjs/common'
import { SingleQueryParams } from 'src/base/validators/query-param.validator'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const { username, email } = dto

        const existingUser = await this.userRepository.findOneBy({ username })
        if (existingUser) {
            throw new BadRequestException('Username already exists')
        }

        const existingEmail = await this.userRepository.findByEmail(email)
        if (existingEmail) {
            throw new BadRequestException('Email already exists')
        }

        return await this.userRepository.create({
            username,
            email,
        })
    }

    async getUserById(
        id: number,
        query: SingleQueryParams<User>,
    ): Promise<User> {
        return await this.userRepository.findOne(id, query)
    }
}
