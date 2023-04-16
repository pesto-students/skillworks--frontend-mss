import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

import Main from "./components/Main/Main.container";
import Navbar from "./components/NavBar/Navbar";

import Current_state from "./context/current_state_Context";
import Time from "./helper/time";
import { useContext, useEffect, useState } from "react";
import { Current_context } from "./context/current_state_Context";
// import { RagaSongs } from "./components/Raga/Raga_container";
import axios from "axios";

import Home from "./views/Home";
function App() {
  return (
    <Current_state>
      <Time />
      <div className="App">
        <div className="relative-container">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="raga/:id" element={<RagaSongs />} />
            <Route path="artist/:id" element={<ArtistSongs />} />
          </Routes>

          <Main className="Main" />
        </div>
      </div>
    </Current_state>
  );
}

export default App;

function ArtistSongs() {
  // use the match object to fetch the data for the selected artist
  const [songsList, setSongsList] = useState(null);
  const song = useContext(Current_context);

  const { id } = useParams();

  const playSong = (id) => {
    song.update_song_id(id);
  };
  useEffect(() => {
    console.log(`this is the artist id`, id);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5678/allSongsByArtist/${id}`,
      headers: {
        Cookie: "cookiename=cookievalue",
      },
    };

    axios(config) 
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setSongsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return songsList ? (
    <div className="list_container">
      {songsList.map((item) => {
        return (
          <div key={item.id}>
            <div className="list_item" onClick={() => playSong(item.id)}>
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    "Sorry no song for this Raga"
  );
}

function RagaSongs() {
  const [songsList, setSongsList] = useState(null);
  const song = useContext(Current_context);
  const { id } = useParams();
  const playSong = (id) => {
    song.update_song_id(id);
  };
  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5678/allSongs/${id}`,
      headers: {
        Cookie: "cookiename=cookievalue",
      },
    };

    axios(config)
      .then(function (response) {
        setSongsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return songsList ? (
    <div className="list_container">
      {songsList.map((item) => {
        return (
          <div key={item.id}>
            <div className="list_item" onClick={() => playSong(item.id)}>
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    "Sorry no song for this Raga"
  );
}
