import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationResponseDto } from './dto/reservation-response.dto';
import { ReservationGateway } from './reservation.gateway';

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ReservationGateway))
    private gateway: ReservationGateway,
  ) {}

  async getTimeSlots() {
    return this.prisma.timeSlot.findMany({
      orderBy: {
        startTime: 'asc',
      },
      include: {
        reservations: {
          select: {
            id: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
  }

  async createReservation(
    data: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    // 1. 해당 시간대가 존재하는지 확인
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: data.timeSlotId },
      include: {
        reservations: {
          select: {
            id: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    if (!timeSlot) {
      throw new Error('존재하지 않는 시간대입니다.');
    }

    const [reservation] = await this.prisma.$transaction([
      this.prisma.reservation.create({
        data: {
          user: {
            connect: { id: data.userId },
          },
          timeSlot: {
            connect: { id: data.timeSlotId },
          },
          personCount: data.personCount,
          note: data.note,
          status: 'PENDING',
        },
      }),
      this.prisma.timeSlot.update({
        where: { id: data.timeSlotId },
        data: {
          isActive: false,
        },
      }),
    ]);

    // WebSocket으로 업데이트된 타임슬롯 전송
    await this.gateway.broadcastTimeSlots();

    return new ReservationResponseDto(reservation);
  }

  async cancelReservation(id: number) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new Error('존재하지 않는 예약입니다.');
    }

    await this.prisma.$transaction([
      this.prisma.reservation.delete({
        where: { id },
      }),
      this.prisma.timeSlot.update({
        where: { id: reservation.timeSlotId },
        data: {
          isActive: true,
        },
      }),
    ]);

    await this.gateway.broadcastTimeSlots();

    return new ReservationResponseDto(reservation);
  }
}
