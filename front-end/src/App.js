import React, {Component,useState} from 'react';
import Navbar from './javascript/Navbar/Navbar';
import './App.css';
import PanelController from './javascript/Panel/PanelController/PanelController';
import PanelControllerAI from './javascript/Panel/PanelController/PanelControllerAI';

function App() {
  // used to change to different controllers
  const [currentControllerIndex,setCurrentControllerIndex] = useState(0);
  // sets sessionID to be used across the webapp
  const [sessionID,setSessionID] = useState(null);

  // logic behind changing controller
  const changeController = (event) =>{
    setCurrentControllerIndex(event);
  }

  // function called to change controller
  const getSessionID = (event) =>{
      setSessionID(event);
  }
  // array of the controllers with functional props and session id
  const controllers = [<PanelController changeController={changeController} setSessionID={getSessionID}/>,<PanelControllerAI changeController={changeController} sessionID={sessionID}/>]
  return (
      <div className="App">
        <Navbar/>
        {controllers[currentControllerIndex]}
      </div>
  );
}

export default App;
