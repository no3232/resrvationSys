import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationGateway } from './reservation.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReservationController],
  providers: [
    {
      provide: ReservationService,
      useClass: ReservationService,
    },
    {
      provide: ReservationGateway,
      useClass: ReservationGateway,
    },
  ],
  exports: [],
})
export class ReservationModule {}
