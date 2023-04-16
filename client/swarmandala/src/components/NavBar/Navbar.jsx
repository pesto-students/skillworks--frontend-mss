import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./navber.module.css";
import useDebounce from "../../helper/useDebounce";
import axios from "axios";
import { Link } from "react-router-dom";
import { Current_context } from "../../context/current_state_Context";

function Navbar() {
  const song_context = useContext(Current_context);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearch = useDebounce(input, 2000);
  const inputRef = useRef();
  const searchSong = (e) => {
    if (e.target.value) {
      setInput(e.target.value);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setInput("");
    }
  };
  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5678/search/${debouncedSearch}`,
      headers: {
        Cookie: "cookiename=cookievalue",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const result = response.data;
        console.log(`this is the result`, result);
        setResult(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [debouncedSearch]);
  useEffect(() => {
    if (inputRef.current.value.length === 0) {
      setResult(null);
    }
  }, [inputRef]);

  const handelClick = (id) => {
    console.log(`clicked`, id);
    song_context.update_song_id(id);
  };

  return (
    <div className={style.nav_container}>
      <div className={style.logo_container}>
        <Link to="/">
          <img src="https://i.ibb.co/s5Lm3HH/logo-2.png" className="logo" />
        </Link>
      </div>
      <div className={style.brand_container}>
        <div className={style.nav_brand_name}>Swarmandala</div>
        <div className={style.nav_brand_tagline}>
          Unleash the melodic world of Indian classical music
        </div>
      </div>
      <div className={style.nar_search_container}>
        <input
          value={input}
          ref={inputRef}
          placeholder="Search raga , artist ,songs"
          onChange={(e) => searchSong(e)}
        ></input>
        {result && showDropdown && (
          <ul className={style.searchResult}>
            <div>Songs</div>
            {result &&
              result.songs.map((item) => (
                <li
                  key={item.id}
                  className="list_item"
                  onClick={() => handelClick(item.id)}
                >
                  {item.title}
                </li>
              ))}
            <div>Artists</div>
            {result &&
              result.artist &&
              result.artist.map((item) => (
                <Link to={`/artist/${item.id}`}>
                  <li
                    key={item.id}
                    className="list_item"
                    onClick={() => handelArtistClick(item.id)}
                  >
                    {item.firstName + " " + item.lastName}
                  </li>
                </Link>
              ))}
            <div>Ragas</div>
            {result &&
              result.ragas &&
              result.ragas.map((item) => (
                <Link to={`/raga/${item.id}`}>
                  <li key={item.id} className="list_item">
                    {item.name}
                  </li>
                </Link>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
