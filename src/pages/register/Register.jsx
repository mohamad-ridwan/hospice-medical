import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
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
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: null,
    })

    const history = useHistory()

    useEffect(() => {
        setPathActiveMenuNav(null)
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
                const checkUser = respons.filter(e => e.email === email)
                if (checkUser.length > 0) {
                    alert('Email sudah terpakai!')
                    setLoadingSubmit(false)
                } else {
                    API.APIPostUsers(data)
                        .then(res => {
                            alert('Berhasil mendaftarkan akun Anda!')
                            setInput({
                                name: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                                image: null,
                            })
                            setNameImg('Select your image profile')
                            setLoadingSubmit(false)
                            return res;
                        })
                        .catch(err => {
                            alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                            setLoadingSubmit(false)
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                setLoadingSubmit(false)
                console.log(err)
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
        } else if (!input.email.includes('@')) {
            err.email = 'Must be required @!'
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
                err.confirmPassword = 'Confirm password must be the same!'
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

                            const data = {
                                name: input.name,
                                email: input.email,
                                password: input.password,
                                image: `${apiFirebaseStorage}${nameImg}?alt=media&token=${tokenImg}`
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
                    displayLoadingBottom={loadingSubmit ? 'flex' : 'none'}
                    displayBarrier={loadingSubmit ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default Register