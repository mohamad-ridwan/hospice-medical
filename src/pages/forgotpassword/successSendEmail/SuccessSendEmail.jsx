import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import './SuccessSendEmail.scss'
import HelmetWindow from '../../../components/helmetwindow/HelmetWindow'
import HeadForgotPassword from '../../../components/headforgotpassword/HeadForgotPassword'
import Button from '../../../components/button/Button'
import API from '../../../services/api';
import LoadProccessForgotPw from '../../../components/loadProccessForgotPw/LoadProccessForgotPw';

function SuccessSendEmail() {
    const [emailUser, setEmailUser] = useState('')
    const [loading, setLoading] = useState(true)

    const history = useHistory()
    const params = useParams()

    const toPage = (path) => {
        history.push(path)
    }

    const getUser = (userId) => {
        API.APIGetUsers()
            .then(res => {
                if (res?.data && res?.data?.length > 0) {
                    const result = res.data
                    const findUser = result.find(user => user.id === userId)
                    if (findUser) {
                        setEmailUser(findUser.email)
                        setLoading(false)
                    } else {
                        alert('User not found!')
                        toPage('/')
                    }
                } else {
                    alert('User not found!')
                    toPage('/')
                }
            })
            .catch(err => {
                alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
                toPage('/')
            })
    }

    const checkBlackListToken = (userId) => {
        API.APIGetBlackListJWT()
            .then(res => {
                if (res?.data && res?.data?.length > 0) {
                    const result = res.data
                    const findBlackList = result.find(token => token.token === params?.token)
                    if (findBlackList) {
                        toPage(`/forgot-password/create-new-password/has-been-successfully/${params?.token}`)
                    } else {
                        getUser(userId)
                    }
                } else {
                    getUser(userId)
                }
            })
            .catch(err => {
                alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
                toPage('/')
            })
    }

    const getJwtToken = () => {
        API.APIGetJwtTokenVerif(params?.token)
            .then(res => {
                if (res?.error !== null) {
                    alert(res.error)
                    toPage('/')
                } else {
                    checkBlackListToken(res.data.userData.id)
                }
            })
            .catch(err => {
                alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
                toPage('/')
            })
    }

    useEffect(() => {
        getJwtToken()
    }, [params])

    const openEmail = (url) => {
        window.open(url)
    }

    return (
        <>
            <HelmetWindow
                title="Success Send Email | Hospice Medical"
                description="Berhasil mengirim email untuk membuat password baru pada lupa password di Hospice Medical"
            />

            <div className="wrapp-success-send-email">
                <LoadProccessForgotPw
                    loading={loading}
                    text="Please wait a moment"
                />

                <div className="container-white" style={{
                    display: loading === false ? 'flex' : 'none'
                }}>
                    <HeadForgotPassword
                        icon="fas fa-envelope"
                        title="Check your email"
                        desc={`We sent a password reset link to ${emailUser}`}
                    />

                    <Button
                        nameBtn="OPEN EMAIL"
                        margin="10px 0 0 0"
                        click={() => openEmail('https://mail.google.com')}
                    />

                    <Button
                        nameBtn="Back to log in"
                        flexDirectionBtn="row-reverse"
                        margin="20px 0 0 0"
                        displayIcon="flex"
                        icon='fas fa-arrow-left'
                        marginIcon="1px 10px 0 0"
                        bgColor="#fff"
                        border="1px solid #fff"
                        color="#3face4"
                        flexWrapBtn="wrap"
                        click={() => toPage('/login')}
                    />
                </div>
            </div>
        </>
    )
}

export default SuccessSendEmail