"use client";

import { useState } from "react";
import EpisodeList from "@/components/pages/podcasts/EpisodeList";
import EpisodePlayer from "@/components/pages/podcasts/EpisodePlayer";

export default function PodcastPlayer({ episodes }) {
  const [currentId, setCurrentId] = useState(episodes[0].id);
  const currentIndex = episodes.findIndex((episode) => episode.id === currentId);

  function selectEpisode(id) {
    setCurrentId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <EpisodePlayer episode={episodes[currentIndex]} number={episodes.length - currentIndex} />
      <EpisodeList episodes={episodes} currentId={currentId} onSelect={selectEpisode} />
    </>
  );
}
