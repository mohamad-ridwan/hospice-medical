import React from 'react';
import './Button.scss';

function Button({nameBtn}){
    return(
        <>
        <button className="button-card">
            {nameBtn}
        </button>
        </>
    )
}

export default Button;