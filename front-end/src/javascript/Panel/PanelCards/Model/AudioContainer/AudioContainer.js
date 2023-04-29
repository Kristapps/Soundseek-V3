import './AudioContainer.css'
// audio visualiser
import AudioVisualiser from './AudioVisualiser/AudioVisualiser';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

function TestAudioContainer(props) {
    const {changePanel, sessionID, audioURL,audioID,isExamined, origin} = props;
    
    // Boolean value to control state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isProcessed, setIsProcessed] = useState(isExamined);
    const [isLoading, setIsLoading] = useState(false);

    // Button text depending on if the audio has been examined
    const buttonValue = isProcessed ? 'Results':'Examine Audio';
    // Button states (Examine audio, Loading... and Results)
    const [buttonText, setButtonText] = useState(buttonValue);

    // Audio Player
    const [audioPlayerIcon, setAudioPlayerIcon] = useState(faPlayCircle);
    const audioSrc = audioURL;
    const audioRef = useRef(null);

    const fileName = audioSrc.split('/').pop().replace(/_/g, ' ').replace('.mp3', '');
    const titleCase = fileName.charAt(0).toUpperCase() + fileName.slice(1);

    const handleAudio = () =>{
        if(!isPlaying){
            setIsPlaying(true);
            audioRef.current.play();
        }
        else{
            setIsPlaying(false);
            audioRef.current.pause();
        }
    }

    // used to send the audio to the model to save into audio entry in the database, lets the user see results after.
    const sendAudioToModel = async () =>{
        // makes the button change to 'Loading' when while the fecthing is happening
            //disables the button, should implement so that all buttons are disabled...
        setIsLoading(true);
        setButtonText("Loading...");

        // sets the json submit and also find the audio in database to fill for audio tags and change isExamined to true.
        const data = {
            sessionID: sessionID,
            audioURL: audioSrc,
            audioID: audioID
            };

        // calls process audio api endpoint to do the audio tag processing and so on.
        console.log('Processing Audio...')
        await fetch('/ProccessAudio',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Audio successfully processed...')
            // changes isProcessed to true which would change the button to Results.
            setIsProcessed(true);
            setButtonText("Results");
        })
        .catch(error => {
            // if there are any errors, processing has not been completed...
            console.error(error)
            setIsProcessed(false);
        })
        
        // this means that buttons can be interacted with ahga
        setIsLoading(false);
    }

    // test function to see if called once audio has ended
    const handleAudioEnded = () => {
        // this should fix the issue with the icon changing to a play circle after audio finishes
        setIsPlaying(false);
    }

    // Triggered by the results button on the current audio player - uses changePanel func prop from PanelControllerAI.js
    const sendToResults = () => {
        // Calls the function props in parent and changes to results page given an audio id
        changePanel("Results", 1,origin);
    }

    return ( 
        <div>
            <p className='audio-name'>{titleCase}</p>
            <div className='audio-container'>
                <FontAwesomeIcon className='play-button' onClick={handleAudio} icon={isPlaying ? faPauseCircle : faPlayCircle}/>
                <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnded}/>
                <AudioVisualiser audioRef={audioRef} color="#000000"/>
                <button disabled={isLoading} onClick={isProcessed ? sendToResults : sendAudioToModel}>{buttonText}</button>
            </div>
        </div>
     );
}

export default TestAudioContainer;