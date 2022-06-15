import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'KAFKA_QUEUE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'KAFKA_CLIENT_ID',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'GROUP_ID',
          },
        },
      },
    ]),
  ],
  providers: [GuildService],
  controllers: [GuildController],
})
export class GuildModule {}
