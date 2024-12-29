import { PrismaClient } from '@prisma/client';
import { ReservationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 사용자 데이터 생성
  const user1 = await prisma.user.create({
    data: {
      email: 'test1@example.com',
      name: '홍길동',
      phone: '010-1234-5678',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'test2@example.com',
      name: '김철수',
      phone: '010-8765-4321',
    },
  });

  // TimeSlot 데이터 생성
  const timeSlot1 = await prisma.timeSlot.create({
    data: {
      startTime: new Date('2024-03-20T10:00:00Z'),
      endTime: new Date('2024-03-20T11:00:00Z'),
      capacity: 2,
      isActive: false,
    },
  });

  const timeSlot2 = await prisma.timeSlot.create({
    data: {
      startTime: new Date('2024-03-20T11:00:00Z'),
      endTime: new Date('2024-03-20T12:00:00Z'),
      capacity: 2,
      isActive: false,
    },
  });

  const timeSlot3 = await prisma.timeSlot.create({
    data: {
      startTime: new Date('2024-03-20T12:00:00Z'),
      endTime: new Date('2024-03-20T13:00:00Z'),
      capacity: 2,
      isActive: true,
    },
  });

  // 예약 데이터 생성
  await prisma.reservation.create({
    data: {
      userId: user1.id,
      timeSlotId: timeSlot1.id,
      status: ReservationStatus.CONFIRMED,
      personCount: 1,
      note: '창가 자리 요청',
    },
  });

  await prisma.reservation.create({
    data: {
      userId: user2.id,
      timeSlotId: timeSlot2.id,
      status: ReservationStatus.PENDING,
      personCount: 2,
      note: '알러지 있음',
    },
  });

  console.log('시드 데이터가 성공적으로 생성되었습니다.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
