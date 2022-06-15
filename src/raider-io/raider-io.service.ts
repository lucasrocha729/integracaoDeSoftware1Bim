import { SendInfosDTO } from './dto/sendInfosDTO.dto';
import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { buildObject } from 'objectypes';
import { Character } from './models/character.model';
import { lastValueFrom } from 'rxjs';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class RaiderIoService {
  private readonly logger: Logger = new Logger();

  constructor(
    @Inject(forwardRef(() => HttpService))
    private readonly httpService: HttpService,
    @Inject('CLIENT_SERVICE') private client: ClientProxy,
  ) {}

  async sendInfos(payload: SendInfosDTO): Promise<Character> {
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

      const characterInfos = buildObject(Character, promiseResponse.data);
      characterInfos.name = payload.name;

      const record = new RmqRecordBuilder(characterInfos)
        .setOptions({
          headers: {
            ['x-version']: '1.0.0',
          },
          priority: 1,
        })
        .build();

      this.client.emit('characterInfosQueue', record);

      this.logger.log('Message publish in characterInfosQueue');

      return characterInfos;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
