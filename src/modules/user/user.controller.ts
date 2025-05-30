import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SingleQueryParams } from 'src/base/validators/query-param.validator'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() input: CreateUserDto): Promise<User> {
        return this.userService.createUser(input)
    }

    @Get(':id')
    async getUserById(
        @Param('id', ParseIntPipe) id: number,
        @Query() query: SingleQueryParams<User>,
    ): Promise<User> {
        return await this.userService.getUserById(id, query)
    }
}
