import Tilt from 'react-parallax-tilt';
import React, {useState,useEffect} from 'react';
import './ExampleMenu.css';
import '../../PanelCard.css';
import AudioContainer from '../AudioContainer/AudioContainer';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faTreeCity } from '@fortawesome/free-solid-svg-icons';

function ExampleMenu(props) {
    // parent function prop and global sessionID for whole app
    const { changePanel, sessionID } = props;
    
    // setting the current location so the results page knows where to go back to...
    const currentLocation = "Examples_Main";

    // used for the data that is loaded from database to display the audio containers.
    const [data,setData] = useState([]);

    // once component is loaded, fetches the api data.
    useEffect(() => {
        // Fetch the data and update the state
        fetchData();
      }, []);

    // Helper function to fetch the data
    const fetchData = async () => {
        // makes sure that the id is parsed in correctly
        const strSessionID = sessionID.toString();
        const fetchURL = ('/GetExampleAudio?sessionID='+strSessionID);
        
        // fetches data using api endpoint with given session id
        const response = await fetch(fetchURL);
        const fetched_data = await response.json();

        // returns array of vital prop information for the audio container components
        console.log(fetched_data.data);

        /*
        this is usually identical to fetched_data.data so we will try use fetched_data.data instead of audio
        const audioContainerProps = fetched_data.data.map((object) => {
            const audioID = object.AudioID;
            const audioURL = object.AudioURL;
            const isExamined = object.isExamined;
          
            return {
              audioID,
              audioURL,
              isExamined
            };
          });*/
        //console.log(audioContainerProps)
        setData(fetched_data.data);
    };

    // logic for changing to different panel
    const handleClick = (page) =>{
        changePanel(page);
    }
    
    return (
        <Tilt className='parallex-panel' tiltEnable={false}> 
            <div className="example-menu-panel">
                <div className='example-menu-header'>
                    <p>List of Examples</p>
                </div>
                <div className='example-content'>
                { /* uses data.map to use as a foreach for every element (set of props) to build the audio container */ }
                    {data.map((exampleAudio) => (
                        <AudioContainer changePanel={changePanel} sessionID={sessionID} audioID={exampleAudio.AudioID} audioURL={exampleAudio.AudioURL} isExamined={exampleAudio.isExamined} origin={currentLocation}/>
                    ))}
                </div>
                {/* used to navigate back to menu */}
                <div className='navigation'>
                    <FontAwesomeIcon icon={faCircleLeft}  onClick={() => handleClick("Menu_Main")}/>
                    <p>Test Session ID: {sessionID}</p>
                </div>
            </div>
        </Tilt>
     );
}

export default ExampleMenu;