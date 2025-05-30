import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateGroupDto, JoinGroupDto } from './dto/create-group.dto'
import { Group } from './entities/group.entity'
import { GroupService } from './group.service'

@Controller('group')
@ApiTags('Group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Post()
    async createGroup(@Body() dto: CreateGroupDto): Promise<Group> {
        return await this.groupService.createGroup(dto)
    }

    @Post(':id/join')
    async joinGroup(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: JoinGroupDto,
    ): Promise<Group> {
        return await this.groupService.joinGroup(id, input)
    }
}
