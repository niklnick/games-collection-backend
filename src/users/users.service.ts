import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user: User = this.usersRepository.create(createUserDto);

    return new ReadUserDto(await this.usersRepository.save(user));
  }

  async findAll(): Promise<ReadUserDto[]> {
    return (await this.usersRepository.find()).map((user: User) => new ReadUserDto(user));
  }

  async findOne(id: string): Promise<ReadUserDto> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id }
    });

    if (!user) throw new NotFoundException();

    return new ReadUserDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id }
    });

    if (!user) throw new NotFoundException();

    return new ReadUserDto(await this.usersRepository.save({ ...user, ...updateUserDto }));
  }

  async remove(id: string): Promise<ReadUserDto> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id }
    });

    if (!user) throw new NotFoundException();

    return new ReadUserDto(await this.usersRepository.remove(user));
  }
}
