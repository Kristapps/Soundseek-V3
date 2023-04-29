import '../PanelCard.css';
import { faPhone, faDove, faKeyboard, faAmbulance } from '@fortawesome/free-solid-svg-icons';

import Tilt from 'react-parallax-tilt'
import SoundButtons from '../../SoundButtons/SoundButtons';
import { useEffect, useState } from 'react';

function Q2SurveyPanel(props){
    // function props sent from PanelController.js to collect the annoyance/intensity data for this particular question
    const {setAnnoyanceData, setIntensityData} = props;
    
    //individual values for the survey questions.
    const [a1,setA1] = useState(2);
    const [i1,setI1] = useState(2);

    const [a2,setA2] = useState(2);
    const [i2,setI2] = useState(2);

    const [a3,setA3] = useState(2);
    const [i3,setI3] = useState(2);

    const [a4,setA4] = useState(2);
    const [i4,setI4] = useState(2);

    // when any of the values change on the slider, use parent function prop to set the data.
    useEffect(() => {
        setAnnoyanceData([a1,a2,a3,a4]);
    },[a1,a2,a3,a4])

    // same goes for intensity
    useEffect(() => {
        setIntensityData([i1,i2,i3,i4]);
    },[i1,i2,i3,i4])

    // tilt angles
    const maxAngleX = 5 ;
    const maxAngleY = 5;

    // icons for questions
    const icon1 = faPhone;
    const icon2 = faDove;
    const icon3 = faKeyboard;
    const icon4 = faAmbulance;

    // sounds for particular question
    const sound1 = '/audio/Q2/cordless-phone-ring.wav';
    const sound2 = '/audio/Q2/bird-whistling-single-robin.wav';
    const sound3 = '/audio/Q2/mechanical-keyboard-typing.wav';
    const sound4 = '/audio/Q2/uk-ambulance-siren-pass-by.wav';

    // volume per question
    const vol1 = 0.5;
    const vol2 = 0.5;
    const vol3 = 0.5;
    const vol4 = 0.5;

    return (
        <Tilt className='parallex-effect' perspective={5000} tiltMaxAngleX={maxAngleX} tiltMaxAngleY={maxAngleY}> 
            <div className="panel">
                <h1 className='panel-heading'>Listen to some sounds</h1>
                <p className='panel-text'>In this survey, you will be asked to <span className='special-text-lime'>listen to three different sounds</span> and provide feedback on how each sound makes you feel in terms of <span className='special-text-lime'>productivity</span> and <span className='special-text-lime'>mood</span>. We are interested in hearing about your <span className='special-text-lime'>personal experiences</span> with these sounds and how they fit into your <span className='special-text-lime'>local environment</span>. Your responses will be anonymous and used for research purposes only.</p>
                <div className="sound-box-container">
                    <SoundButtons icon={icon1} soundSrc={sound1} volume={vol1} setA={setA1} setI={setI1}/>
                    <SoundButtons icon={icon2} soundSrc={sound2} volume={vol2} setA={setA2} setI={setI2}/>
                    <SoundButtons icon={icon3} soundSrc={sound3} volume={vol3} setA={setA3} setI={setI3}/>
                    <SoundButtons icon={icon4} soundSrc={sound4} volume={vol4} setA={setA4} setI={setI4}/>
                </div>
            </div>
        </Tilt>
     );
}
export default Q2SurveyPanel;