import React from "react";

import "../styles/katrori.css";
/*
Katrori paraqet nje njesi te vetme ne tabel permes se ciles loja zhvillohet
Ne vazhdim jane paraqitur ndryshimet ne ngjyra kur ne nje katror te vetem vendoset mausi ose kur aktivizohet
*/
function Square(props) {
  const opaqueBackgroundColor = props.isRedTurn ? "opaqueRed" : "opaqueYellow";
  let className;

  if (props.value == null)
    className =
      "square btn-default " + props.value + " " + opaqueBackgroundColor;
  else {
    className = "square btn-default " + props.value;
  }

  return <button className={className} onClick={props.onClick} />;
}

export default Square;