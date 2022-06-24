import { SendInfosDTO } from './../raider-io/dto/sendInfosDTO.dto';
import { GuildService } from './guild.service';
import { Body, Controller, Post } from '@nestjs/common';

/**
 * @api {post} api/v1/guild Send guild infos
 * @apiName Guild
 * @apiGroup Guild
 *
 * @apiParam {string} region Region character.
 * @apiParam {string} realm Server character .
 * @apiParam {string} name Identification character.
 *
 * @apiSuccessExample {json} Success example.
 * HTTP/1.1 201 OK
 *
 * {
 * 	"name": "Egyptianwomn",
 * 	"class": "Monk",
 * 	"guildName": "Instant Dollars",
 * 	"realm": "Mal'Ganis",
 * 	"region": "us"
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
@Controller('api/v1/guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post()
  sendInfos(@Body() payload: SendInfosDTO): Promise<any> {
    return this.guildService.sendGuildInfos(payload);
  }
}
