import { Reservation, ReservationStatus } from '@prisma/client';

export class ReservationResponseDto {
  id: number;
  status: ReservationStatus;
  personCount: number;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  timeSlotId: number;

  constructor(reservation: Reservation) {
    this.id = reservation.id;
    this.status = reservation.status;
    this.personCount = reservation.personCount;
    this.note = reservation.note;
    this.createdAt = reservation.createdAt;
    this.updatedAt = reservation.updatedAt;
    this.userId = reservation.userId;
    this.timeSlotId = reservation.timeSlotId;
  }
}
