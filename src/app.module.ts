import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaiderIoModule } from './raider-io/raider-io.module';

@Module({
  imports: [RaiderIoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
