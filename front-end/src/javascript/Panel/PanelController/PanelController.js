//This will be the parent of the panel card and the buttons that are used to navigate through different panels
// we will need to make imports of both PanelCard and Navbuttons

// js imports
import React, {useEffect, useState} from "react"
import Navbuttons from '../Navbuttons/Navbuttons';
import GetUsernamePanel from '../PanelCards/Survey/GetUsernamePanel';
import Q1SurveyPanel from '../PanelCards/Survey/Q1SurveyPanel'
import Q2SurveyPanel from "../PanelCards/Survey/Q2SurveyPanel";
import Q3SurveyPanel from "../PanelCards/Survey/Q3SurveyPanel";

// css imports
import './PanelController.css'

function PanelController(props){
    const {setSessionID} = props;
    //using useState to get the username from sessionStorage. If null, then return empty string, else get name from session.
    const [sessionUsername, setSessionUsername] = useState(sessionStorage.getItem('username')=== 'null' ? "":sessionStorage.getItem('username'));

    // array of answers for annoyance
    const [Q1AnnoyanceData, setQ1AnnoyanceData] = useState([2,2,2,2]);
    const [Q2AnnoyanceData, setQ2AnnoyanceData] = useState([2,2,2,2]);
    const [Q3AnnoyanceData, setQ3AnnoyanceData] = useState([2,2,2,2]);

    // array of answers of intensities
    const [Q1IntensityData, setQ1IntensityData] = useState([2,2,2,2]);
    const [Q2IntensityData, setQ2IntensityData] = useState([2,2,2,2]);
    const [Q3IntensityData, setQ3IntensityData] = useState([2,2,2,2]);

    // this will keep track of the annoyance levels for each sound as well as the intensity levels.
    const [annoyanceList, setAnnoyanceList] = useState([Q1AnnoyanceData,Q2AnnoyanceData,Q3AnnoyanceData]);
    const [intensityList, setIntensityList] = useState([Q1IntensityData,Q2IntensityData,Q3IntensityData]);

    const [isNavButtonsActive ,setIsNavButtonsActive] = useState("active");

    // update questionaire answers as any of the slider values change.
    useEffect(() => {
        setAnnoyanceList(prevList => {
            const updatedList = [...prevList];
            updatedList[0] = Q1AnnoyanceData;
            return updatedList;
        });
        setIntensityList(prevList => {
            const updatedList = [...prevList];
            updatedList[0] = Q1IntensityData;
            return updatedList;
        });
    }, [Q1AnnoyanceData, Q1IntensityData]);


    // update Q2 answers on annoyanceList as answers change.
    useEffect(() => {
        setAnnoyanceList(prevList => {
            const updatedList = [...prevList];
            updatedList[1] = Q2AnnoyanceData;
            return updatedList;
        });
        setIntensityList(prevList => {
            const updatedList = [...prevList];
            updatedList[1] = Q2IntensityData;
            return updatedList;
        });
    }, [Q2AnnoyanceData, Q2IntensityData]);
    
    // update Q3 answers on annoyanceList as answers change.
    useEffect(() => {
        setAnnoyanceList(prevList => {
            const updatedList = [...prevList];
            updatedList[2] = Q3AnnoyanceData;
            return updatedList;
        });
        setIntensityList(prevList => {
            const updatedList = [...prevList];
            updatedList[2] = Q3IntensityData;
            return updatedList;
        });
    }, [Q3AnnoyanceData, Q3IntensityData]);

    // Called from the Navbuttons component to move to next panel
    const nextModal = () =>{
        // sets username in storage - this is to remember when a user goes on the current page.
        if(currentModalIndex<maxModalIndex+1){
            if(currentModalIndex===0){
                // used to set local storage.
                sessionStorage.setItem('username',sessionUsername)
            }
            // logic for submitting questionaire data and switching to new page.
            else if(currentModalIndex===3){
                setIsNavButtonsActive("inactive")
                // need to do some sql injection prevention
                if(sessionUsername === ""){
                    setSessionUsername("anon");
                }
                
                // construct json
                const data = {
                surveyID: new Date().getTime(),
                username: sessionUsername,
                annoyanceValues: annoyanceList,
                intensityValues: intensityList
                };
                
                // parent prop function used to share to root level so PanelControllerAI has access to sessionID
                setSessionID(data.surveyID);
                
                
                //upload to database and change controller to PanelControllerAI
                fetch('http://127.0.0.1:5000/SaveSurveyData',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then( data => {
                    // as confirmation is recieved, change controller
                    console.log(data);
                    props.changeController(1);
                })
                .catch(error => {
                    console.error(error);
                });
                
            }
            
            setModalIndex(currentModalIndex+1) // only used between username - Q3
        }
    }

    // Called from the Navbuttons component to move to previous panel
    const prevModal = () =>{
        if (currentModalIndex>0){
            setModalIndex(currentModalIndex-1)
        }
    }

    // Called when the user types something in the username section
    const setUsername = (event) =>{
        setSessionUsername(event.target.value);
    }

    // Models are defined here after the functions and variables to be able to handle props.
    const modals = [
    <GetUsernamePanel setUsername={setUsername} sessionUsername={sessionUsername}/>,        
    <Q1SurveyPanel setAnnoyanceData={setQ1AnnoyanceData} setIntensityData={setQ1IntensityData}/>,        
    <Q2SurveyPanel setAnnoyanceData={setQ2AnnoyanceData} setIntensityData={setQ2IntensityData}/>,
    <Q3SurveyPanel setAnnoyanceData={setQ3AnnoyanceData} setIntensityData={setQ3IntensityData}/>
    ];
    const [currentModalIndex,setModalIndex] = useState(0)
    const maxModalIndex = modals.length-1;
    // Defines the DOM elements for which panel we are on and adds buttons to navigate.
    return (
        <div className="main-panel-container">
            {modals[currentModalIndex]}
            <div className={isNavButtonsActive}> 
            <Navbuttons nextModal={nextModal} prevModal={prevModal} currentModalIndex={currentModalIndex} maxModalIndex={maxModalIndex}/>
            </div>
        </div>
     );
}

export default PanelController;