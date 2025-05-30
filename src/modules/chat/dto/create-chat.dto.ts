import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateChatDto {
    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsInt()
    sender_id: number

    @ApiProperty()
    @IsInt()
    group_id: number
}
