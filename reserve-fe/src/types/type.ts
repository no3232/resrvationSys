interface IReservation {
  id: number;
}

interface ITimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  capacity: number;
  isActive: boolean;
  reservations: IReservation[];
}

interface ICreateReservation {
  userId: number;
  timeSlotId: number;

  personCount: number;
  note?: string;
}

export type { ITimeSlot, ICreateReservation };
