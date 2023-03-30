import React from 'react';
import './Button.scss';

function Button({nameBtn, bdrRadius, padding,icon, displayIcon, mouseOver, mouseLeave, color, bgColor,border, click, cursor, margin, displayLoading}){
    return(
        <>
        <button className="button-card" style={{
            borderRadius: bdrRadius,
            padding: padding,
            color: color,
            backgroundColor: bgColor,
            border: border,
            cursor: cursor,
            margin: margin
        }}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        onClick={click}
        >
            {nameBtn}

            <i className={icon} style={{
                display: displayIcon
            }}></i>
            <div className="loading-btn" style={{
                display: displayLoading
            }}>
                <div className="loading-circle">

                </div>
            </div>
        </button>
        </>
    )
}

export default Button;