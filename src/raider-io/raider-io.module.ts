import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RaiderIoController } from './raider-io.controller';
import { RaiderIoService } from './raider-io.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'characterInfosQueue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RaiderIoService],
  controllers: [RaiderIoController],
})
export class RaiderIoModule {}
