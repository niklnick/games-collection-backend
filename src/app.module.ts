import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule
  },
  {
    path: 'games',
    module: GamesModule
  },
  {
    path: 'users',
    module: UsersModule
  }
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register(routes),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    GamesModule,
    UsersModule
  ]
})
export class AppModule { }
