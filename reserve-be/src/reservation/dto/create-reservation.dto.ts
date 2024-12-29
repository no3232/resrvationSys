import { IsInt, IsString, IsOptional, Min } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  userId: number;

  @IsInt()
  timeSlotId: number;

  @IsInt()
  @Min(1)
  personCount: number;

  @IsString()
  @IsOptional()
  note?: string;
}
