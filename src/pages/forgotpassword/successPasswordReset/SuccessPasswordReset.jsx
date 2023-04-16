import React, { useState, useEffect } from 'react'
import './SuccessPasswordReset.scss'
import { useHistory, useParams } from 'react-router';
import HelmetWindow from '../../../components/helmetwindow/HelmetWindow'
import HeadForgotPassword from '../../../components/headforgotpassword/HeadForgotPassword'
import Button from '../../../components/button/Button'
import API from '../../../services/api';
import LoadProccessForgotPw from '../../../components/loadProccessForgotPw/LoadProccessForgotPw';

function SuccessPasswordReset() {
    const [loading, setLoading] = useState(true)

    const history = useHistory()
    const params = useParams()
    const pathname = window.location.pathname

    const toPage = (path) => {
        history.push(path)
    }

    const getUser = (userId, tokenBlackList) => {
        API.APIGetUsers()
            .then(res => {
                if (res?.data && res?.data?.length > 0) {
                    const result = res.data
                    const findUser = result.find(user => user.id === userId)
                    if (findUser && tokenBlackList) {
                        setLoading(false)
                    } else if (findUser && tokenBlackList === false) {
                        toPage(`/forgot-password/success-send-email/${params?.token}`)
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
                        getUser(userId, true)
                    } else {
                        getUser(userId, false)
                    }
                } else {
                    getUser(userId, false)
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
        const checkUrl = pathname.split('/')

        if (checkUrl.length > 5 && checkUrl[5]?.length > 0) {
            toPage('/')
        } else {
            getJwtToken()
        }
    }, [params])

    return (
        <>
            <HelmetWindow
                title="Success Password Reset | Hospice Medical"
                description="Berhasil reset password akun pengguna pada Hospice Medical"
            />

            <div className="wrapp-success-password-reset">
                <LoadProccessForgotPw
                    loading={loading}
                    text="Please wait a moment"
                />

                <div className="container-white" style={{
                    display: loading === false ? 'flex' : 'none'
                }}>
                    <HeadForgotPassword
                        icon="fas fa-check"
                        title="Password reset"
                        desc="Your password has been successfully reset. Click below to log in magically."
                        styleIcon={{
                            color: '#47d400',
                            backgroundColor: '#2cc20e30',
                            border: '6px solid #7ec86f27'
                        }}
                    />

                    <Button
                        nameBtn="BACK TO LOG IN"
                        margin="10px 0 0 0"
                        click={() => toPage('/login')}
                    />
                </div>
            </div>
        </>
    )
}

export default SuccessPasswordReset