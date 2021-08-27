import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { options } from './config/orm';
import { RepoModule } from './repo.module';

@Module({
  imports: [TypeOrmModule.forRoot(options), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
