import { Injectable } from '@nestjs/common';
import { CreatePostsDto } from './posts.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {

    constructor(
      private prisma: PrismaService
    ) {}

    async create(
      userId: number, createPostsDto: CreatePostsDto) {

        const createdPost =
          await this.prisma.post.create({

            data: {
                ...createPostsDto,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }

        });

        return createdPost;
    }
}