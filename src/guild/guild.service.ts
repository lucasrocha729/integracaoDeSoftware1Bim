import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GuildService {
  private readonly logger: Logger = new Logger();

  constructor(
    @Inject(forwardRef(() => HttpService))
    private readonly httpService: HttpService,
    @Inject('KAFKA_QUEUE') private readonly client: ClientKafka,
  ) {}

  async sendGuildInfos(payload: any) {
    try {
      const { region, realm, name } = payload;

      const params = {
        region,
        realm,
        name,
        fields: 'gear',
      };

      const response = this.httpService.get(process.env.RAIDERIO_URL, {
        params: params,
      });

      const promiseResponse = await lastValueFrom(response);

      this.client.emit('GuildInfosTopic', { data: promiseResponse.data });

      return promiseResponse.data;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
