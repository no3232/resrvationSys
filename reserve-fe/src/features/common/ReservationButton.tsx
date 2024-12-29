import { ICreateReservation, ITimeSlot } from "@/types/type";

const ReservationButton = (info: ITimeSlot) => {
  const handleReservation = () => {
    const reservationData: ICreateReservation = {
      userId: 1,
      timeSlotId: info.id,
      personCount: 1,
    };

    fetch("http://localhost:3030/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
  };

  const handleCancel = () => {
    fetch(`http://localhost:3030/reservation/${info.reservations[0].id}`, {
      method: "DELETE",
    });
  };

  return (
    <button
      key={info.id}
      className={`p-4 border rounded-lg 
        ${info.isActive ? "bg-green-50" : "bg-gray-50"}
        ${info.isActive ? "cursor-pointer" : "cursor-not-allowed"}
      `}
      onClick={info.isActive ? handleReservation : handleCancel}
    >
      <p className="font-semibold">
        {new Date(info.startTime).toLocaleTimeString()} -{" "}
        {new Date(info.endTime).toLocaleTimeString()}
      </p>
      <p>수용 인원: {info.capacity}명</p>
      <p>상태: {info.isActive ? "예약 가능" : "예약 불가"}</p>
    </button>
  );
};

export default ReservationButton;
