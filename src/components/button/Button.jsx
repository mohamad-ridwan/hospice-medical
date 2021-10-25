import React from 'react';
import './Button.scss';

function Button({nameBtn, bdrRadius, padding,icon, displayIcon, mouseOver, mouseLeave, classBtn, color, bgColor,border}){
    return(
        <>
        <button className={`button-card ${classBtn}`} style={{
            borderRadius: bdrRadius,
            padding: padding,
            color: color,
            backgroundColor: bgColor,
            border: border
        }}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        >
            {nameBtn}

            <i className={icon} style={{
                display: displayIcon
            }}></i>
        </button>
        </>
    )
}

export default Button;