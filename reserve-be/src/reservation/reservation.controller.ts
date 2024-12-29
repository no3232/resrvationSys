import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('time-slots')
  async getTimeSlots() {
    return await this.reservationService.getTimeSlots();
  }

  @Post('')
  async createReservation(@Body() data: CreateReservationDto) {
    return await this.reservationService.createReservation(data);
  }

  @Delete(':id')
  async cancelReservation(@Param('id') id: string) {
    return await this.reservationService.cancelReservation(Number(id));
  }
}
