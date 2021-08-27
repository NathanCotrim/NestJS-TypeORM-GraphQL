import { Controller, Get } from '@nestjs/common';
import { RepoService } from './repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  @Get('/count/messages')
  async getHello(): Promise<string> {
    return `There are ${await this.repoService.userRepo.count()} existent messages`;
  }
}
