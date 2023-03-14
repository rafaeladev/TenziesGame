import React from "react";

const Die = (props) => {
    return (
        <div className="die-face">
            <h2 className="die-num">{props.number}</h2>
        </div>
    );
};

export default Die;
