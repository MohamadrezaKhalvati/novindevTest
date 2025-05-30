import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateChatDto {
    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsInt()
    senderId: number

    @ApiProperty()
    @IsInt()
    groupId: number
}
