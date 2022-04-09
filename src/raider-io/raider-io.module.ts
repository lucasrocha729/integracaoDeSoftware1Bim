import { RaiderIoController } from './raider-io.controller';
import { RaiderIoService } from './raider-io.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RaiderIoService],
  controllers: [RaiderIoController],
})
export class RaiderIoModule {}
