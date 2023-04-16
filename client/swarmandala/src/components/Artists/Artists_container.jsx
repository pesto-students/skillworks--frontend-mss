import React, { useState, useEffect } from "react";
import axios from "axios";
import Artist_Card from "./Artist_Card";
import styles from "./artist_Card.module.css";
import { Link } from "react-router-dom";
function Artists_container() {
  const [artistData, setArtistData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5678/getArtists");
        setArtistData(response.data);
      } catch (err) {
        console.log(`error in fatching artist data`, err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.main}>
      {artistData ? (
        artistData.map((artist) => {
          return (
            <Link to={`/artist/${artist.id}`}>
              <Artist_Card
                key={artist.id}
                id={artist.id}
                firstName={artist.firstName}
                lastName={artist.lastName}
                imageUrl={artist.image}
              />
            </Link>
          );
        })
      ) : (
        <p>loading ....</p>
      )}
    </div>
  );
}

export default Artists_container;
