import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async findAll(): Promise<ReadUserDto[]> {
    return (await this.usersRepository.find({
      relations: {
        createdGames: true,
        likedGames: true
      }
    })).map((user: User) => new ReadUserDto(user));
  }

  async findOne(id: string): Promise<ReadUserDto> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id },
      relations: {
        createdGames: true,
        likedGames: true
      }
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
