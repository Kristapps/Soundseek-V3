import '../../PanelCard.css';
import './PannsModelMenu.css'
import Tilt from 'react-parallax-tilt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faCube } from '@fortawesome/free-solid-svg-icons';
import React, {useContext} from 'react';
import ModalContext from '../../../PanelController/ModalContext';

function PannsModelMenu(props){
    // Props
    const { changePanel } = props;

    // Context
    //const {currentState, setMyCurrentState} = useContext(ModalContext);
    
    // Used to handle page change, eg: example menu and recording menu
    const handleClick = (page) =>{
        changePanel(page);
    }

    // Used for the tilt card
    const maxAngleX = 5;
    const maxAngleY = 5;
    
    return (
        <Tilt className='parallex-effect' perspective={10000} tiltMaxAngleX={maxAngleX} tiltMaxAngleY={maxAngleY}> 
            <div className="panel">
                <h1 className='panel-heading'>Panns Inference Model</h1>
                <p className='panel-text'>It's time to experiment with the model! You can use our <span className='special-text-lime'>examples</span> or <span className='special-text-lime'>record</span> your own audio to extract information from your <span className='special-text-lime'>soundscape environment</span>.</p>
                {/* container for the buttons to choose from */}
                <div className="ButtonChoiceContainer">
                    <div className="ButtonChoice">
                        <div className='icon-mask'>
                            <FontAwesomeIcon icon={faCube} className="ExamplesButton" onClick={() => handleClick("Examples_Main")}/>
                        </div>
                        <h2 className='panel-heading'>Examples</h2>
                    </div>
                    <div className="ButtonChoice">
                        <div className='icon-mask'>
                            <FontAwesomeIcon icon={faMicrophone} className="RecordButton" onClick={() => handleClick("Recordings_Main")}/>
                        </div>
                        <h2 className='panel-heading'>Record</h2>
                    </div>
                </div>
            </div>
        </Tilt>
     );
}
export default PannsModelMenu;