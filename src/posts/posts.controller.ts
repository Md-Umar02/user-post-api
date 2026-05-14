import { Controller, Post, Body, Param, ParseIntPipe, ValidationPipe, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService){}

    @Post(':userId')
    create(@Param('userId', ParseIntPipe) userId: number, @Body(ValidationPipe) createPostsDto: CreatePostsDto) {
        return this.postsService.create(userId, createPostsDto);
    }

    @Get(':userId')
    async findAll(@Param('userId', ParseIntPipe) userId: number){
        return await this.postsService.findAll(userId);
    }
}
