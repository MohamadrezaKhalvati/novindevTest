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
import { FindAll } from 'src/base/interfaces/find-all'
import { QueryParams } from 'src/base/validators/query-param.validator'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    async sendMessage(@Body() input: CreateChatDto): Promise<Chat> {
        return await this.chatService.sendMessage(input)
    }

    @Get('/groups/:id/messages')
    async getMessages(
        @Param('id', ParseIntPipe) groupId: number,
        @Query() query: QueryParams<Chat>,
    ): Promise<FindAll<Chat>> {
        return await this.chatService.getMessages(groupId, query)
    }
}
