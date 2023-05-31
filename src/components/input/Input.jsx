import React from 'react';
import DatePicker from 'react-datepicker'
import './Input.scss';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Input({ type, placeholder, nameBtn, displayTxtInput, displayBtnInput, placeholderTxtArea, displayTxtArea, resizeTxtArea, bgColorInputCard, borderInputCard, colorInputCard, bdrRadiusInputCard, paddingInputCard, widthInputCard, marginInputCard, widthTxtArea, borderTxtArea, displayDiseaseType, topDiseaseType, dataDiseaseType, mouseOverBtnInput, mouseLeaveBtnInput, selectType, clickBtnInput, transformIconBtnInput, changeInput, valueInput, nameInput, changeTextArea, nameTextArea, displayErrorMsg, errorMessage, marginBottomError, marginTxtArea, displayInputfile, nameBtnInputFile, clickInputFile, nameInputFile, valueInputFile, changeFile, idInputFile, displayWidgets, displayIconBtn, topCalendar, changeCalendar, displayIconCalendar, colorIconCalendar, acceptFile, starDate, clickWidgets, txtInputCalendar, idInputCalendar, minDate, maxDate, renderCustomHeader, classInputCard, disabledInput, filterDate, styleLoadingBtn, classNameDiseaseType, colsArea, rowsArea }) {
    return (
        <>
            <input type={type} className={`input-card ${classInputCard}`} placeholder={placeholder} name={nameInput} value={valueInput} disabled={disabledInput} style={{
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

                <div className="loading-btn-disease" style={styleLoadingBtn}>
                    <div className="loading-circle"></div>
                </div>

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
                        <li key={i} className={`name-disease-type ${classNameDiseaseType}`} 
                        // style={{
                        //     color: e.jenis.includes('Disease Type') || e.jenis.includes('Select Day') ? '#3face4' : "#777"
                        // }}
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

            <button className="container-widgets-calendar" style={{
                display: displayWidgets,
                top: topCalendar
            }}>
                <p className="txt-input-calendar">
                    {txtInputCalendar}
                </p>
                <DatePicker id={idInputCalendar} placeholderText="Select Date" renderCustomHeader={renderCustomHeader} filterDate={filterDate} selected={starDate} onChange={changeCalendar} minDate={minDate} maxDate={maxDate} onInputClick={clickWidgets}/>
                <i class="far fa-calendar-alt" style={{
                    display: displayIconCalendar,
                    color: colorIconCalendar
                }}></i>
            </button>

            <button className="input-card btn-input-file" style={{
                display: displayInputfile,
                cursor: 'pointer',
                backgroundColor: 'transparent'
            }}
                onClick={clickInputFile}
            >
                {nameBtnInputFile}
                <input name={nameInputFile} accept={acceptFile} type="file" className="input-file" id={idInputFile} value={valueInputFile} onChange={changeFile} />
            </button>

            <textarea name={nameTextArea} value={valueInput} id="" cols={colsArea} rows={rowsArea} className="input-area-card" placeholder={placeholderTxtArea} style={{
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