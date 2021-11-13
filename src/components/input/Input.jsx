import React from 'react';
import './Input.scss';

function Input({ type, placeholder, nameBtn, displayTxtInput, displayBtnInput, placeholderTxtArea, displayTxtArea, resizeTxtArea, bgColorInputCard, borderInputCard, colorInputCard, bdrRadiusInputCard, paddingInputCard, widthInputCard, marginInputCard, widthTxtArea, borderTxtArea, displayDiseaseType, topDiseaseType, dataDiseaseType, mouseOverBtnInput, mouseLeaveBtnInput, selectType, clickBtnInput, transformIconBtnInput, changeInput, valueInput, nameInput, changeTextArea, nameTextArea, displayErrorMsg, errorMessage, marginBottomError }) {
    return (
        <>
            <input type={type} className="input-card" placeholder={placeholder} name={nameInput} value={valueInput} style={{
                display: displayTxtInput,
                backgroundColor: bgColorInputCard,
                border: borderInputCard,
                color: colorInputCard,
                borderRadius: bdrRadiusInputCard,
                padding: paddingInputCard,
                width: widthInputCard,
                margin: marginInputCard
            }} 
            onChange={changeInput}
            />

            <button className="btn-input-card" style={{
                display: displayBtnInput
            }}
            onClick={clickBtnInput}
            >
                {nameBtn}

                <i className="fas fa-angle-down" style={{
                    transform: transformIconBtnInput
                }}></i>
            </button>

            <ul className="menu-list-disease-type" style={{
                display: displayDiseaseType,
                top: topDiseaseType
            }}
            >
                {dataDiseaseType && dataDiseaseType.length > 0 ? dataDiseaseType.map((e, i) => {
                    return (
                        <li key={i} className="name-disease-type" style={{
                            color: e.jenis.includes('Disease Type') ? '#3face4' : "#777"
                        }}
                        onMouseOver={()=>mouseOverBtnInput(i)}
                        onMouseLeave={mouseLeaveBtnInput}
                        onClick={()=>selectType(e.jenis, i)}
                        >
                            {e.jenis}
                        </li>
                    )
                }) : (
                    <div></div>
                )}
            </ul>

            <textarea name={nameTextArea} id="" cols="30" rows="8" className="input-area-card" placeholder={placeholderTxtArea} style={{
                display: displayTxtArea,
                resize: resizeTxtArea,
                width: widthTxtArea,
                border: borderTxtArea
            }}
            onChange={changeTextArea}
            ></textarea>

            <p className="error-message" style={{
                display: displayErrorMsg,
                marginBottom: marginBottomError
            }}>
                {errorMessage}
            </p>
        </>
    )
}

export default Input;