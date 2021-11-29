import React, { useContext, useEffect, useState } from 'react'
import endpoint from '../../services/api/endpoint'
import { useHistory } from 'react-router';
import './Register.scss'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { NavbarContext } from '../../services/context/NavbarContext'
import API from '../../services/api';
import Loading from '../../components/loading/Loading';

function Register() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers] = useContext(NavbarContext)
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
        setLoadingSubmit(true)

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

    function submitForm() {
        let err = {}

        const email = input.email

        const data = new FormData()
        data.append('name', input.name)
        data.append('email', input.email)
        data.append('password', input.password)
        data.append('image', input.image)

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
            }else {
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
                postForm(data, email)
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