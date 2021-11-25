import React, { useState, useEffect } from 'react';
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
    const [loadingSubmit, setLoadingSubmit] = useState(false)
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

                const contactAddress = respons.filter(e => e.id === "contact-address")
                setListContact(contactAddress[0].data)

                const formContact = respons.filter(e => e.id === "form-contact-us")
                set_IdFormContact(formContact[0]._id)

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
        setLoadingSubmit(true)

        API.APIPostContactForm(_idFormContact, data)
            .then(res => {
                alert('Anda berhasil mengirimkan pesan kepada kami')

                setFormInput({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                })
                setLoadingSubmit(false)
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
            if (window.confirm('Ingin mengirim pesan kepada kami?')) {
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
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7928.985849919385!2d106.79462772110102!3d-6.459057920540529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e9e7ede517f7%3A0xb8953bf5dd0f86f1!2sJl.%20Sunan%20Muria%20IV%2C%20Pabuaran%2C%20Kec.%20Bojong%20Gede%2C%20Bogor%2C%20Jawa%20Barat%2016921!5e0!3m2!1sid!2sid!4v1637844448487!5m2!1sid!2sid" width="100%" style={{
                            border: '0px'
                        }} allowfullscreen="" loading="lazy"></iframe>
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

                <Loading
                    displayLoadingPage={loading ? 'flex' : 'none'}
                    displayLoadingBottom={loadingSubmit ? 'flex' : 'none'}
                    displayBarrier={loadingSubmit ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default Contact;