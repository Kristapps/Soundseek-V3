// css imports
import './PanelController.css'
import PannsModelMenu from "../PanelCards/Model/Menu/PannsModelMenu";
import ExampleMenu from '../PanelCards/Model/ExampleMenu/ExampleMenu';
import Results from '../PanelCards/Model/Results/Results';
import React, { useState} from "react"

function PanelControllerAI(props){
    // grabs sessionID defined when survey is completed.
    const {sessionID} = props;
    const [prevPage,setPrevPage] = useState(null)
    const [currentAudioId, setCurrentAudioID] = useState(null)

    // Context setup - not sure if needed
    //const[currentState, setCurrentState] = useState('initial state');

    // Main logic for PanelController - allows the page to change to different pages easily 
    const changePanel = (page,audioID,origin) =>{
        if(page === "Examples_Main"){
            console.log("Examples Button Pressed");
            setCurrentModalIndex(1);
        }

        else if(page === "Recordings_Main"){
            console.log("Record Tab Button Pressed");
        }

        else if(page === "Results" && audioID != null && origin != null){
            console.log("Results Button Pressed");
            setPrevPage(origin);
            setCurrentAudioID(audioID);
            setCurrentModalIndex(2);

        }
        else if(page === "Menu_Main"){
            setCurrentModalIndex(0);
        }
        else{
            console.log("Error in displaying current page")
        }
    }
    // index used to change to different pages
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    
    // array of modals that are going to navigated to depending on the index
    const AIModals = [<PannsModelMenu changePanel={changePanel}/>,<ExampleMenu changePanel={changePanel} sessionID={sessionID}/>,<Results changePanel={changePanel} origin={prevPage} sessionID={sessionID} audioID={currentAudioId}/>];

    return (
        <div className="main-panel-container">
            {AIModals[currentModalIndex]}
        </div>
     );
}

export default PanelControllerAI;