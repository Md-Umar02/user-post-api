import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostsDto {
    @ApiProperty()
    @IsString()
    title!: string
}