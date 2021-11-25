import React, { useState, useEffect, useContext } from 'react';
import './Footer.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import API from '../../services/api';
import { NavbarContext } from '../../services/context/NavbarContext';
import Loading from '../loading/Loading';

function Footer() {
    const [linkMedsos, contactNav, logoWeb, menuPage] = useContext(NavbarContext)
    const [contactUs, setContactUs] = useState({})
    const [newsletter, setNewsletter] = useState({})
    const [hoverBtnSubmit, setHoverBtnSubmit] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [inputNewsletter, setInputNewsletter] = useState('')

    function mouseOverBtnSubmit() {
        setHoverBtnSubmit(true)
    }

    function mouseLeaveBtnSubmit() {
        setHoverBtnSubmit(false)
    }

    function setAllAPI() {
        API.APIGetFooter()
            .then(res => {
                const respons = res.data

                const getContactUs = respons.filter((e) => e.id === "contact-us")
                setContactUs(getContactUs[0])
                const getNewsletter = respons.filter((e) => e.id === "newsletter")
                setNewsletter(getNewsletter[0])
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
    }, [])

    function RenderCopyRight({ cpRight }) {
        return (
            <p className="copy-right" dangerouslySetInnerHTML={{ __html: cpRight }}></p>
        )
    }

    function checkEmailNewsletter(data) {
        API.APIGetFooter()
            .then(res => {
                const respons = res.data
                const getnewsletter = respons.filter(e => e.id === 'newsletter')

                if (getnewsletter.length > 0) {
                    const checkUser = getnewsletter[0].data.filter(e => e.email === inputNewsletter)

                    if (checkUser.length === 0) {
                        API.APIPostNewsletter(newsletter._id, data)
                            .then(res => {
                                alert('Berhasil mendaftarkan email Anda\nNantikan berita terbaru dari kami!')
                                setInputNewsletter('')

                                setLoadingSubmit(false)
                                return res
                            })
                            .catch(err => {
                                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                                setLoadingSubmit(false)
                                console.log(err)
                            })
                    }else {
                        alert('Email sudah terdaftar!')
                        setLoadingSubmit(false)
                    }
                }else{
                    API.APIPostNewsletter(newsletter._id, data)
                    .then(res => {
                        alert('Berhasil mendaftarkan email Anda\nNantikan berita terbaru dari kami!')
                        setInputNewsletter('')

                        setLoadingSubmit(false)
                        return res
                    })
                    .catch(err => {
                        alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                        setLoadingSubmit(false)
                        console.log(err)
                    })
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function submitFormNewsletter(e) {
        e.preventDefault()
        if (inputNewsletter.length > 0 && inputNewsletter.includes('@')) {
            setLoadingSubmit(true)
            const data = {
                email: inputNewsletter
            }

            if (window.confirm('Ingin mengirim email untuk berita ter update kami?')) {
                checkEmailNewsletter(data)
            }
        }
    }

    const cursorSubmit = !inputNewsletter ? 'not-allowed' : !inputNewsletter.includes('@') ? 'not-allowed' : 'pointer'

    return (
        <>
            <div className="wrapp-footer">
                <div className="column-contact-us">
                    <div className="contact-us">
                        <p className="title-contact-us-group">
                            Contact Us
                        </p>
                        {Object.keys(contactUs).length > 0 ? (
                            <>
                                <p className="paragraph-contact-us-group">
                                    {contactUs.alamat}
                                </p>

                                <ul>
                                    <li className="no-telp">
                                        <a href={`tel:${contactUs.noTelpSatu}`} className="to-contact">
                                            {contactUs.noTelpSatu}
                                        </a>
                                    </li>
                                    <li className="no-telp">
                                        <a href={`tel:${contactUs.noTelpDua}`} className="to-contact">
                                            {contactUs.noTelpDua}
                                        </a>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="newsletter">
                        <p className="title-contact-us-group">
                            Newsletter
                        </p>
                        <p className="paragraph-contact-us-group">
                            {newsletter && newsletter.title}
                        </p>

                        <form onSubmit={submitFormNewsletter} className="form-input-email-newsletter">
                            <Input
                                type="email"
                                placeholder="Your Email Address"
                                bgColorInputCard="#2d2d2d"
                                borderInputCard="1px solid #2d2d2d"
                                colorInputCard="#fff"
                                bdrRadiusInputCard="100px"
                                paddingInputCard="12px 15px"
                                widthInputCard="55%"
                                marginInputCard="0"
                                valueInput={inputNewsletter}
                                changeInput={(e) => setInputNewsletter(e.target.value)}
                            />

                            <div className="column-btn-submit-newsletter">
                                <Button
                                    nameBtn="Get Started"
                                    bgColor={hoverBtnSubmit ? 'transparent' : '#3face4'}
                                    color={hoverBtnSubmit ? '#3face4' : '#fff'}
                                    bdrRadius="100px"
                                    padding="12px 40px"
                                    displayIcon="flex"
                                    cursor={cursorSubmit}
                                    icon="fas fa-long-arrow-alt-right"
                                    mouseOver={mouseOverBtnSubmit}
                                    mouseLeave={mouseLeaveBtnSubmit}
                                    click={submitFormNewsletter}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="column-copy-right">
                    <RenderCopyRight cpRight={contactUs && contactUs.copyRight} />

                    <ul>
                        {linkMedsos && linkMedsos.length > 0 ? linkMedsos.map((e, i) => {
                            return (
                                <>
                                    <li key={i} className="list-medsos">
                                        <a target="_blank" href={e.path} className="link-medsos">
                                            <i className={e.nameIcon}></i>
                                        </a>
                                    </li>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </ul>
                </div>

                <Loading
                    displayLoadingBottom={loadingSubmit ? 'flex' : 'none'}
                    displayBarrier={loadingSubmit ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default Footer;