import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useHistory, useParams } from 'react-router';
import './ForgotPassword.scss'
import HelmetWindow from '../../components/helmetwindow/HelmetWindow'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import HeadForgotPassword from '../../components/headforgotpassword/HeadForgotPassword'
import API from '../../services/api';

function ForgotPassword() {
  const [inputEmail, setInputEmail] = useState('')
  const [errMsg, setErrMsg] = useState(null)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const pathname = window.location.pathname
  const history = useHistory()
  const params = useParams()
  const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const toPage = (path) => {
    history.push(path)
  }

  useEffect(() => {
    if (pathname !== '/forgot-password') {
      toPage('/')
    }
  }, [params])

  const handleChangeInput = (e) => {
    setInputEmail(e.target.value)
    setErrMsg(null)
  }

  const checkEmailUser = async () => {
    try {
      const getUser = API.APIGetUsers()
      const result = await getUser.then(res => res)
      const findUser = await result?.data ? result?.data?.filter(user => user.email === inputEmail) : null
      return findUser
    } catch (err) {
      return err
    }
  }

  const createJwtToken = async (userId) => {
    try {
      const getToken = API.APIPostCreateJwtToken(userId)
      const result = await getToken.then(res => res)
      return result
    } catch (err) {
      return err
    }
  }

  const sendToEmailUser = (token, email) => {
    const serviceId = process.env.REACT_APP_SERVICE_ID_ADM
    const templateId = process.env.REACT_APP_TEMPLATE_ID_ADM
    const publicKey = process.env.REACT_APP_PUBLIC_KEY_ADM

    const dataSend = {
      to_email: email,
      token: token
    }

    emailjs.send(serviceId, templateId, dataSend, publicKey)
      .then(res => {
        toPage(`/forgot-password/success-send-email/${token}`)
      }, (err) => {
        alert('Oops telah terjadi kesalahan proses pengiriman email!')
        console.log(err)
        setLoadingSubmit(false)
      })
  }

  const pushSendToEmailUser = () => {
    checkEmailUser()
      .then(res => {
        if (res === null) {
          alert('Oops telah terjadi kesalahan!\nMohon coba beberapa saat lagi')
          setLoadingSubmit(false)
        } else if (res?.length > 0) {
          const { id, email } = res[0]
          createJwtToken(id)
            .then(res => {
              if (res?.error === null) {
                sendToEmailUser(res.token, email)
              } else if (res?.error !== null) {
                alert(res.error)
                setLoadingSubmit(false)
                console.log(res)
              }
            })
            .catch(err => {
              alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
              console.log(err)
              setLoadingSubmit(false)
            })
        } else {
          alert('Unregistered account!')
          setLoadingSubmit(false)
        }
      })
      .catch(err => {
        alert('Oops telah terjadi kesalahan server\nMohon coba beberapa saat lagi')
        console.log(err)
        setLoadingSubmit(false)
      })
  }

  const handleSubmitForm = () => {
    if (loadingSubmit === false) {
      let err = {}

      if (!inputEmail) {
        err.email = 'Must be required!'
      } else if (!mailRegex.test(inputEmail)) {
        err.email = 'Invalid email address!'
      }

      if (!err?.email) {
        setLoadingSubmit(true)
        pushSendToEmailUser()
      }
      setErrMsg(err)
    }
  }

  return (
    <>
      <HelmetWindow
        title="Forgot Password | Hospice Medical"
        description="Lupa password pada akun hospice medical"
      />
      <div className="wrapp-forgot-password">
        <div className="container-white-forgot-password">
          <HeadForgotPassword
            icon="fas fa-key"
            title="Forgot Password?"
            desc="No worries, we'll send you reset instructions."
          />

          <Input
            type="email"
            placeholder="Enter your email"
            displayErrorMsg="flex"
            nameInput="email"
            valueInput={inputEmail}
            changeInput={handleChangeInput}
            errorMessage={errMsg?.email}
          />

          <Button
            nameBtn="RESET PASSWORD"
            displayLoading={loadingSubmit ? 'flex' : 'none'}
            margin="30px 0 0 0"
            click={handleSubmitForm}
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

export default ForgotPassword