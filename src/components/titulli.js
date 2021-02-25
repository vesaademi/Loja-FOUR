import React from "react";

import "../styles/titulli.css";
/*
Titulli ne fillim te faqes per lojen po ashtu edhe nese njeri nga lojtaret fiton do te shfaqet nje mesazh cili prej tyre ka fituar
dhe ne te eshte perfshir nje animacion me ngjyra. Varesisht se cili nga lojtaret ka fituar lojen me ngjyren e atij lojtari do te filloj
animacioni
*/
function Title(props) {
  const color = props.isRedTurn ? "red-turn" : "yellow-turn";
  const gameStatusTitle = props.isGameWon ? "game-won" : "";
  const titleClassName = "title " + gameStatusTitle;

  let message;

  if (props.isGameTied) message = "Players Have Tied";
  else {
    const player = props.isRedTurn ? "Player Red, " : "Player Yellow, ";
    const messageToPlayer = props.isGameWon
      ? " You Have Won!"
      : " It Is Your Turn";

    message = player + messageToPlayer;
  }
  return (
    <div className={titleClassName}>
      <h3>FOUR GAME</h3>

      <h6 className={color}>{message}</h6>
    </div>
  );
}

export default Title;
