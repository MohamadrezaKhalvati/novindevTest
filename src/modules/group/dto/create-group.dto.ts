import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateGroupDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty()
    @IsInt()
    user_id: number
}

export class JoinGroupDto {
    @ApiProperty()
    @IsInt()
    user_id: number
}
