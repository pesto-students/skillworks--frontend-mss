import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./artist_Card.module.css";
function Artist_Card({ id, firstName, lastName, imageUrl }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_image_container}>
        <img
          loading="lazy"
          src={imageUrl}
          alt="description of the image"
          className={styles.avatar}
        />
      </div>
      <div className={styles.card_text}>{firstName + " " + lastName}</div>
    </div>
  );
}

export default Artist_Card;
