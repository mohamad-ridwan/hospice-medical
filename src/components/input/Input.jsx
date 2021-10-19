import React from 'react';
import './Input.scss';

function Input({type, placeholder, nameBtn, displayTxtInput, displayBtnInput, placeholderTxtArea, displayTxtArea}){
    return(
        <>
            <input type={type} className="input-card" placeholder={placeholder} style={{
                display: displayTxtInput
            }}/>

            <button className="btn-input-card" style={{
                display: displayBtnInput
            }}>
                {nameBtn}

                <i className="fas fa-angle-down"></i>
            </button>

            <textarea name="" id="" cols="30" rows="6" className="input-area-card" placeholder={placeholderTxtArea} style={{
                display: displayTxtArea
            }}></textarea>
        </>
    )
}

export default Input;