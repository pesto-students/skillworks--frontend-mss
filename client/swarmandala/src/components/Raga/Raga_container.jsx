import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./raga.style.module.css";
function Raga_container() {
  const [ragaData, setRagaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5678/getRagas");
        setRagaData(response.data);
      } catch (err) {
        console.error(`Error in fetching raga data:`, err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main">
      {ragaData.length ? (
        ragaData.map((raga) => {
          const colorStops = raga.image.map((color) =>
            color.split(",").slice(0, 4).join(",")
          );

          const gradientString = `radial-gradient(at top left, rgb${colorStops[0]}, rgb${colorStops[1]}, rgb${colorStops[2]})`;

          return (
            <div className={styles.container} key={raga.id}>
              <Link to={`/raga/${raga.id}`}>
                <div>
                  <div
                    className={styles.image}
                    style={{ background: gradientString }}
                  />
                  <div className={styles.raga_name}>Raga {raga.name}</div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Raga_container;
