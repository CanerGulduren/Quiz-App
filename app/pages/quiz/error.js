"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div>
        <button onClick={() => router.push("/pages/category")}>Retry</button>
      </div>
    </div>
  );
}
