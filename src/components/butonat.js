import React from "react";

import "../styles/butonat.css";

import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';

/*
Butonat
 - Butoni i pare eshte per te luajtur me robotin
 - Butoni i dyte lejon qe te luajn dy lojtar
 - Rifillo butoni lejon perdoruesit te rifillojne lojen
*/

function GameButton(props) {
  return (
    <div className="allButtonsContainer">
      <div className="gameModeButtons">
        <button
          className="CPUModeButton gameModeButton"
          onClick={props.selectCPUMode}
        >
          <PersonOutlineOutlinedIcon/>
        </button>
        <button
          className="twoPlayerModeButton gameModeButton"
          onClick={props.selectTwoPlayerMode}
        >
          <GroupOutlinedIcon/>
        </button>
      </div>
      <div className="resetButton">
        <button className="gameModeButton" onClick={props.reset}>
          <RefreshOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default GameButton;
