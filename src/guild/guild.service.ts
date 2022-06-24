import { buildObject } from 'objectypes';
import { SendInfosDTO } from './../raider-io/dto/sendInfosDTO.dto';
import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GuildInfos } from './models/guildInfos.model';

@Injectable()
export class GuildService {
  private readonly logger: Logger = new Logger();

  constructor(
    @Inject(forwardRef(() => HttpService))
    private readonly httpService: HttpService,
    @Inject('KAFKA_QUEUE') private readonly client: ClientKafka,
  ) {}

  async sendGuildInfos(payload: SendInfosDTO) {
    try {
      const { region, realm, name } = payload;

      const params = {
        region,
        realm,
        name,
        fields: 'guild',
      };

      const response = this.httpService.get(process.env.RAIDERIO_URL, {
        params: params,
      });

      const promiseResponse = await lastValueFrom(response);

      const guildInfo = buildObject(GuildInfos, promiseResponse.data);
      guildInfo.realm = payload.realm;
      guildInfo.region = payload.region;

      this.client.emit('GuildInfosTopic', {
        pattern: 'GuildInfosTopic',
        data: guildInfo,
      });

      return guildInfo;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
