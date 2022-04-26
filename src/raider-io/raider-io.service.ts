import { SendInfosDTO } from './dto/sendInfosDTO.dto';
import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { buildObject } from 'objectypes';
import { Character } from './models/character.model';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RaiderIoService {
  private readonly logger: Logger = new Logger();

  constructor(
    @Inject(forwardRef(() => HttpService))
    private readonly httpService: HttpService,
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

      await lastValueFrom(
        this.httpService.post(
          process.env.MANAGEMENT_GROUPS_URL,
          characterInfos,
        ),
      );

      return characterInfos;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
