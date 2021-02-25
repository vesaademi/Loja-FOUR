import React from "react";
import $ from 'jquery';
import "../styles/niveliPerRobot.css";

/*
Butonat ne pjesen e poshtme per te percaktuar nivelin e veshtiresise kur loja zhvillohet me robotin 
  -Butonat nuk jane aktiv ne qoftese nuk eshte CPU modi, qe do te thote nuk jane aktiv kur perdoruesi zhvillon lojen me nje lojtar tjeter
*/
function GameLevel(props) {
  if (!props.isCPUMode) {
    $(".level").prop("disabled", true);
    console.log("not cpumode");
  } else {
    $(".level").prop("disabled", false);
  }

  return (
    <div>
      <div className="level" style={{border:"2px solid #add8e6", borderTop:"0px", borderBottom:"0px"}}>Level Difficulty</div>
      <div className="gameLevels">
      <button className="easyLevel level" onClick={props.changeToEasy}>
        EASY
      </button>
      <button className="normalLevel level" onClick={props.changeToNormal}>
        NORMAL
      </button>
      <button className="hardLevel level" onClick={props.changeToHard}>
        HARD
      </button>
    </div>
    
    
    </div>
   
  );
}

export default GameLevel;
