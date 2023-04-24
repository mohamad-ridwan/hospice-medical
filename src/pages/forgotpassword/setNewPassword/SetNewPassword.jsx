import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import './SetNewPassword.scss'
import HelmetWindow from '../../../components/helmetwindow/HelmetWindow'
import LoadProccessForgotPw from '../../../components/loadProccessForgotPw/LoadProccessForgotPw'
import HeadForgotPassword from '../../../components/headforgotpassword/HeadForgotPassword'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import API from '../../../services/api';

function SetNewPassword() {
    const [loading, setLoading] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [user, setUser] = useState(null)
    const [inputPassword, setInputPassword] = useState({
        password: '',
        confirmPassword: ''
    })
    const [errMsg, setErrMsg] = useState({})

    const history = useHistory()
    const params = useParams()
    const pathname = window.location.pathname

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
                        setUser(findUser)
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
        const checkUrl = pathname.split('/')
        if (checkUrl.length > 4) {
            const lengthUrlNext = checkUrl[4].length > 0
            if (lengthUrlNext) {
                toPage('/')
            }
        }

        getJwtToken()
    }, [params])

    const handleChangeInput = (e) => {
        setInputPassword({
            ...inputPassword,
            [e.target.name]: e.target.value
        })

        setErrMsg({
            ...errMsg,
            [e.target.name]: ''
        })
    }

    const createTokenBlackList = () => {
        const dataToken = {
            id: `${new Date().getTime()}`,
            token: params?.token
        }

        API.APIPostBlackListJWT(dataToken)
            .then(res => {
                if (res?.data) {
                    toPage(`/forgot-password/create-new-password/has-been-successfully/${params?.token}`)
                } else {
                    alert('Oops telah terjadi kesalahan\nMohon coba beberapa saat lagi')
                    console.log(res)
                    setLoadingSubmit(false)
                }
            })
            .catch(err => {
                alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
                setLoadingSubmit(false)
            })
    }

    const pushToUpdateUser = () => {
        const data = {
            name: user?.name,
            image: user?.image,
            password: inputPassword.password
        }

        API.APIPutUser(user?.id, data)
            .then(res => {
                if (res?.data) {
                    createTokenBlackList()
                } else {
                    alert('Oops telah terjadi kesalahan\nMohon coba beberapa saat lagi')
                    console.log(res)
                    setLoadingSubmit(false)
                }
            })
            .catch(err => {
                alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
                console.log(err)
                setLoadingSubmit(false)
            })
    }

    const handleSubmit = () => {
        if (loadingSubmit === false) {
            let err = {}

            if (!inputPassword.password) {
                err.password = 'Must be required!'
            } else if (inputPassword.password.length < 8) {
                err.password = 'Must be at least 8 characters.'
            }
            if (!inputPassword.confirmPassword) {
                err.confirmPassword = 'Must be required!'
            } else if (inputPassword.confirmPassword !== inputPassword.password) {
                err.confirmPassword = 'Invalid password confirmation!'
            }

            if (Object.keys(err).length === 0 && window.confirm('Reset your password?')) {
                setLoadingSubmit(true)
                pushToUpdateUser()
            }

            setErrMsg(err)
        }
    }

    return (
        <>
            <HelmetWindow
                title="Set New Password | Hospice Medical"
                description="Mengatur ulang kata sandi pengguna pada Hospice Medical"
            />

            <div className="wrapp-set-new-password">
                <LoadProccessForgotPw
                    loading={loading}
                    text="Please wait a moment"
                />

                <div className="container-white" style={{
                    display: loading === false ? 'flex' : 'none'
                }}>
                    <HeadForgotPassword
                        icon="fas fa-key"
                        title="Set new password"
                        desc="Your new password must be different to previously used passwords."
                    />

                    <Input
                        type="password"
                        placeholder="Enter your password"
                        displayErrorMsg="flex"
                        nameInput="password"
                        valueInput={inputPassword.password}
                        changeInput={handleChangeInput}
                        errorMessage={errMsg?.password}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        displayErrorMsg="flex"
                        nameInput="confirmPassword"
                        valueInput={inputPassword.confirmPassword}
                        changeInput={handleChangeInput}
                        errorMessage={errMsg?.confirmPassword}
                    />

                    <Button
                        nameBtn="RESET PASSWORD"
                        displayLoading={loadingSubmit ? 'flex' : 'none'}
                        margin="30px 0 0 0"
                        click={handleSubmit}
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

export default SetNewPassword