import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const Player = () => {
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [videoRef, setVideoRef] = useState(null);
  const [playlist, setPlaylist] = useState([
    "https://youtu.be/IHo1AzWHeV4",
    "https://youtu.be/3c5_Sff7JVE",
  ]);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setCurrentSongUrl(playlist[index]);
    setTimeout(() => {
      setMuted(false);
    }, 5000);
  }, [index, playlist]);

  const setNext = () => {
    setIndex((index + 1) % playlist.length);
  };

  const checkEmbeddable = async (url) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${url}`);
      const data = await response.json();
      return data.provider_name === "YouTube" && data.html;
    } catch (err) {
      return false;
    }
  };

  const playNextEmbeddable = async (index) => {
    let nextIndex = index;
    let embeddable = false;
    while (!embeddable && nextIndex < playlist.length) {
      embeddable = await checkEmbeddable(playlist[nextIndex]);
      if (!embeddable) {
        nextIndex++;
      }
    }
    setIndex(nextIndex % playlist.length);
  };

  return (
    <div>
      {currentSongUrl ? (
        <ReactPlayer
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
              autoplay: 1,
              enablejsapi: 1,
            },
          }}
          ref={videoRef}
          url={currentSongUrl}
          controls={true}
          width="100%"
          height="100%"
          playing={true}
          muted={muted}
          onEnded={setNext}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Player;
