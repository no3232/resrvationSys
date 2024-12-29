"use client";

import { ITimeSlot } from "@/types/type";
import { useEffect, useState } from "react";
import ReservationButton from "../common/ReservationButton";

const Polling = () => {
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(
        "http://localhost:3030/reservation/time-slots"
      );
      const data = await response.json();
      setTimeSlots(data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  useEffect(() => {
    // 초기 데이터 로드
    fetchTimeSlots();

    // 5초마다 데이터 갱신
    const pollingInterval = setInterval(() => {
      fetchTimeSlots();
    }, 1000); // 5초 간격

    // 컴포넌트 언마운트시 인터벌 정리
    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">예약 가능 시간</h1>
      <div className="grid gap-4">
        {timeSlots.map((slot) => (
          <ReservationButton key={slot.id} {...slot} />
        ))}
      </div>
    </div>
  );
};

export default Polling;
