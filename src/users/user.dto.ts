import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    age!: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}