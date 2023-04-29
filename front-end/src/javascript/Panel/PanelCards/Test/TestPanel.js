import './PanelCard.css';
import Tilt from 'react-parallax-tilt'
import React, { useState, useEffect } from 'react'

function TestPanel(props){
    // parallax card props
    const maxAngleX = 5;
    const maxAngleY = 5;

    // POSTing data
    const [username,setUsername] = useState("");

    const handleInputChange = (event) =>{
        setUsername(event.target.value)
        console.log(username);
    }

    const postUsername = () =>{
        const data = {username: username};

        fetch('/SaveUsername',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then( data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    /*
    const postUsername = () =>{
        console.log("button pressed")
    }*/

    return(
        <Tilt className='parallex-effect' perspective={10000} tiltMaxAngleX={maxAngleX} tiltMaxAngleY={maxAngleY}> 
            <div className="panel">
                <h1 className='panel-heading'>Testing Features</h1>
                <p>Lets try posting data:</p>
                <input  onChange={handleInputChange} type="text" className='panel-username-input'></input>
                <button onClick={postUsername}>Send to database</button>
            </div>
        </Tilt>
    )
}
export default TestPanel;

// used to GET data from the Flask backend.
/*
    //fetching and setting data
    const [users,setUser] = useState([{}])

    useEffect(() => {
        fetch("/users").then(
            res => res.json()
        ).then(
            users => {
                setUser(users)
                console.log(users)
            }
        )
    }, [])
    
    return (
        <Tilt className='parallex-effect' perspective={10000} tiltMaxAngleX={maxAngleX} tiltMaxAngleY={maxAngleY}> 
            <div className="panel">
                <h1 className='panel-heading'>Testing Features</h1>
                <p>Listing users:</p>
                {(typeof users.users === 'undefined') ? (
                    <p>Loading...</p>
                ): (
                    users.users.map((user, i) => (
                        <p key={i}>{user}</p>
                    ))
                )}
            </div>
        </Tilt>
     );*/