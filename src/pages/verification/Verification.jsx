import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './Verification.scss'
import HelmetWindow from '../../components/helmetwindow/HelmetWindow'
import BoxCode from '../../components/boxcode/BoxCode'
import API from '../../services/api'
import Button from '../../components/button/Button'

function Verification() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [msgLoadingVerification, setMsgLoadingVerification] = useState('Please wait a moment')
    const [success, setSuccess] = useState(false)
    const [boxCode] = useState([
        {
            id: 'code1'
        },
        {
            id: 'code2'
        },
        {
            id: 'code3'
        },
        {
            id: 'code4'
        }
    ])
    const [codeValue, setCodeValue] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: ''
    })

    const history = useHistory()
    const params = useParams()

    const toPage = (path) => {
        history.push(path)
    }

    const getUsers = () => {
        API.APIGetUsers()
            .then(res => {
                const result = res?.data
                if (result) {
                    const user = result.filter(user => user.id === params?.userId)
                    if (user.length === 1 && !user[0]?.isVerification) {
                        setUserData(user[0])
                        setLoading(false)
                    } else {
                        alert('Invalid User or token is expired')
                        setTimeout(() => {
                            history.push('/register')
                        }, 0);
                    }
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                history.push('/register')
                console.log(err)
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    const changeCodeValue = (e) => {
        setCodeValue({
            ...codeValue,
            [e.target.name]: e.target.value
        })
    }

    const handleForm = () => {
        let err = {}

        if (codeValue.code1.length === 0) {
            err.code1 = 'error code1'
        }
        if (codeValue.code2.length === 0) {
            err.code2 = 'error code2'
        }
        if (codeValue.code3.length === 0) {
            err.code3 = 'error code3'
        }
        if (codeValue.code4.length === 0) {
            err.code4 = 'error code4'
        }

        return new Promise((resolve, reject) => {
            if (Object.keys(err).length === 0) {
                resolve({ message: 'success' })
            } else {
                reject({ message: 'failed' })
            }
        })
    }

    const deleteExpiredVerification = () => {
        API.APIDeleteVerification(params?.userId)
            .then(res => {
                if (res?.data) {
                    setSuccess(true)
                    setMsgLoadingVerification('Successful Verification')
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                setSuccess(true)
                setMsgLoadingVerification('Successful Verification')
                console.log(err)
            })
    }

    const updateUserIsVerification = () => {
        API.APIPutIsVerification(params?.userId, { isVerification: true })
            .then(res => {
                if (res?.data) {
                    return res
                } else {
                    alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                    window.location.reload()
                }
            })
            .then(res => {
                deleteExpiredVerification()
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                console.log(err)
            })
    }

    const autoSubmit = () => {
        setLoading(true)
        setMsgLoadingVerification('Waiting for verification')

        API.APIGetVerification()
            .then(res => {
                const result = res?.data
                if (result) {
                    const token = `${codeValue.code1}${codeValue.code2}${codeValue.code3}${codeValue.code4}`
                    const userVerification = result.filter(user => user.verification.token === token)
                    const dateVerification = userVerification.length === 1 ? userVerification[0].verification.date : null

                    if (dateVerification !== null) {
                        const checkExpired = `${new Date()}` < dateVerification
                        if (checkExpired) {
                            updateUserIsVerification()
                        } else {
                            alert('Token is expired!\nPlease re-register')
                            history.push('/register')
                        }
                    } else {
                        alert('Invalid tokens! or Token is expired!')

                        setTimeout(() => {
                            setLoading(false)
                        }, 10);
                    }
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server\nMohon coba beberapa saat lagi!')
                history.push('/register')
                console.log(err)
            })
    }

    useEffect(() => {
        handleForm()
            .then(res => {
                autoSubmit()
            })
            .catch(err => { return err })
    }, [codeValue])

    return (
        <>
            <HelmetWindow
                title={userData?.name ? `Verification | ${userData?.name}` : 'Hospice Medical'}
                description="verification account hospice medical"
            />
            <div className="wrapp-verification">
                <div className="container-verification">
                    <div className="loading" style={{
                        display: loading ? 'flex' : 'none'
                    }}>
                        {success ? (
                            <i className="fas fa-check-circle" style={{
                                display: success ? 'flex' : 'none'
                            }}></i>
                        ) : (
                            <>
                                <div className="loading-circle"></div>
                            </>
                        )}

                        <span>{msgLoadingVerification}</span>

                        {success && (
                            <Button
                                nameBtn="BACK TO LOG IN"
                                margin="40px 10px 0 10px"
                                widthBtn="80%"
                                click={() => toPage('/login')}
                            />
                        )}
                    </div>
                    <div className="icon">
                        <i className="fas fa-key"></i>
                    </div>

                    <h1>Please check your email</h1>
                    <p>We've sent a code to <span>{userData?.email}</span></p>

                    <form action="">
                        {boxCode.map((item, index) => {
                            return (
                                <BoxCode
                                    key={index}
                                    id={item.id}
                                    name={item.id}
                                    value={codeValue[item.id]}
                                    changeInput={changeCodeValue}
                                />
                            )
                        })}
                    </form>

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

export default Verification