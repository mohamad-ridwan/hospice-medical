import React from 'react';
import './Input.scss';

function Input({type, placeholder, nameBtn, displayTxtInput, displayBtnInput, placeholderTxtArea, displayTxtArea, resizeTxtArea, bgColorInputCard, borderInputCard, colorInputCard, bdrRadiusInputCard, paddingInputCard, widthInputCard, marginInputCard}){
    return(
        <>
            <input type={type} className="input-card" placeholder={placeholder} style={{
                display: displayTxtInput,
                backgroundColor: bgColorInputCard,
                border: borderInputCard,
                color: colorInputCard,
                borderRadius: bdrRadiusInputCard,
                padding: paddingInputCard,
                width: widthInputCard,
                margin: marginInputCard
            }}/>

            <button className="btn-input-card" style={{
                display: displayBtnInput
            }}>
                {nameBtn}

                <i className="fas fa-angle-down"></i>
            </button>

            <textarea name="" id="" cols="30" rows="8" className="input-area-card" placeholder={placeholderTxtArea} style={{
                display: displayTxtArea,
                resize: resizeTxtArea
            }}></textarea>
        </>
    )
}

export default Input;