import { react, useState, useEffect, useContext, useRef } from "react";
import styles from "./main.module.css";
import ReactPlayer from "react-player/youtube";
import axios from "axios";
import { Current_context } from "../../context/current_state_Context";
import Slider from "../../helper/Slider";

function Main() {
  const a = useContext(Current_context);
  const videoRef = useRef(null);
  const [currentSongUrl, setCurrentSongUrl] = useState(a.current_state.song_id);
  const [playlist, setPlaylist] = useState([]);
  let [currentCount, setCurrentCount] = useState(0);

  const [currentSong, setCurrentSong] = useState(null);

  // this function gets songs data including raga,prahar ,song url
  const checkEmbeddable = async (url) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${url}`);
      const data = await response.json();
      console.log(data);
      return data.provider_name === "YouTube" && data.html;
    } catch (err) {
      return false;
    }
  };
  // ! it runs at the end i.e 3rd
  useEffect(() => {
    const fetchData = async (song_id) => {
      try {
        const response = await axios.get(
          `http://localhost:5678/getSongs/${song_id}`
        );

        if (response.data) {
          setCurrentSongUrl(response.data[0].youtube_link);
          setCurrentSong(response.data);
        } else {
          setCurrentCount(currentCount + 1);
        }
      } catch (err) {
        console.log(`error in fetching song data`, err);
      }
    };
    fetchData(a.current_state.song_id);
  }, [a.current_state.song_id]);

  //! this use effect runs when the prahar changes in ths component it runs first
  useEffect(() => {
    console.log(`main component mounted`);
    const fetchPlaylistData = async (prahar) => {
      try {
        const response = await axios.get(
          `http://localhost:5678/song_id/${prahar}`
        );
        console.log(response.data);
        if (response.data.length != 0) {
          setPlaylist(response.data);
        } else {
          setPlaylist([{ id: 28 }]);
        }
        console.log(`this is the response sons id endpoint`);
        console.log(response.data);
      } catch (err) {
        console.log(`error in fetching song data`, err);
      }
    };

    if (a.current_state.prahar) {
      console.log(
        `this is from fetchPlaylistDate function : ${a.current_state.prahar}`
      );
      fetchPlaylistData(a.current_state.prahar);
    }
  }, [a.current_state.prahar]);
  //! this runs when playlist changes i.e it runs second in this component
  useEffect(() => {
    if (playlist.length) {
      console.log(`a song is being fetched`);
      a.update_song_id(playlist[currentCount].id);
    }
  }, [playlist, currentCount]);

  const setNext = () => {
    console.log(`i was called set next`);
    if (playlist.length > currentCount) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentCount(0);
    }
  };

  return (
    <div className={styles.masterContainer}>
      <div className={styles.masterContainer__left}>
        <div className={styles.playerContainer}>
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
              muted={true}
              onEnded={setNext}
            />
          ) : (
            "loading..."
          )}
        </div>
      </div>
      <div className={styles.masterContainer__right}>
        <div className={styles.sliderContainer}>
          <Slider>
            <div className={styles.slide}>
              {currentSong ? (
                <div className={styles.right_info}>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <p className={styles.song_title}>{currentSong[0].title}</p>
                    <p className={styles.raga_name}>
                      {" "}
                      Raga {currentSong[0].raga_name}
                    </p>
                  </div>

                  <p className={styles.ragaDescription}>
                    {currentSong[0].description}
                  </p>
                  <p style={{ display: "flex", alignItems: "flex-start" }}>
                    {" "}
                    {currentSong[0].mood.split(",").map((item) => {
                      return <h4 className={styles.raga_name}>{item}</h4>;
                    })}
                  </p>
                </div>
              ) : (
                "loading..."
              )}
            </div>
            <div className={styles.slide}>
              {currentSong ? (
                <div className={styles.right_info}>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <p className={styles.song_title}>
                      {currentSong[0].firstName} {currentSong[0].lastName}
                    </p>
                  </div>

                  <p className={styles.ragaDescription}>{currentSong[0].bio}</p>
                </div>
              ) : (
                "loading..."
              )}
            </div>
            <div className={styles.slide}>third slide</div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Main;
