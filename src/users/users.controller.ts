import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Query, 
    Put, 
    Patch, 
    Delete,
    ParseIntPipe,
    ValidationPipe,
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
    SwaggerModule, 
    ApiQuery 
} from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getById(id);
    }

    @Get()
    @ApiQuery({
    name: 'name',
    required: false
    })
    async findAll(@Query('name') name?: string){
        return await this.userService.findAll(name);
    }

    @Post() 
    async postData(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Put(':id') 
    async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) createUserDto: CreateUserDto) {
        return await this.userService.update(id, createUserDto);
    }

    @Patch(':id')
    async updateField(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return await this.userService.updateField(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id);
    }
}
