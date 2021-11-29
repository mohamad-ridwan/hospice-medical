import React, { useState, useEffect } from 'react';
import './ServicingHours.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';

function ServicingHours({ widthWrapp, positionWrapp, paddingWrapp, topBook, bottomBook, marginWrapp }) {

    const [servicing, setServicing] = useState({})
    const [dataDiseaseType, setDataDiseaseType] = useState([])
    const [selectJenis, setSelectJenis] = useState('Disease Type')
    const [onDiseaseType, setOnDiseaseType] = useState(false)
    const [topDiseaseType, setTopDiseaseType] = useState(0)
    const [errorMessage, setErrorMessage] = useState({})
    const [_idFormAppointment, set_IdFormBookAppointment] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [formUserAppointment, setFormUserAppointment] = useState({
        patientName: '',
        phone: '',
        emailAddress: '',
        dateOfBirth: '',
        appointmentDate: '',
        message: ''
    })

    function getDataServicing() {
        API.APIGetServicingHours()
            .then(res => {
                const respons = res.data

                const getServicing = respons.length > 0 ? respons.filter((e) => e.id === "servicing-hours") : []
                const getFormBookAnAppointment = respons.length > 0 ? respons.filter((e) => e.id === "book-an-appointment") : []
                setServicing(getServicing[0])
                setDataDiseaseType(getFormBookAnAppointment.length > 0 ? getFormBookAnAppointment[0].diseaseType : [])
                set_IdFormBookAppointment(getFormBookAnAppointment.length > 0 ? getFormBookAnAppointment[0]._id : '')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getDataServicing()
    }, [])

    const [idxSelect, setIdxSelect] = useState(null)

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

    function showDiseaseType() {
        setOnDiseaseType(!onDiseaseType)

        const parent = document.getElementsByClassName('book-an-appointment')[0].getBoundingClientRect()
        const positionBotton = document.getElementsByClassName('btn-input-card')[4].getBoundingClientRect()
        const roundUp = Math.floor(positionBotton.top - parent.top + 35)
        setTopDiseaseType(`${roundUp}px`)
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

    function postUserAppointment(data) {
        setLoadingSubmit(true)

        API.APIPostFormAppointment(_idFormAppointment, data)
            .then(res => {
                alert('berhasil menjadwalkan pertemuan')
                setFormUserAppointment({
                    patientName: '',
                    phone: '',
                    emailAddress: '',
                    dateOfBirth: '',
                    appointmentDate: '',
                    message: ''
                })
                setSelectJenis('Disease Type')
                for (let i = 0; i < diseaseType.length; i++) {
                    diseaseType[i].style.color = '#777'
                }
        
                diseaseType[0].style.color = '#3face4'

                setLoadingSubmit(false)
                return res
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function submitForm() {
        const data = {
            patientName: formUserAppointment.patientName,
            phone: formUserAppointment.phone,
            emailAddress: formUserAppointment.emailAddress,
            dateOfBirth: formUserAppointment.dateOfBirth,
            jenisPenyakit: selectJenis,
            appointmentDate: formUserAppointment.appointmentDate,
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
        } else if (!formUserAppointment.emailAddress.includes('@')) {
            err.emailAddress = 'Must be required @!'
        }
        if (!formUserAppointment.dateOfBirth) {
            err.dateOfBirth = 'Must be required!'
        }
        if (!formUserAppointment.appointmentDate) {
            err.appointmentDate = 'Must be required!'
        }
        if (!formUserAppointment.message) {
            err.message = 'Must be required!'
        } else if (formUserAppointment.message.length < 6) {
            err.message = 'Minimum 6 letters!'
        }

        if (Object.keys(err).length === 0) {
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
                                type="text"
                                placeholder="Date of Birth"
                                nameInput="dateOfBirth"
                                displayErrorMsg="flex"
                                errorMessage={errorMessage && errorMessage.dateOfBirth}
                                marginBottomError={errorMessage && errorMessage.dateOfBirth ? '5px' : '0'}
                                valueInput={formUserAppointment.dateOfBirth}
                                changeInput={changeInput}
                            />
                            <Input
                                displayTxtInput="none"
                                displayBtnInput="flex"
                                nameBtn={selectJenis}
                                displayDiseaseType={onDiseaseType ? 'flex' : 'none'}
                                transformIconBtnInput={onDiseaseType ? 'rotate(180deg)' : 'rotate(0)'}
                                dataDiseaseType={dataDiseaseType}
                                mouseOverBtnInput={(i) => mouseOver(i)}
                                mouseLeaveBtnInput={mouseLeave}
                                selectType={(jenis, idx) => selectType(jenis, idx)}
                                clickBtnInput={showDiseaseType}
                                topDiseaseType={topDiseaseType}
                            />
                            <Input
                                type="text"
                                placeholder="Appointment Date"
                                nameInput="appointmentDate"
                                displayErrorMsg="flex"
                                errorMessage={errorMessage && errorMessage.appointmentDate}
                                marginBottomError={errorMessage && errorMessage.appointmentDate ? '5px' : '0'}
                                valueInput={formUserAppointment.appointmentDate}
                                changeInput={changeInput}
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

                {/* <div className="btn-close-from-body" style={{
                    display: onDiseaseType ? 'flex' : 'none'
                }}
                onClick={()=>setOnDiseaseType(false)}
                >

                </div> */}
            </div>
        </>
    )
}

export default ServicingHours;