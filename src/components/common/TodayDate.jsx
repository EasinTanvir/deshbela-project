"use client";

import { useSyncExternalStore } from "react";

const fullFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

function subscribe() {
  return () => {};
}

export default function TodayDate({ format = "full" }) {
  const text = useSyncExternalStore(
    subscribe,
    () => (format === "year" ? String(new Date().getFullYear()) : fullFormatter.format(new Date())),
    () => ""
  );

  return <span suppressHydrationWarning>{text}</span>;
}
