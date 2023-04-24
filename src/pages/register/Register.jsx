import React, { useContext, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useHistory } from 'react-router';
import Cookies from 'js-cookie'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import './Register.scss'
import { storage } from '../../services/firebase/firebase';
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { NavbarContext } from '../../services/context/NavbarContext'
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import HelmetWindow from '../../components/helmetwindow/HelmetWindow';

function Register() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav] = useContext(NavbarContext)
    const [nameImg, setNameImg] = useState('Select your image profile')
    const [errMessage, setErrMessage] = useState({})
    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: null,
    })

    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const urlOrigin = window.location.origin
    const history = useHistory()

    const getCookies = Cookies.get('idUser')

    useEffect(() => {
        setPathActiveMenuNav(null)
        if (getCookies && getCookies.length > 0) {
            API.APIGetUsers()
                .then(res => {
                    const respons = res.data

                    const checkUsers = respons.filter(e => e.id === getCookies)

                    if (checkUsers.length > 0) {
                        history.push('/')
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert('Oops!, telah terjadi kesalahan server.')
                })
        } else {
            setTimeout(() => {
                setLoadingPage(false)
            }, 1000)
        }
        window.scrollTo(0, 0)
    }, [])

    function toPage(path) {
        history.push(path)
    }

    function changeInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errMessage).length > 0) {
            setErrMessage({
                ...errMessage,
                [e.target.name]: ''
            })
        }
    }

    function postForm(data, email) {
        API.APIGetUsers()
            .then(res => {
                const respons = res.data
                const checkUser = respons.filter(e => e.email === email && e.isVerification)
                const userIsNotVerifYet = respons.filter(e => e.email === email && e.isVerification === false)
                if (checkUser.length > 0) {
                    alert('Email sudah terpakai!')
                    setLoadingSubmit(false)
                } else if (userIsNotVerifYet.length === 0) {
                    API.APIPostUsers(data)
                        .then(res => {
                            postVerification(data)
                        })
                        .catch(err => {
                            alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                            setLoadingSubmit(false)
                            console.log(err)
                        })
                } else {
                    const dataUserUpdate = {
                        name: data.name,
                        image: data.image,
                        password: data.password
                    }

                    updateUserVerif(userIsNotVerifYet[0].id, dataUserUpdate, (data)=>{
                        postVerification(data)
                    })
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function updateUserVerif(id, dataForUpdt, success) {
        API.APIPutUser(id, dataForUpdt)
            .then(res => {
                if (res?.data) {
                    return success(res.data)
                } else {
                    alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                    setLoadingSubmit(false)
                    console.log(res)
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function sendCodeToEmailUser(data, code) {
        const serviceId = process.env.REACT_APP_SERVICE_ID
        const templateId = process.env.REACT_APP_TEMPLATE_ID
        const publicKey = process.env.REACT_APP_PUBLIC_KEY

        const dataSend = {
            url: `${urlOrigin}/verification/${data.id}`,
            from_name: 'Hospice Medical',
            to_name: data.name,
            to_email: data.email,
            code: code,
        }
        emailjs.send(serviceId, templateId, dataSend, publicKey)
            .then(result => {
                alert('Berhasil mendaftarkan akun Anda.\nCek email Anda untuk verifikasi')

                setInput({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    image: null,
                })
                setNameImg('Select your image profile')
                setLoadingSubmit(false)

                setTimeout(() => {
                    window.open(`${urlOrigin}/verification/${data.id}`)
                }, 100);
            }, (error) => {
                console.log(error)
            })
    }

    function updateVerification(dataToken, data) {
        const { token, date } = dataToken

        const dataVerification = {
            verification: {
                token: token,
                date: date
            }
        }

        API.APIPutVerification(data.id, dataVerification)
            .then(res => {
                if (res?.data) {
                    sendCodeToEmailUser(data, token)
                } else {
                    alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                    setLoadingSubmit(false)
                    console.log(res)
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function checkUserTokenFirst(data, userAny, userEmpty) {
        API.APIGetVerification()
            .then(res => {
                const result = res?.data
                const findToken = result?.length > 0 ? result?.find(token => token.userId === data.id) : null

                if (findToken?.userId) {
                    userAny(findToken)
                } else {
                    userEmpty()
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function pushToVerification(data, dataToken) {
        const { newDate, token, date } = dataToken

        const dataPost = {
            id: newDate,
            userId: data.id,
            verification: {
                token: token,
                date: date
            }
        }
        API.APIPostVerification(dataPost)
            .then(res => {
                sendCodeToEmailUser(data, token)
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                setLoadingSubmit(false)
                console.log(err)
            })
    }

    function postVerification(data) {
        const ranCode1 = Math.floor(Math.random() * 9)
        const ranCode2 = Math.floor(Math.random() * 9)
        const ranCode3 = Math.floor(Math.random() * 9)
        const ranCode4 = Math.floor(Math.random() * 9)
        const token = `${ranCode1}${ranCode2}${ranCode3}${ranCode4}`

        const date = new Date()
        const nowHours = new Date().getHours()
        const getTimeExpired = nowHours < 23 ? nowHours + 1 : 0
        date.setHours(getTimeExpired)
        const newDate = new Date().getTime()

        checkUserTokenFirst(data, (userToken) => {
            // any user for verification
            // still not verification yet
            const dataToken = {
                token: token,
                date: `${date}`
            }

            updateVerification(dataToken, data)
        }, () => {
            // no user token is for verification
            const dataToken = {
                newDate: `${newDate}`,
                token: token,
                date: `${date}`
            }
            pushToVerification(data, dataToken)
        })
    }

    const apiFirebaseStorage = 'https://firebasestorage.googleapis.com/v0/b/hospice-medical.appspot.com/o/images%2F'

    async function uploadImgToFirebaseStorage() {
        return await new Promise((resolve, reject) => {
            const imageRef = ref(storage, `images/${nameImg + v4()}`)
            uploadBytes(imageRef, input.image).then((res) => {
                const nameImg = res && res.metadata.name

                getAccessTokenImgUpload(nameImg)
                    .then(res => resolve({ tokensImg: res, nameImg: nameImg }))
                    .catch(err => reject(err))
            })
                .catch(err => reject({ message: 'Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!', error: 'error', jenisError: 'gagal upload image ke firebase storage' }))
        })
    }

    async function getAccessTokenImgUpload(nameImg) {
        return await new Promise((resolve, reject) => {
            fetch(`${apiFirebaseStorage}${nameImg}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(res => {
                    const getAccessToken = res && res.downloadTokens
                    resolve(getAccessToken)
                })
                .catch(err => reject({ message: 'Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!', error: 'error', jenisError: 'gagal mendapatkan tokens image' }))
        })
    }

    function submitForm() {
        let err = {}

        if (!input.name) {
            err.name = 'Must be required!'
        }
        if (!input.email) {
            err.email = 'Must be required!'
        } else if (!mailRegex.test(input.email)) {
            err.email = 'Invalid email address!'
        }
        if (!input.password) {
            err.password = 'Must be required!'
        }
        if (!input.confirmPassword) {
            err.confirmPassword = 'Must be required!'
        }
        if (input.image === null) {
            err.image = 'Must be required!'
        } else if (input.image !== null) {
            const getTypeFile = input.image.type.split('/')[1]

            if (getTypeFile.toLowerCase() === 'jpg' || getTypeFile.toLowerCase() === 'jpeg' || getTypeFile.toLowerCase() === 'png') {
            } else {
                err.image = 'Must be jpg/jpeg/png'
            }
        }
        if (input.password.length > 0 && input.confirmPassword.length > 0) {
            if (input.password !== input.confirmPassword) {
                err.confirmPassword = 'Invalid password confirmation!'
            }
        }

        if (Object.keys(err).length === 0) {
            if (window.confirm('Ingin mendaftarkan akun?')) {
                setLoadingSubmit(true)

                uploadImgToFirebaseStorage()
                    .then((res) => {
                        if (res && res.tokensImg) {
                            const tokenImg = res.tokensImg
                            const nameImg = res.nameImg

                            const email = input.email
                            const date = new Date().getTime()

                            const data = {
                                id: `${date}`,
                                name: input.name,
                                email: input.email,
                                password: input.password,
                                image: `${apiFirebaseStorage}${nameImg}?alt=media&token=${tokenImg}`,
                                isVerification: false
                            }

                            postForm(data, email)
                        }
                    })
                    .catch(err => {
                        setLoadingSubmit(false)
                        alert(err.message)
                        console.log(err)
                    })
            }
        }
        setErrMessage(err)
    }

    function openFile() {
        document.getElementById('input-file').click()
    }

    function changeInputFile(e) {
        if (e.target.files[0] !== undefined) {
            const getNamePhoto = e.target.files[0]
            setNameImg(getNamePhoto.name)
            setInput({
                ...input,
                image: getNamePhoto
            })

            if (errMessage && errMessage.image) {
                setErrMessage({
                    ...errMessage,
                    image: ''
                })
            }
        }
    }

    return (
        <>
            <HelmetWindow
                title="Register | Hospice Medical"
                description="Silahkan daftarkan diri anda untuk menjadi User"
            />

            <div className="wrapp-register">
                <div className="form-register">
                    <p className="title-register">
                        Register
                    </p>

                    <Input
                        type="text"
                        placeholder="Enter your name"
                        nameInput="name"
                        valueInput={input.name}
                        changeInput={changeInput}
                        displayErrorMsg="flex"
                        errorMessage={errMessage && errMessage.name}
                    />
                    <Input
                        type="email"
                        placeholder="Enter email address"
                        nameInput="email"
                        valueInput={input.email}
                        changeInput={changeInput}
                        displayErrorMsg="flex"
                        errorMessage={errMessage && errMessage.email}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        nameInput="password"
                        valueInput={input.password}
                        changeInput={changeInput}
                        displayErrorMsg="flex"
                        errorMessage={errMessage && errMessage.password}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        nameInput="confirmPassword"
                        valueInput={input.confirmPassword}
                        changeInput={changeInput}
                        displayErrorMsg="flex"
                        errorMessage={errMessage && errMessage.confirmPassword}
                    />
                    <Input
                        displayTxtInput="none"
                        displayInputfile="flex"
                        nameBtnInputFile={nameImg}
                        clickInputFile={openFile}
                        changeFile={changeInputFile}
                        acceptFile="image/png, image/jpg, image/jpeg"
                        nameInputFile="image"
                        idInputFile="input-file"
                        displayErrorMsg="flex"
                        errorMessage={errMessage && errMessage.image}
                    />

                    <Button
                        nameBtn="REGISTER"
                        margin="30px 0 0 0"
                        click={submitForm}
                    />

                    <div className="column-already-account">
                        <p className="or-login-with" style={{
                            margin: '0'
                        }}>
                            Already have an account?
                        </p>

                        <p className="or-login-with" style={{
                            margin: '0 0 0 5px',
                            color: '#3face4',
                            cursor: 'pointer'
                        }}
                            onClick={() => toPage('/login')}
                        >
                            Signin now
                        </p>
                    </div>
                </div>

                <Loading
                    displayLoadingPage={loadingPage ? 'flex' : 'none'}
                    displayLoadingBottom={loadingSubmit ? 'flex' : 'none'}
                    displayBarrier={loadingSubmit ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default Register