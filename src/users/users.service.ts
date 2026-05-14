import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MESSAGES } from '../common/constants';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async findAll(name?: string) {
        if(name){
            return await this.prisma.user.findMany({
                where: {
                    name
                }
            })
        }
        const users = await this.prisma.user.findMany({
            include: {
                posts: true
            }
        });
        return users;
    }

    async getById(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });
        if(!user) throw new NotFoundException('User Not Found');
        return user;
    }

    async create(createUserDto: CreateUserDto) {
        const createdUser = await this.prisma.user.create({
            data: createUserDto
        });
        return {
            statusCode: 201,
            message: MESSAGES.POST_CREATED
        };
    }

    async update(id: number, createUserDto: CreateUserDto) {
        const updatedUser = this.prisma.user.update({
                where: {
                    id: id,
                },
                data: createUserDto
            })
        return {
            statusCode: 201,
            message: MESSAGES.USER_UPDATED
        };
    }

    async updateField(id: number, updateUserDto: UpdateUserDto) {
        const updatedUser =  this.prisma.user.update({
                where: {              id: id,
                },
                data: updateUserDto
            })
        return {
            statusCode: 201,
            message: MESSAGES.USER_UPDATED
        };
    }

    async delete(id: number) {
        const deletedUser = this.prisma.user.delete({
            where: {
                    id: id,
                }
        })
        return {
            statusCode: 200,
            message: MESSAGES.USER_DELETED
        }; ;
    }
}
