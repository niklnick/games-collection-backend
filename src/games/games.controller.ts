import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGameDto } from './dto/create-game.dto';
import { ReadGameDto } from './dto/read-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GamesService } from './games.service';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createGameDto: CreateGameDto): Promise<ReadGameDto> {
    return await this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll(): Promise<ReadGameDto[]> {
    return await this.gamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadGameDto> {
    return await this.gamesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<ReadGameDto> {
    return await this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<ReadGameDto> {
    return await this.gamesService.remove(id);
  }
}
