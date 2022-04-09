import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RaiderIoController } from './raider-io.controller';
import { RaiderIoService } from './raider-io.service';

@Module({
  imports: [HttpModule],
  providers: [RaiderIoService],
  controllers: [RaiderIoController],
})
export class RaiderIoModule {}
