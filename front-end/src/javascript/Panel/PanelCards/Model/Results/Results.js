import Tilt from 'react-parallax-tilt';
import './Results.css';
import '../../PanelCard.css';
import BarChart from './BarChart/BarChart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

function Results(props) {
    const { changePanel , sessionID , audioID, origin} = props;

    // handles navigation logic by using a prop function passed from PanelControllerAI
    const handleClick = (page) =>{
        changePanel(page);
    }
    
    // No logic/content set yet...
    // most likely will use useEffect to load the relavent data on the page...
    
    return (
        <Tilt className='parallex-panel' tiltEnable={false}> 
            <div className="results-panel">
                <div className='results-header'>
                    <p>Results</p>
                </div>
                <div className='results-content'>
                    <h1 id="results-title">Some things we've noticed...</h1>
                    <p>Audio ID: {audioID}</p>
                    <BarChart audioID={audioID} sessionID={sessionID}/>
                    <div className="classification-data-v-time">

                    </div>
                </div>
                <div className='navigation'>
                    <FontAwesomeIcon icon={faCircleLeft}  onClick={() => handleClick(origin)}/>
                    <p>Test Session ID: {sessionID}</p>
                </div>
            </div>
        </Tilt>
     );
}

export default Results;