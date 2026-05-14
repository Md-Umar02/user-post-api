import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    // private users = [
    //     {
    //         id: 1,
    //         name: "a",
    //         age: 100
    //     }
    // ];

    constructor(private prisma: PrismaService) {}

    async findAll(name?: string) {
        if(name){
            return await this.prisma.user.findMany({
                where: {
                    name
                }
            })
        }

        return await this.prisma.user.findMany();
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
        // const newUser = {
        //     id: this.users.length + 1,
        //     ...createUserDto
        // }
        // this.users.push(newUser);
        // return this.users;
        const createdUser = await this.prisma.user.create({
            data: createUserDto
        });
        return createdUser;
    }

    async update(id: number, createUserDto: CreateUserDto) {
    //     const index = this.users.findIndex(user => user.id === id)
    //     return this.users[index] = {
    //         id: Number(id),
    //         ...user
    //     }
        return this.prisma.user.update({
                where: {
                    id: id,
                },
                data: createUserDto
            })
    }

    async updateField(id: number, updateUserDto: UpdateUserDto) {
    //     const index = this.users.findIndex(
    //         user => user.id === Number(id)
    //     );
    //     return this.users[index] = {
    //         ...this.users[index],
    //         ...users
    //     };
        return this.prisma.user.update({
                where: {              id: id,
                },
                data: updateUserDto
            })
    }

    async delete(id: number) {
    //     const removedUser = this.getById(id);
    //     this.users = this.users.filter(user => user.id !== id);
    //     return removedUser;
        return this.prisma.user.delete({
            where: {
                    id: id,
                }
        })
    }
}
