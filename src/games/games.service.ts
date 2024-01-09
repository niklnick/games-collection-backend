import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { ReadGameDto } from './dto/read-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(@InjectRepository(Game) private readonly gamesRepository: Repository<Game>) { }

  async create(createGameDto: CreateGameDto): Promise<ReadGameDto> {
    const game: Game = this.gamesRepository.create(createGameDto);

    return new ReadGameDto(await this.gamesRepository.save(game));
  }

  async findAll(): Promise<ReadGameDto[]> {
    return (await this.gamesRepository.find({
      relations: {
        likes: true
      }
    })).map((game: Game) => new ReadGameDto(game));
  }

  async findOne(id: string): Promise<ReadGameDto> {
    const game: Game | null = await this.gamesRepository.findOne({
      where: { id: id },
      relations: {
        likes: true
      }
    });

    if (!game) throw new NotFoundException();

    return new ReadGameDto(game);
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<ReadGameDto> {
    const game: Game | null = await this.gamesRepository.findOne({
      where: { id: id }
    });

    if (!game) throw new NotFoundException();

    return new ReadGameDto(await this.gamesRepository.save({ ...game, ...updateGameDto }));
  }

  async remove(id: string): Promise<ReadGameDto> {
    const game: Game | null = await this.gamesRepository.findOne({
      where: { id: id }
    });

    if (!game) throw new NotFoundException();

    return new ReadGameDto(await this.gamesRepository.remove(game));
  }
}
