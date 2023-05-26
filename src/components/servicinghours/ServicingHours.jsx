import React, { useState, useEffect } from 'react';
import addMonths from 'addmonths'
import { range } from 'lodash'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDay from 'date-fns/getDay'
import './ServicingHours.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';

function ServicingHours({ widthWrapp, positionWrapp, paddingWrapp, topBook, bottomBook, marginWrapp }) {
    const [servicing, setServicing] = useState({})
    const [dataDiseaseType, setDataDiseaseType] = useState([])
    const [selectJenis, setSelectJenis] = useState('Disease Type')
    const [selectDay, setSelectDay] = useState('Select Day')
    const [starDateOfBirth, setStarDateOfBirth] = useState(new Date())
    const [starAppointmentDate, setStarAppointmentDate] = useState(null)
    const [minAppointmentDate, setMinAppointmentDate] = useState(new Date())
    const [maxAppointmentDate, setMaxAppointmentDate] = useState(new Date())
    const [onDiseaseType, setOnDiseaseType] = useState(false)
    const [onSelectDay, setOnSelectDay] = useState(false)
    const [topDiseaseType, setTopDiseaseType] = useState(0)
    const [errorMessage, setErrorMessage] = useState({})
    const [_idFormAppointment, set_IdFormBookAppointment] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [loadingBtnDisease, setLoadingBtnDisease] = useState(false)
    const [doctorDateOfAppointmentDate, setDoctorDateOfAppointmentDate] = useState(null)
    const [dataDayDoctorSchedule, setDataDayDoctorSchedule] = useState([])
    const [idxSelect, setIdxSelect] = useState(null)
    const [idxSelectDay, setIdxSelectDay] = useState(null)
    const [formUserAppointment, setFormUserAppointment] = useState({
        patientName: '',
        phone: '',
        emailAddress: '',
        message: ''
    })

    const regexSpecialChar = /['"\u0040\u0026\u2122\u00ae]/g

    const dayName = [
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
        'Minggu'
    ]

    function getDataServicing() {
        API.APIGetServicingHours()
            .then(res => {
                const respons = res.data

                const getNumDate = new Date().getDate()

                const getServicing = respons.length > 0 ? respons.filter((e) => e.id === "servicing-hours") : []
                const getFormBookAnAppointment = respons.length > 0 ? respons.filter((e) => e.id === "book-an-appointment") : []
                setServicing(getServicing[0])
                setMinAppointmentDate(`${getServicing[0].minDate}-${getNumDate}`)
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
    const classSelectDay = document.getElementsByClassName("name-select-day")

    const isWeekday = (date) => {
        const day = getDay(date);
        return day === doctorDateOfAppointmentDate
    }

    useEffect(() => {
        const inputAppointMentDate = document.getElementById('appointment-date')
        const inputDateOfBirth = document.getElementById('date-of-birth')
        if (inputAppointMentDate) {
            inputAppointMentDate.readOnly = true
            inputAppointMentDate.style.cursor = 'pointer'
        }
        if (inputDateOfBirth) {
            inputDateOfBirth.readOnly = true
            inputDateOfBirth.style.cursor = 'pointer'
        }
    }, [])

    function mouseOver(idx, name) {
        if (name === 'diseaseType' && diseaseType.length > 0) {
            for (let i = 0; i < diseaseType.length; i++) {
                diseaseType[i].style.color = '#777'
            }

            diseaseType[0].style.color = '#3face4'
            diseaseType[idx].style.color = '#3face4'

            if (idxSelect !== null) {
                diseaseType[idxSelect].style.color = '#3face4'
            }
        } else if (name === 'selectDay' && classSelectDay.length) {
            for (let i = 0; i < classSelectDay.length; i++) {
                classSelectDay[i].style.color = '#777'
            }

            classSelectDay[0].style.color = '#3face4'
            classSelectDay[idx].style.color = '#3face4'

            if (idxSelectDay !== null) {
                classSelectDay[idxSelectDay].style.color = '#3face4'
            }
        }
    }

    function mouseLeave(name) {
        if (name === 'diseaseType') {
            for (let i = 0; i < diseaseType.length; i++) {
                diseaseType[i].style.color = '#777'
            }

            diseaseType[0].style.color = '#3face4'

            if (idxSelect !== null) {
                diseaseType[idxSelect].style.color = '#3face4'
            }
        } else if (name === 'selectDay') {
            for (let i = 0; i < classSelectDay.length; i++) {
                classSelectDay[i].style.color = '#777'
            }

            classSelectDay[0].style.color = '#3face4'

            if (idxSelectDay !== null) {
                classSelectDay[idxSelectDay].style.color = '#3face4'
            }
        }
    }

    function selectType(jenis, idx, typeOfBtn) {
        if (typeOfBtn === 'diseaseType') {
            if (jenis !== 'Disease Type') {
                setLoadingBtnDisease(true)

                API.APIGetDoctors()
                    .then(res => {
                        const result = res?.data[0]?.data
                        if (result?.length > 0) {
                            const findDoctorOfDiseaseType = result.filter(doctor => {
                                const checkDeskripsi = doctor.deskripsi?.toLowerCase()?.replace('spesialis', '')?.replace(/\s/g, '')
                                const checkSpesialis = checkDeskripsi?.replace(regexSpecialChar, '')?.replace(/[-]/g, '')

                                const jenisPenyakit = jenis?.toLowerCase()?.replace(regexSpecialChar, '')?.replace(/[-]/g, '')?.replace(/\s/g, '')

                                return checkSpesialis?.includes(jenisPenyakit)
                            })
                            if (findDoctorOfDiseaseType?.length > 0) {
                                const getDayDoctorSchedule = () => {
                                    let dayOfDoctorSchedule = [
                                        {
                                            jenis: 'Select Day'
                                        }
                                    ]
                                    let count = 0

                                    const days = () => {
                                        dayOfDoctorSchedule = [
                                            {
                                                jenis: 'Select Day'
                                            }
                                        ]
                                        return findDoctorOfDiseaseType.forEach(item => {
                                            count = count + 1

                                            const findDayOn = (chooseDay) => {
                                                const getDay = item?.jadwalDokter?.find(day => day?.toLowerCase() === chooseDay)

                                                if (getDay) {
                                                    const findIndexDay = dayOfDoctorSchedule.findIndex(day => day.jenis === getDay)

                                                    if (findIndexDay === -1) {
                                                        dayOfDoctorSchedule.push({ jenis: getDay })
                                                    }
                                                }
                                            }
                                            findDayOn('senin')
                                            findDayOn('selasa')
                                            findDayOn('rabu')
                                            findDayOn('kamis')
                                            findDayOn('jumat')
                                            findDayOn('sabtu')
                                            findDayOn('minggu')
                                        })
                                    }

                                    days()

                                    setTimeout(() => {
                                        if (count === findDoctorOfDiseaseType?.length) {
                                            setDataDayDoctorSchedule(dayOfDoctorSchedule)

                                            for (let i = 0; i < diseaseType.length; i++) {
                                                diseaseType[i].style.color = '#777'
                                            }
                                            diseaseType[0].style.color = '#3face4'
                                            diseaseType[idx].style.color = '#3face4'

                                            setSelectJenis(jenis)
                                            setIdxSelect(idx)
                                            setOnDiseaseType(false)
                                            setSelectDay('Select Day')
                                            setIdxSelectDay(null)
                                            setErrorMessage({
                                                ...errorMessage,
                                                diseaseType: ''
                                            })
                                            setStarAppointmentDate(null)

                                            setTimeout(() => {
                                                setLoadingBtnDisease(false)
                                            }, 0)
                                        }
                                    }, 0)
                                }

                                getDayDoctorSchedule()
                            }
                        } else {
                            alert('Oops, tidak ada dokter yang tersedia!')
                            console.log(result)
                        }
                    })
                    .catch(err => {
                        alert('Telah terjadi kesalahan server!\nMohon coba beberapa saat lagi')
                        console.log(err)
                        setLoadingBtnDisease(false)
                    })
            } else {
                setDataDayDoctorSchedule([])

                for (let i = 0; i < diseaseType.length; i++) {
                    diseaseType[i].style.color = '#777'
                }
                diseaseType[0].style.color = '#3face4'

                setSelectJenis(jenis)
                setIdxSelect(0)
                setOnDiseaseType(false)
                setSelectDay('Select Day')
                setIdxSelectDay(null)
                setStarAppointmentDate(null)
            }
        } else if (typeOfBtn === 'selectDay') {
            for (let i = 0; i < classSelectDay.length; i++) {
                classSelectDay[i].style.color = '#777'
            }
            classSelectDay[0].style.color = '#3face4'
            classSelectDay[idx].style.color = '#3face4'

            setIdxSelectDay(idx)
            getDoctorsSchedule(jenis)
            setStarAppointmentDate(null)
        }
    }

    function getDoctorsSchedule(jenis) {
        if (jenis) {
            const findIdxChooseDay = dayName.findIndex(day => day.toLowerCase() === jenis?.toLowerCase()) + 1
            const checkIdx = findIdxChooseDay === 7 ? 0 : findIdxChooseDay

            setDoctorDateOfAppointmentDate(checkIdx)
            setSelectDay(jenis)
            setOnSelectDay(!onSelectDay)
            setErrorMessage({
                ...errorMessage,
                selectDay: ''
            })
        }
    }

    function showDiseaseType(show, idxBtn) {
        if (show === 'dateOfBirth') {
            setOnDiseaseType(false)
            setOnSelectDay(false)
        } else if (show === "diseaseType") {
            setOnSelectDay(false)
            setOnDiseaseType(!onDiseaseType)
        } else if (show === 'selectDay') {
            setOnDiseaseType(false)
            setOnSelectDay(!onSelectDay)
        } else if (show === "appointmentDate") {
            setOnDiseaseType(false)
            setOnSelectDay(false)
        }

        const parent = document.getElementsByClassName('book-an-appointment')[0].getBoundingClientRect()

        if (idxBtn !== undefined) {
            const positionBotton = document.getElementsByClassName('btn-input-card')[idxBtn].getBoundingClientRect()
            const roundUp = Math.floor(positionBotton.top - parent.top + 35)
            setTopDiseaseType(`${roundUp}px`)
        }

        if (diseaseType?.length > 0) {
            diseaseType[0].style.color = '#3face4'

            if (idxSelect) {
                diseaseType[idxSelect].style.color = '#3face4'
            }
        }
        if (classSelectDay?.length > 0) {
            classSelectDay[0].style.color = '#3face4'

            if (idxSelectDay) {
                classSelectDay[idxSelectDay].style.color = '#3face4'
            }
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
            setErrorMessage({
                ...errorMessage,
                dateOfBirth: ''
            })
        } else if (nameInput === "appointmentDate") {
            setStarAppointmentDate(date)
            setErrorMessage({
                ...errorMessage,
                appointmentDate: ''
            })
        }
    }

    function postUserAppointment(data) {
        setLoadingSubmit(true)

        API.APIPostFormAppointment(_idFormAppointment, data)
            .then(res => {
                API.APIGetServicingHours()
                    .then(res => {
                        const respons = res.data

                        const getNumDate = new Date().getDate()

                        const getServicing = respons.length > 0 ? respons.filter((e) => e.id === "servicing-hours") : []
                        setStarAppointmentDate(new Date())
                        setMinAppointmentDate(`${getServicing[0].minDate}-${getNumDate}`)
                        setMaxAppointmentDate(getServicing[0].maxDate)
                        setStarDateOfBirth(new Date())

                        alert('Pendaftaran berhasil\nKami akan konfirmasikan melalui email Anda!')
                        setFormUserAppointment({
                            patientName: '',
                            phone: '',
                            emailAddress: '',
                            message: ''
                        })
                        setErrorMessage({})
                        setSelectJenis('Disease Type')
                        setSelectDay('Select Day')
                        setIdxSelect(null)
                        setIdxSelectDay(null)

                        if (diseaseType?.length > 0) {
                            for (let i = 0; i < diseaseType?.length; i++) {
                                diseaseType[i].style.color = '#777'
                            }

                            diseaseType[0].style.color = '#3face4'
                        }

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
        setOnSelectDay(false)

        const valueOfBirth = document.getElementById('date-of-birth').value
        const valueOfAppointmentDate = document.getElementById('appointment-date').value
        const getNowYear = new Date().getFullYear().toString()

        const month = new Date().getMonth() + 1
        const newMonth = month.toString().length === 1 ? `0${month}` : month
        const date = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate()
        const submissionDate = `${newMonth}/${date}/${getNowYear}`

        const hours = new Date().getHours().toString().length === 1 ? `0${new Date().getHours()}` : new Date().getHours()
        const minutes = new Date().getMinutes().toString().length === 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
        const clock = `${hours}:${minutes}`

        const data = {
            patientName: formUserAppointment.patientName,
            phone: formUserAppointment.phone,
            emailAddress: formUserAppointment.emailAddress,
            dateOfBirth: valueOfBirth,
            jenisPenyakit: selectJenis,
            appointmentDate: valueOfAppointmentDate,
            message: formUserAppointment.message,
            submissionDate: submissionDate,
            clock: clock
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
        if (valueOfBirth.split('/')[2] === getNowYear) {
            err.dateOfBirth = 'Must be required!'
        }
        if (!formUserAppointment.message) {
            err.message = 'Must be required!'
        } else if (formUserAppointment.message.length < 6) {
            err.message = 'Minimum 6 letters!'
        }
        if (selectJenis === 'Disease Type') {
            err.diseaseType = 'Must be required!'
        }
        if (selectDay === 'Select Day') {
            err.selectDay = 'Must be required!'
        }
        if (selectDay !== 'Select Day' && starAppointmentDate === null) {
            err.appointmentDate = 'Must be required!'
        }

        if (Object.keys(err).length === 0 && loadingSubmit === false) {
            if (window.confirm('Daftar untuk berobat?')) {
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
                            Patient Registration
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
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}
                                            style={{
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
                                displayErrorMsg="flex"
                                displayIconCalendar="none"
                                styleLoadingBtn={{
                                    display: loadingBtnDisease ? 'flex' : 'none'
                                }}
                                nameBtn={selectJenis}
                                displayDiseaseType={onDiseaseType ? 'flex' : 'none'}
                                transformIconBtnInput={onDiseaseType ? 'rotate(180deg)' : 'rotate(0)'}
                                dataDiseaseType={dataDiseaseType}
                                mouseOverBtnInput={(i) => mouseOver(i, 'diseaseType')}
                                errorMessage={errorMessage?.diseaseType}
                                mouseLeaveBtnInput={() => mouseLeave('diseaseType')}
                                selectType={(jenis, idx) => selectType(jenis, idx, 'diseaseType')}
                                clickBtnInput={() => showDiseaseType('diseaseType', 4)}
                                topDiseaseType={topDiseaseType}
                            />
                            {selectJenis !== 'Disease Type' && (
                                <Input
                                    displayTxtInput="none"
                                    displayBtnInput="flex"
                                    displayErrorMsg="flex"
                                    displayIconCalendar="none"
                                    classNameDiseaseType="name-select-day"
                                    nameBtn={selectDay}
                                    displayDiseaseType={onSelectDay ? 'flex' : 'none'}
                                    transformIconBtnInput={onSelectDay ? 'rotate(180deg)' : 'rotate(0)'}
                                    dataDiseaseType={dataDayDoctorSchedule}
                                    mouseOverBtnInput={(i) => mouseOver(i, 'selectDay')}
                                    errorMessage={errorMessage?.selectDay}
                                    mouseLeaveBtnInput={() => mouseLeave('selectDay')}
                                    selectType={(jenis, idx) => selectType(jenis, idx, 'selectDay')}
                                    clickBtnInput={() => showDiseaseType('selectDay', 5)}
                                    topDiseaseType={topDiseaseType}
                                />
                            )}
                            {selectDay !== 'Select Day' && (
                                <Input
                                    displayTxtInput="none"
                                    displayErrorMsg="flex"
                                    displayWidgets='flex'
                                    idInputCalendar="appointment-date"
                                    txtInputCalendar="Appointment Date"
                                    clickWidgets={() => showDiseaseType('appointmentDate')}
                                    changeCalendar={(date) => changeCalendar(date, 'appointmentDate')}
                                    errorMessage={errorMessage?.appointmentDate}
                                    filterDate={isWeekday}
                                    minDate={new Date(minAppointmentDate)}
                                    maxDate={addMonths(new Date(maxAppointmentDate), 0)}
                                    starDate={starAppointmentDate}
                                />
                            )}
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
                                    nameBtn="CONFIRM REGISTRATION"
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