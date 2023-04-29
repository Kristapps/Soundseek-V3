import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPaperPlane, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";

import './Navbuttons.css';

const Navbuttons = (props) => {
    //conditional to change the css class to inactive or inactive depending on which panel the user is on
    const isOnFirstPage = props.currentModalIndex === 0 ? 'Inactive' : 'Active';
    const isOnLastPage = props.currentModalIndex === props.maxModalIndex ? 'Active' : 'Active';

    // This is to change the icon to a paper plane once on the last set of questions
    const [rightIcon, setRightIcon ]= useState(faArrowRight);
    
    // logic behind setting right icon to paper plane
    useEffect(() => {
        if (props.currentModalIndex === 3){
            setRightIcon(faPaperPlane);
        }
        else{
            setRightIcon(faArrowRight);
        };
    },[rightIcon,props.currentModalIndex])

    // Displays left and right arrow for navigation
    return ( 
        <div className='nav-button-container'>
              <FontAwesomeIcon onClick={props.prevModal} className={isOnFirstPage} icon={solid('arrow-left')}/>
              <FontAwesomeIcon onClick={props.nextModal} className={isOnLastPage} icon={rightIcon}/>
        </div>
     );
}
 
export default Navbuttons;