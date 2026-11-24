import liveStreams from "@/data/liveStreams";

function byStartTime(a, b) {
  return new Date(a.startsAt) - new Date(b.startsAt);
}

export async function getCurrentLiveStream() {
  return liveStreams.find((stream) => stream.status === "LIVE") || null;
}

export async function getUpcomingStreams() {
  return liveStreams.filter((stream) => stream.status === "SCHEDULED").sort(byStartTime);
}

export async function getPastStreams(limit = 6) {
  return liveStreams
    .filter((stream) => stream.status === "ENDED")
    .sort((a, b) => byStartTime(b, a))
    .slice(0, limit);
}
