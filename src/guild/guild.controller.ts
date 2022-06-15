import { GuildService } from './guild.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/v1/guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post()
  sendInfos(@Body() payload: any): Promise<any> {
    return this.guildService.sendGuildInfos(payload);
  }
}
