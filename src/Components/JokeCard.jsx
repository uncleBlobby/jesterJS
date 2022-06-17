import React from "react";

import '../App.css';

const JokeCard = ({ title, joke }) => {
    return (
        <div className="joke-card">
        <h3>{title}</h3>
        <p>{joke}</p>
        </div>
    );
}

export default JokeCard;