const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Dhaka",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Dhaka",
});

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export default function formatDate(dateString) {
  return dateFormatter.format(new Date(dateString));
}

export function formatTime(dateString) {
  return timeFormatter.format(new Date(dateString));
}

export function formatDay(dateString) {
  return dayFormatter.format(new Date(dateString));
}
