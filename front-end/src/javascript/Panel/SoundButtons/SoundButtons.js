import React,{ useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SoundButtons.css'

function SoundButtons(props) {
    // Props passed down from parent
    const { icon, soundSrc, volume, setA, setI } = props;
    
    // Value and Ref for annoyance of current sound.
    const[currentAnnoyance,setCurrentAnnoyance] = useState(2);

    // Value and Ref for intensity of current sound.
    const[currentIntensityValue,setCurrentIntensityValue] = useState(2);

    // State used to play/pause audio
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Creating new audio object using src prop
    const [audio] = useState(new Audio(soundSrc));
    // Change volume based on volume prop
    audio.volume = volume;

    // Sets the states for both annoyance and intesity
    const [currentMoodIndex,setMoodIndex] = useState(2);
    const currentMood = ["Pleasant","Nice","Ordinary","Irritating","Frustrating"];
 
    const [currentIntensityIndex,setIntensityIndex] = useState(2);
    const currentIntensity = ["Peaceful","Subtle","Noticable","Significant","Severe"];

    // When icon is pressed, it will play/pause the sound
    const playSound = () =>{
        if(!isPlaying) {
            audio.play();
            setIsPlaying(true);
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                setIsPlaying(false);
            }, 5000)
        } 
        else{
            audio.pause();
            setIsPlaying(false);

        }
    };

    // Calls function when ended
    const handleEnded = () =>{
        setIsPlaying(false)
    };

    // sets the text corresponding to annoyance
    const handleAnnoyanceSlider = async (event) =>{
        const newIndexValue = parseInt(event.target.value); 
        setMoodIndex(newIndexValue);
        setCurrentAnnoyance(newIndexValue);
        setA(newIndexValue);
    };

    // sets the text corresponding to intensity
    const handleIntensitySlider = async (event) =>{
        const newIndexValue = parseInt(event.target.value); 
        setIntensityIndex(newIndexValue);
        setCurrentIntensityValue(newIndexValue);
        setI(newIndexValue);
    };

    return (
        <div className='sound-box'>
            <FontAwesomeIcon onClick={playSound} icon={icon}/>
            <audio ref={audio} src={soundSrc} onEnded={handleEnded}/>
            <p>How annoying is this sound?: {currentMood[currentMoodIndex]}</p>
            <input type="range" defaultValue={2} max={4} min={0} step={1} onChange={handleAnnoyanceSlider}/>
            <p>How intense is this sound?: {currentIntensity[currentIntensityIndex]}</p>
            <input type="range" defaultValue={2} max={4} min={0} step={1} onChange={handleIntensitySlider}/>        
        </div>
    );
}

export default SoundButtons;