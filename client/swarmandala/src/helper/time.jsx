import React, { useContext, useState, useEffect } from "react";
import { Current_context } from "../context/current_state_Context";

export default function Time() {
  const context = useContext(Current_context);

  useEffect(() => {
    const setPrahar = () => {
      const currentHour = new Date().getHours();
      let prahar;
      switch (true) {
        case currentHour <= 3:
          prahar = "Saptami";
          break;
        case currentHour <= 6:
          prahar = "Ashtami";
          break;
        case currentHour <= 9:
          prahar = "Pratham";
          break;
        case currentHour <= 12:
          prahar = "Dwitiya";
          break;
        case currentHour <= 15:
          prahar = "Tritiya";
          break;
        case currentHour <= 18:
          prahar = "Chaturth";
          break;
        case currentHour <= 21:
          prahar = "Pancham";
          break;
        default:
          prahar = "Shasth";
          break;
      }
      context.update_prahar(prahar);
      console.log(`${prahar}`);
    };
    setPrahar();
  }, []);

  return null;
}
