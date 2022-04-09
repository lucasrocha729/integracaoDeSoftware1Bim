import { IsNotEmpty, IsString } from 'class-validator';

export class SendInfosDTO {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  realm: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
