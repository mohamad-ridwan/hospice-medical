import React, { useState, useEffect } from 'react';
import {Loader, LoaderOptions} from 'google-maps'
import './Contact.scss';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import Loading from '../../components/loading/Loading';

function Contact() {
    const [loading, setLoading] = useState(false)
    const [dataHeaders, setDataHeaders] = useState({})
    const [listContact, setListContact] = useState([])
    const [_idFormContact, set_IdFormContact] = useState('')
    const [errorMessage, setErrorMessage] = useState({})
    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    function setAllAPI() {
        setLoading(true)

        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const getHeader = respons.filter(e => e.id === "header-contact")
                setDataHeaders(getHeader[0])
            })
            .catch(err => console.log(err))

        API.APIGetContact()
            .then(res => {
                const respons = res.data
                let dataMaps = {}

                const dataGoogleMaps = respons.filter(e => e.id === "google-maps")[0]
                dataMaps.lat = dataGoogleMaps.lat
                dataMaps.lng = dataGoogleMaps.lng
                dataMaps.apiKey = dataGoogleMaps.apiKey

                const contactAddress = respons.filter(e => e.id === "contact-address")
                setListContact(contactAddress[0].data)

                const formContact = respons.filter(e => e.id === "form-contact-us")
                set_IdFormContact(formContact[0]._id)

                if(Object.keys(dataMaps).length > 0){
                    initMap(dataMaps)
                }
                
                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
        window.scrollTo(0, 0)
    }, [])

    async function initMap(dataMaps) {
        if (Object.keys(dataMaps).length > 0) {
            const { lat, lng, apiKey } = dataMaps && { ...dataMaps }
            const loader = new Loader(apiKey, LoaderOptions);

            const google = await loader.load();

            const map = new google.maps.Map(document.getElementById('column-google-maps'), {
                center: { lat: lat, lng: lng },
                zoom: 8
            })

            return map;
        }
    }

    function changeInput(e) {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errorMessage).length > 0) {
            setErrorMessage({
                ...errorMessage,
                [e.target.name]: ''
            })
        }
    }

    function postForm(data) {
        API.APIPostContactForm(_idFormContact, data)
            .then(res => {
                alert('Anda berhasil mengirimkan pesan kepada kami')

                setFormInput({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                })
                return res
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
            })
    }

    function submitForm() {
        let err = {}

        const data = {
            name: formInput.name,
            email: formInput.email,
            subject: formInput.subject,
            message: formInput.message
        }

        if (!formInput.name) {
            err.name = "Must be required!"
        }
        if (!formInput.email) {
            err.email = "Must be required!"
        } else if (!formInput.email.includes('@')) {
            err.email = "Must be required @!"
        }
        if (!formInput.subject) {
            err.subject = "Must be required!"
        }
        if (!formInput.message) {
            err.message = "Must be required!"
        }

        if (Object.keys(err).length === 0) {
            if(window.confirm('Ingin mengirim pesan kepada kami?')){
                postForm(data)
            }
        }

        setErrorMessage(err)
    }

    return (
        <>
            <div className="wrapp-contact">
                <div className="container-header">
                    {Object.keys(dataHeaders).length > 0 ? (
                        <Header
                            title={dataHeaders.title}
                            img={`${endpoint}/${dataHeaders.image}`}
                            displayIcon2="none"
                            page1="Contact Us"
                            displayIcon3="none"
                        />
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="container-content-contact">
                    <div className="column-google-maps" id="column-google-maps">

                    </div>

                    <div className="column-info-contact-us">
                        <div className="info-contact-us-group">
                            {listContact && listContact.length > 0 ? listContact.map((e, i) => {

                                const getPhone = i === 1 ? e.title.split(' ').join('') : null

                                const toContact = i === 1 ? `tel:${getPhone}` : i === 2 ? `mailto:${e.title}` : '#'

                                return (
                                    <div key={i} className="column-address-contact">
                                        <i className={e.nameIcon}></i>

                                        <div className="list-address-contact">
                                            <a href={toContact} className="title-address-contact" style={{
                                                cursor: i !== 0 ? 'pointer' : 'input'
                                            }}>
                                                {e.title}
                                            </a>
                                            <p className="paragraph-address-contact">
                                                {e.deskripsi}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div></div>
                            )}
                        </div>

                        <div className="info-contact-us-group">
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                nameInput="name"
                                valueInput={formInput.name}
                                changeInput={changeInput}
                                errorMessage={errorMessage && errorMessage.name}
                                displayErrorMsg="flex"
                            />
                            <Input
                                type="email"
                                placeholder="Enter email address"
                                nameInput="email"
                                valueInput={formInput.email}
                                changeInput={changeInput}
                                errorMessage={errorMessage && errorMessage.email}
                                displayErrorMsg="flex"
                            />
                            <Input
                                type="text"
                                placeholder="Enter Subject"
                                nameInput="subject"
                                valueInput={formInput.subject}
                                changeInput={changeInput}
                                errorMessage={errorMessage && errorMessage.subject}
                                displayErrorMsg="flex"
                            />
                        </div>

                        <div className="info-contact-us-group">
                            <Input
                                displayTxtArea="flex"
                                displayTxtInput="none"
                                placeholderTxtArea="Enter Message"
                                resizeTxtArea="none"
                                nameTextArea="message"
                                changeTextArea={changeInput}
                                errorMessage={errorMessage && errorMessage.message}
                                displayErrorMsg="flex"
                            />

                            <div className="column-btn-submit-contact-us">
                                <Button
                                    nameBtn="Send Message"
                                    padding="12px 40px"
                                    click={submitForm}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Loading displayLoadingPage={loading ? 'flex' : 'none'}/>
            </div>
        </>
    )
}

export default Contact;