import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ReadUserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadUserDto> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReadUserDto> {
    return await this.usersService.remove(id);
  }
}
