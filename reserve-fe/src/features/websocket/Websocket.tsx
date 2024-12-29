"use client";

import { ITimeSlot } from "@/types/type";
import { useEffect, useState } from "react";
import ReservationButton from "../common/ReservationButton";
import { io } from "socket.io-client";

const Websocket = () => {
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);

  useEffect(() => {
    // Socket.IO 클라이언트 인스턴스 생성
    const socket = io("http://localhost:3030");

    // 연결 이벤트 리스너
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // 타임슬롯 데이터 수신 리스너
    socket.on("timeSlots", (data: ITimeSlot[]) => {
      setTimeSlots(data);
    });

    // 에러 처리
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    // 클린업 함수
    return () => {
      socket.disconnect();
    };
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

export default Websocket;
