import React, { useContext, useEffect, useState } from 'react'
import { NavbarContext } from '../../services/context/NavbarContext'
import './Login.scss'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useHistory } from 'react-router'
import API from '../../services/api'
import { BlogContext } from '../../services/context/BlogContext'

function Login() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers] = useContext(NavbarContext)
    const [filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment] = useContext(BlogContext)
    const [errMessage, setErrMessage] = useState({})
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    const history = useHistory()

    function toPage(path) {
        history.push(path)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

    function login(data) {
        API.APIGetUsers()
        .then(res=>{
            const respons = res.data
            const checkUser = respons.filter(e=> e.name === data.name && e.email === data.email && e.password === data.password)
            if(checkUser.length > 0){
                document.cookie = `idUser=${checkUser[0].id}`
                setUsers(checkUser[0])
                if(routeLoginFromComment !== null){
                    toPage(routeLoginFromComment)

                    setTimeout(() => {
                        setRouteLoginFromComment(null)
                    }, 0);
                }else{
                    toPage('/')
                }
            }else{
                setErrMessage({password: 'Akun tidak terdaftar!'})
            }
        })
        .catch(err=>{
            alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi')
            console.log(err)
        })
    }

    function submitForm() {
        let err = {}

        const data = {
            name: input.name,
            email: input.email,
            password: input.password
        }

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

        if (Object.keys(err).length === 0) {
            login(data)
        }
        setErrMessage(err)
    }

    return (
        <>
            <div className="wrapp-login">
                <div className="form-login">
                    <p className="title-login">
                        Login
                    </p>

                    <Input
                        type="text"
                        placeholder="Enter your name"
                        displayErrorMsg="flex"
                        nameInput="name"
                        valueInput={input.name}
                        changeInput={changeInput}
                        errorMessage={errMessage && errMessage.name}
                    />
                    <Input
                        type="email"
                        placeholder="Enter email address"
                        displayErrorMsg="flex"
                        nameInput="email"
                        valueInput={input.email}
                        changeInput={changeInput}
                        errorMessage={errMessage && errMessage.email}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        displayErrorMsg="flex"
                        nameInput="password"
                        valueInput={input.password}
                        changeInput={changeInput}
                        errorMessage={errMessage && errMessage.password}
                    />

                    <Button
                        nameBtn="LOGIN"
                        margin="30px 0 0 0"
                        click={submitForm}
                    />

                    <div className="column-already-account">
                        <p className="or-login-with" style={{
                            margin: '0'
                        }}>
                            Don't have an account yet?
                        </p>

                        <p className="or-login-with" style={{
                            margin: '0 0 0 5px',
                            color: '#3face4',
                            cursor: 'pointer'
                        }}
                            onClick={() => toPage('/register')}
                        >
                            Signup now
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login