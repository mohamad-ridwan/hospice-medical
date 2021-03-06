import React from 'react';
import Calendar from 'rc-calendar'
import './Input.scss';

function Input({ type, placeholder, nameBtn, displayTxtInput, displayBtnInput, placeholderTxtArea, displayTxtArea, resizeTxtArea, bgColorInputCard, borderInputCard, colorInputCard, bdrRadiusInputCard, paddingInputCard, widthInputCard, marginInputCard, widthTxtArea, borderTxtArea, displayDiseaseType, topDiseaseType, dataDiseaseType, mouseOverBtnInput, mouseLeaveBtnInput, selectType, clickBtnInput, transformIconBtnInput, changeInput, valueInput, nameInput, changeTextArea, nameTextArea, displayErrorMsg, errorMessage, marginBottomError, marginTxtArea, displayInputfile, nameBtnInputFile, clickInputFile, nameInputFile, valueInputFile, changeFile, idInputFile, displayWidgets, displayIconBtn, topCalendar, changeCalendar, displayIconCalendar, colorIconCalendar }) {
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
                    display: displayIconBtn,
                    transform: transformIconBtnInput
                }}></i>
                <i class="far fa-calendar-alt" style={{
                    display: displayIconCalendar,
                    color: colorIconCalendar
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
                            onMouseOver={() => mouseOverBtnInput(i)}
                            onMouseLeave={mouseLeaveBtnInput}
                            onClick={() => selectType(e.jenis, i)}
                        >
                            {e.jenis}
                        </li>
                    )
                }) : (
                    <div></div>
                )}
            </ul>

            <div className="container-widgets-calendar" style={{
                display: displayWidgets,
                top: topCalendar
            }}>
                <Calendar onChange={changeCalendar}/>
            </div>

            <button className="input-card btn-input-file" style={{
                display: displayInputfile,
                cursor: 'pointer',
                backgroundColor: 'transparent'
            }}
                onClick={clickInputFile}
            >
                {nameBtnInputFile}
                <input name={nameInputFile} type="file" className="input-file" id={idInputFile} value={valueInputFile} onChange={changeFile} />
            </button>

            <textarea name={nameTextArea} id="" cols="30" rows="8" className="input-area-card" placeholder={placeholderTxtArea} style={{
                display: displayTxtArea,
                resize: resizeTxtArea,
                width: widthTxtArea,
                border: borderTxtArea,
                margin: marginTxtArea
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