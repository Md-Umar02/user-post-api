import { Controller, Post, Body, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService){}

    @Post(':userId')
    getAll(@Param('userId', ParseIntPipe) userId: number, @Body(ValidationPipe) createPostsDto: CreatePostsDto) {
        return this.postsService.create(userId, createPostsDto);
    }
}
