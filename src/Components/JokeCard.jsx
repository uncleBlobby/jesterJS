import React from "react";

import '../App.css';

const JokeCard = ({ title, category, joke, dateAdded }) => {
    return (
        <div className="joke-card">
        <h3>{title}</h3>
        <p>{joke}</p>
        <p>Category: {category}<br></br> Date Added: {dateAdded}</p>
        </div>
    );
}

export default JokeCard;