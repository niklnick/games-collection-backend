import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UsersModule } from './users/users.module';

const routes: Routes = [
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
    UsersModule
  ]
})
export class AppModule { }
