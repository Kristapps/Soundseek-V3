import logo from '../../images/soundseeklogo2000x2000.png';
import './Navbar.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { faSurprise, faFaceFrown, faSmile, faFaceAngry, faFaceLaugh } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    // Used to change the faces on the navbar
    const[icon, setIcon] = useState(faSmile);
    // Remembers the previous state so not to change the icon to the same one as before
    const [prevIcon, setPrevIcon] = useState(faSmile);

    // Logic behind the changing the face on the navbar
    const handleHover = () =>{
        // List of face icons
        const icons = [faSurprise, faFaceFrown, faSmile, faFaceAngry, faFaceLaugh];
        // Gets a random index for icons list
        let randomIcon = icons[Math.floor(Math.random() * icons.length)];
        // If its the same face as before, re randomise
        while(randomIcon === prevIcon){
            randomIcon = icons[Math.floor(Math.random() * icons.length)];
        }
        // sets icon for display and to remember the previous icon
        setIcon(randomIcon);
        setPrevIcon(randomIcon);
    }

    // no logic yet for the different pages.
        // We could potentially get a navigation bar controller similar to panel controller...
    return ( 
        <nav className="navbar">
            <div class="nav-container">
                <img className='logo' src={logo}/>
                <ul className="nav-links">
                    <FontAwesomeIcon className='home-icon' icon={solid('house')}/>
                    <FontAwesomeIcon className='home-icon' icon={solid('computer')}/>
                    <FontAwesomeIcon className='home-icon' onMouseEnter={handleHover} icon={icon}/>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;