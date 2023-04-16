import React from 'react';
import './Button.scss';

function Button({nameBtn, bdrRadius, padding,icon, displayIcon, mouseOver, mouseLeave, color, bgColor,border, click, cursor, margin, displayLoading, flexDirectionBtn, marginIcon, flexWrapBtn}){
    return(
        <>
        <button className="button-card" style={{
            flexDirection: flexDirectionBtn,
            flexWrap: flexWrapBtn,
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
                display: displayIcon,
                margin: marginIcon
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