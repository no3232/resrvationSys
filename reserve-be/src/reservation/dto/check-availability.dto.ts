import { IsInt, Min } from 'class-validator';

export class CheckAvailabilityDto {
  @IsInt()
  timeSlotId: number;

  @IsInt()
  @Min(1)
  personCount: number;
}
