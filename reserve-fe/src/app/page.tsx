"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      실시간 예약 테스트
      <br />
      <Link href="/polling">폴링</Link>
    </div>
  );
}
