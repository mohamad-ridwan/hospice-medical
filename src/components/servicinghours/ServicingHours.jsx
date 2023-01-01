import React, { useState, useEffect } from 'react';
import addMonths from 'addmonths'
import { range } from 'lodash'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import './ServicingHours.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';

function ServicingHours({ widthWrapp, positionWrapp, paddingWrapp, topBook, bottomBook, marginWrapp }) {
    const [servicing, setServicing] = useState({})
    const [dataDiseaseType, setDataDiseaseType] = useState([])
    const [selectJenis, setSelectJenis] = useState('Disease Type')
    const [starDateOfBirth, setStarDateOfBirth] = useState(new Date())
    const [starAppointmentDate, setStarAppointmentDate] = useState(new Date())
    const [minAppointmentDate, setMinAppointmentDate] = useState(new Date())
    const [maxAppointmentDate, setMaxAppointmentDate] = useState(new Date())
    const [onDiseaseType, setOnDiseaseType] = useState(false)
    const [topDiseaseType, setTopDiseaseType] = useState(0)
    const [errorMessage, setErrorMessage] = useState({})
    const [_idFormAppointment, set_IdFormBookAppointment] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [idxSelect, setIdxSelect] = useState(null)
    const [formUserAppointment, setFormUserAppointment] = useState({
        patientName: '',
        phone: '',
        emailAddress: '',
        message: ''
    })

    function getDataServicing() {
        API.APIGetServicingHours()
            .then(res => {
                const respons = res.data

                const getServicing = respons.length > 0 ? respons.filter((e) => e.id === "servicing-hours") : []
                const getFormBookAnAppointment = respons.length > 0 ? respons.filter((e) => e.id === "book-an-appointment") : []
                setServicing(getServicing[0])
                setStarAppointmentDate(new Date(getServicing[0].minDate))
                setMinAppointmentDate(getServicing[0].minDate)
                setMaxAppointmentDate(getServicing[0].maxDate)
                setDataDiseaseType(getFormBookAnAppointment.length > 0 ? getFormBookAnAppointment[0].diseaseType : [])
                set_IdFormBookAppointment(getFormBookAnAppointment.length > 0 ? getFormBookAnAppointment[0]._id : '')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getDataServicing()
    }, [])

    const yearsCalendar = range(1900, getYear(new Date()) + 1, 1)
    const monthsCalendar = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const diseaseType = document.getElementsByClassName("name-disease-type")

    function mouseOver(idx) {
        if (diseaseType.length > 0) {
            for (let i = 0; i < diseaseType.length; i++) {
                diseaseType[i].style.color = '#777'
            }

            diseaseType[0].style.color = '#3face4'
            diseaseType[idx].style.color = '#3face4'

            if (idxSelect !== null) {
                diseaseType[idxSelect].style.color = '#3face4'
            }
        }
    }

    function mouseLeave() {
        for (let i = 0; i < diseaseType.length; i++) {
            diseaseType[i].style.color = '#777'
        }

        diseaseType[0].style.color = '#3face4'

        if (idxSelect !== null) {
            diseaseType[idxSelect].style.color = '#3face4'
        }
    }

    function selectType(jenis, idx) {
        for (let i = 0; i < diseaseType.length; i++) {
            diseaseType[i].style.color = '#777'
        }
        diseaseType[0].style.color = '#3face4'
        diseaseType[idx].style.color = '#3face4'

        setIdxSelect(idx)
        setSelectJenis(jenis)
        setOnDiseaseType(!onDiseaseType)
    }

    function showDiseaseType(show, idxBtn) {
        if (show === 'dateOfBirth') {
            setOnDiseaseType(false)
        } else if (show === "diseaseType") {
            setOnDiseaseType(!onDiseaseType)
        } else if (show === "appointmentDate") {
            setOnDiseaseType(false)
        }

        const parent = document.getElementsByClassName('book-an-appointment')[0].getBoundingClientRect()

        if (idxBtn !== undefined) {
            const positionBotton = document.getElementsByClassName('btn-input-card')[idxBtn].getBoundingClientRect()
            const roundUp = Math.floor(positionBotton.top - parent.top + 35)
            setTopDiseaseType(`${roundUp}px`)
        }
    }

    function changeInput(e) {
        setFormUserAppointment({
            ...formUserAppointment,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errorMessage).length > 0) {
            setErrorMessage({
                ...errorMessage,
                [e.target.name]: ''
            })
        }
    }

    function changeCalendar(date, nameInput) {
        if (nameInput === "dateOfBirth") {
            setStarDateOfBirth(date)
            if(errorMessage && errorMessage.dateOfBirth){
                setErrorMessage({
                    ...errorMessage,
                    dateOfBirth : ''
                })
            }
        } else if (nameInput === "appointmentDate") {
            setStarAppointmentDate(date)
        }
    }

    function postUserAppointment(data) {
        setLoadingSubmit(true)

        API.APIPostFormAppointment(_idFormAppointment, data)
            .then(res => {
                API.APIGetServicingHours()
                    .then(res => {
                        const respons = res.data

                        const getServicing = respons.length > 0 ? respons.filter((e) => e.id === "servicing-hours") : []
                        setStarAppointmentDate(new Date(getServicing[0].minDate))
                        setMinAppointmentDate(getServicing[0].minDate)
                        setMaxAppointmentDate(getServicing[0].maxDate)
                        setStarDateOfBirth(new Date())

                        alert('berhasil menjadwalkan pertemuan')
                        setFormUserAppointment({
                            patientName: '',
                            phone: '',
                            emailAddress: '',
                            message: ''
                        })
                        setErrorMessage({})
                        setSelectJenis('Disease Type')

                        for (let i = 0; i < diseaseType.length; i++) {
                            diseaseType[i].style.color = '#777'
                        }

                        diseaseType[0].style.color = '#3face4'

                        setLoadingSubmit(false)
                    })
                    .catch(err => {
                        alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                        window.location.reload()
                        console.log(err)
                    })
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function submitForm() {
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        setOnDiseaseType(false)

        const valueOfBirth = document.getElementById('date-of-birth').value
        const valueOfAppointmentDate = document.getElementById('appointment-date').value
        const getNowYear = new Date().getFullYear().toString()

        const data = {
            patientName: formUserAppointment.patientName,
            phone: formUserAppointment.phone,
            emailAddress: formUserAppointment.emailAddress,
            dateOfBirth: valueOfBirth,
            jenisPenyakit: selectJenis,
            appointmentDate: valueOfAppointmentDate,
            message: formUserAppointment.message
        }

        let err = {}

        if (!formUserAppointment.patientName) {
            err.patientName = 'Must be required!'
        }
        if (!formUserAppointment.phone) {
            err.phone = 'Must be required!'
        }
        if (!formUserAppointment.emailAddress) {
            err.emailAddress = 'Must be required!'
        } else if (!formUserAppointment.emailAddress.match(regexEmail)) {
            err.emailAddress = 'Invalid email address!'
        }
        if(valueOfBirth.split('/')[2] === getNowYear){
            err.dateOfBirth = 'Must be required!'
        }
        if (!formUserAppointment.message) {
            err.message = 'Must be required!'
        } else if (formUserAppointment.message.length < 6) {
            err.message = 'Minimum 6 letters!'
        }

        if (Object.keys(err).length === 0 && loadingSubmit === false) {
            if (window.confirm('Ingin Mendaftarkan Pertemuan?')) {
                postUserAppointment(data)
            }
        }

        setErrorMessage(err)
    }

    return (
        <>
            <div className="wrapp-card-book-an-appointment" style={{
                width: widthWrapp,
                position: positionWrapp,
                padding: paddingWrapp,
                margin: marginWrapp
            }}>
                <div className="container-book-an-appointment">
                    <div className="servicing-hours">
                        {Object.keys(servicing).length > 0 ? (
                            <>
                                <p className="title-servicing">
                                    {servicing.title}
                                </p>
                                <p className="paragraph-servicing">
                                    {servicing.deskripsi}
                                </p>

                                <div className="column-date-servicing">
                                    {servicing.data.length > 0 ? servicing.data.map((e, i) => {
                                        return (
                                            <div key={i} className="date-servicing">
                                                <p className="name-day">
                                                    {e.day}
                                                </p>

                                                <p className="clock-time">
                                                    {e.time}
                                                </p>
                                            </div>
                                        )
                                    }) : (
                                        <div></div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="book-an-appointment" style={{
                        top: topBook,
                        bottom: bottomBook
                    }}>
                        <p className="title-book-an-appointment">
                            Book an Appointment
                        </p>

                        <form onSubmit={(e) => {
                            e.preventDefault()
                        }} className="form-book-an-appointment">
                            <Input
                                type="text"
                                placeholder="Patient Name"
                                nameInput="patientName"
                                displayErrorMsg="flex"
                                errorMessage={errorMessage && errorMessage.patientName}
                                marginBottomError={errorMessage && errorMessage.patientName ? '5px' : '0'}
                                valueInput={formUserAppointment.patientName}
                                changeInput={changeInput}
                            />
                            <Input
                                type="tel"
                                placeholder="Phone"
                                nameInput="phone"
                                displayErrorMsg="flex"
                                errorMessage={errorMessage && errorMessage.phone}
                                marginBottomError={errorMessage && errorMessage.phone ? '5px' : '0'}
                                valueInput={formUserAppointment.phone}
                                changeInput={changeInput}
                            />
                            <Input
                                type="email"
                                placeholder="Email Address"
                                nameInput="emailAddress"
                                displayErrorMsg="flex"
                                errorMessage={errorMessage && errorMessage.emailAddress}
                                marginBottomError={errorMessage && errorMessage.emailAddress ? '5px' : '0'}
                                valueInput={formUserAppointment.emailAddress}
                                changeInput={changeInput}
                            />
                            <Input
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div
                                        style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} style={{
                                            width: '30px',
                                        }}>
                                            {"<"}
                                        </button>
                                        <select
                                            value={getYear(date)}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                            {yearsCalendar.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={monthsCalendar[getMonth(date)]}
                                            onChange={({ target: { value } }) =>
                                                changeMonth(monthsCalendar.indexOf(value))
                                            }
                                        >
                                            {monthsCalendar.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} style={{
                                            width: '30px',
                                        }}>
                                            {">"}
                                        </button>
                                    </div>
                                )}
                                displayTxtInput="none"
                                displayErrorMsg="flex"
                                displayWidgets="flex"
                                errorMessage={errorMessage && errorMessage.dateOfBirth}
                                marginBottomError={errorMessage && errorMessage.dateOfBirth ? '5px' : '0'}
                                idInputCalendar="date-of-birth"
                                clickWidgets={() => showDiseaseType('dateOfBirth')}
                                changeCalendar={(date) => changeCalendar(date, 'dateOfBirth')}
                                txtInputCalendar="Date Of Birth"
                                starDate={starDateOfBirth}
                            />
                            <Input
                                displayTxtInput="none"
                                displayBtnInput="flex"
                                displayIconCalendar="none"
                                nameBtn={selectJenis}
                                displayDiseaseType={onDiseaseType ? 'flex' : 'none'}
                                transformIconBtnInput={onDiseaseType ? 'rotate(180deg)' : 'rotate(0)'}
                                dataDiseaseType={dataDiseaseType}
                                mouseOverBtnInput={(i) => mouseOver(i)}
                                mouseLeaveBtnInput={mouseLeave}
                                selectType={(jenis, idx) => selectType(jenis, idx)}
                                clickBtnInput={() => showDiseaseType('diseaseType', 4)}
                                topDiseaseType={topDiseaseType}
                            />
                            <Input
                                displayTxtInput="none"
                                displayWidgets="flex"
                                idInputCalendar="appointment-date"
                                txtInputCalendar="Appointment Date"
                                clickWidgets={() => showDiseaseType('appointmentDate')}
                                changeCalendar={(date) => changeCalendar(date, 'appointmentDate')}
                                minDate={new Date(minAppointmentDate)}
                                maxDate={addMonths(new Date(maxAppointmentDate), 0)}
                                starDate={starAppointmentDate}
                            />
                            <Input
                                displayTxtInput="none"
                                displayTxtArea="flex"
                                placeholderTxtArea="Messege"
                                resizeTxtArea="none"
                                nameTextArea="message"
                                displayErrorMsg="flex"
                                errorMessage={errorMessage && errorMessage.message}
                                marginBottomError={errorMessage && errorMessage.message ? '5px' : '0'}
                                valueInput={formUserAppointment.message}
                                changeTextArea={changeInput}
                            />

                            <div className="column-btn-submit">
                                <Button
                                    nameBtn="CONFIRM BOOKING"
                                    click={submitForm}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <Loading
                    displayLoadingBottom={loadingSubmit ? 'flex' : 'none'}
                    displayBarrier={loadingSubmit ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default ServicingHours;