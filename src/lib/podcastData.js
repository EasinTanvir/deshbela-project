import media from "@/data/media";
import podcastEpisodes from "@/data/podcastEpisodes";
import { newestFirst } from "@/lib/articleHelpers";

function withAudio(episode) {
  const audio = media.find((item) => item.id === episode.audioMediaId);
  return { ...episode, audioUrl: audio ? audio.file : null };
}

export async function getPodcastEpisodes() {
  return [...podcastEpisodes].sort(newestFirst).map(withAudio);
}
