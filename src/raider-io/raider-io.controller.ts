import { RaiderIoService } from './raider-io.service';
import { SendInfosDTO } from './dto/sendInfosDTO.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { Character } from './models/character.model';

@Controller('api/v1/raider-io')
export class RaiderIoController {
  constructor(private readonly raiderIoService: RaiderIoService) {}

  /**
   * @api {post} api/v1/raider-io Send character infos
   * @apiName RaiderIO
   * @apiGroup Character
   *
   * @apiParam {string} region Region character.
   * @apiParam {string} realm Server character .
   * @apiParam {string} name Identification character.
   *
   * @apiSuccessExample {json} Success example.
   * HTTP/1.1 201 OK
   *
   * {
   *   "name": "Noiruf",
   *   "class": "Druid",
   *   "activeSpecName": "Restoration",
   *   "activeSpecRole": "HEALING",
   *   "faction": "horde",
   *   "region": "us",
   *   "itemLevelEquipped": 262
   * }
   *
   * @apiErrorExample {json} Error example.
   * HTTP/1.1 404 Bad Request
   *
   * {
   *  "statusCode": 404,
   *  "message": "Unexpected token } in JSON at position 40",
   *  "error": "Bad Request"
   * }
   *
   */

  @Post()
  sendInfos(@Body() payload: SendInfosDTO): Promise<Character> {
    return this.raiderIoService.sendInfos(payload);
  }
}
