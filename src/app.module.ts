import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaiderIoModule } from './raider-io/raider-io.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RaiderIoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
