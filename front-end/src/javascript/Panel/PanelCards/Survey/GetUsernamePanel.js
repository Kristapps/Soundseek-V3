import '../PanelCard.css';
import Tilt from 'react-parallax-tilt'

function GetUsernamePanel(props){
    const maxAngleX = 5;
    const maxAngleY = 5;
    
    return (
        <Tilt className='parallex-effect' perspective={10000} tiltMaxAngleX={maxAngleX} tiltMaxAngleY={maxAngleY}> 
            <div className="panel">
                <h1 className='panel-heading'>Welcome to the Soundseek Software.</h1>
                <p className='panel-text'>This software aims to assist your <span className='special-text-lime'>current and future soundscape environments</span>. If you would like to experiment with the software, enter a <span className='special-text-lime'>username(anonymous):</span></p>
                <input onChange={props.setUsername} type="text" className='panel-username-input' defaultValue={props.sessionUsername}></input>
            </div>
        </Tilt>
     );
}
export default GetUsernamePanel;