import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaiderIoModule } from './raider-io/raider-io.module';
import { ConfigModule } from '@nestjs/config';
import { GuildModule } from './guild/guild.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RaiderIoModule,
    GuildModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
