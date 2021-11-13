import React from 'react';
import './Button.scss';

function Button({nameBtn, bdrRadius, padding,icon, displayIcon, mouseOver, mouseLeave, color, bgColor,border, click}){
    return(
        <>
        <button className="button-card" style={{
            borderRadius: bdrRadius,
            padding: padding,
            color: color,
            backgroundColor: bgColor,
            border: border
        }}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        onClick={click}
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