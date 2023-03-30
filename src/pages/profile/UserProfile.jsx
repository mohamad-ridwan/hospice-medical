import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import Cookies from 'js-cookie'
import './UserProfile.scss'
import { NavbarContext } from '../../services/context/NavbarContext'
import pf from '../../images/user.png'
import BioProfile from '../../components/bioprofile/BioProfile'
import Button from '../../components/button/Button'
import API from '../../services/api'
import Loading from '../../components/loading/Loading'
import { storage } from '../../services/firebase/firebase'

function UserProfile() {
    const [updateProfile, setUpdateProfile] = useState({
        image: null,
        name: ''
    })
    const [newImgProfile, setNewImgProfile] = useState(null)
    const [errorMsg, setErrorMsg] = useState({})
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [activeSubmit, setActiveSubmit] = useState(false)
    const [bgHoverBtn, setBgHoverBtn] = useState(false)
    const [onCancelName, setOnCancelName] = useState(false)
    const navbarCtx = useContext(NavbarContext)
    const setPathActiveMenuNav = navbarCtx[7]
    const users = navbarCtx[4]
    const setUsers = navbarCtx[5]
    const loadingProfile = navbarCtx[8]

    const getCookies = Cookies.get('idUser')
    const params = useParams()
    const history = useHistory()
    const spaceRegex = /\s+/g

    const inputElImg = document.getElementById('input-img-profile')

    useEffect(() => {
        if (getCookies && users?.id === getCookies) {
            setUpdateProfile({
                ...updateProfile,
                name: users.name,
                image: null
            })
        } else if (getCookies && !loadingProfile && users?.id !== getCookies) {
            history.push('/')
            alert('please log in first!')
        } else if(!getCookies && !users?.id) {
            history.push('/')
            alert('please log in first!')
        }
    }, [params, users, loadingProfile])

    useEffect(() => {
        setPathActiveMenuNav(null)
    }, [params])

    useEffect(() => {
        const currentUserName = updateProfile.name.replace(spaceRegex, '')
        const prevUserName = users?.name?.replace(spaceRegex, '')
        if (currentUserName !== prevUserName) {
            setActiveSubmit(true)
            setOnCancelName(true)
        } else if (updateProfile.image !== null) {
            setActiveSubmit(true)
        } else {
            setActiveSubmit(false)
        }
        if(currentUserName === prevUserName){
            setOnCancelName(false)
        }
    }, [updateProfile])

    const handleNameInput = (e) => {
        setUpdateProfile({
            ...updateProfile,
            'name': e.target.value
        })
    }

    const validateForm = async () => {
        let err = {}

        if (!updateProfile.name) {
            err.name = 'Must be required'
        } else if (updateProfile.name.length < 4) {
            err.name = 'Min 4 characters'
        }

        return await new Promise((resolve, reject) => {
            if (err?.name) {
                setErrorMsg(err)
                reject({ message: 'error' })
            } else {
                setErrorMsg({})
                resolve({ message: 'success' })
            }
        })
    }

    const apiFirebaseStorage = 'https://firebasestorage.googleapis.com/v0/b/hospice-medical.appspot.com/o/images%2F'

    async function uploadImgToFirebaseStorage() {
        return await new Promise((resolve, reject) => {
            const imageRef = ref(storage, `images/${updateProfile.image.name + v4()}`)
            uploadBytes(imageRef, updateProfile.image).then((res) => {
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

    const getUser = () => {
        API.APIGetUsers()
            .then(res => {
                const respons = res.data
                const checkUser = respons.filter(e => e.id === users.id)
                if (checkUser.length > 0) {
                    setUsers(checkUser[0])
                    setNewImgProfile(null)
                    setLoadingUpdate(false)
                    setActiveSubmit(false)
                } else {
                    alert('user not found!')
                    setTimeout(() => {
                        window.location.reload()
                    }, 0)
                }
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                setLoadingUpdate(false)
            })
    }

    const updateProfileUserComment = (data) => {
        API.APIPutProfileUserComment(users?.id, data)
            .then(res => {
                console.log(res)
                getUser()
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                setLoadingUpdate(false)
            })
    }

    const pushToUpdateProfile = (data) => {
        API.APIPutUser(users?.id, data)
            .then(res => {
                if (res?.data) {
                    const newData = {
                        name: data.name,
                        image: data.image
                    }
                    updateProfileUserComment(newData)
                } else {
                    alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                    console.log(res)
                    setLoadingUpdate(false)
                }
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                setLoadingUpdate(false)
            })
    }

    const submitUpdateProfile = () => {
        if (loadingProfile === false && activeSubmit) {
            validateForm()
                .then(res => {
                    setLoadingUpdate(true)
                    setOnCancelName(false)
                    setErrorMsg({})
                    const currentUserName = updateProfile.name.replace(spaceRegex, ' ')
                    if (updateProfile.image !== null) {
                        uploadImgToFirebaseStorage()
                            .then(res => {
                                if (res?.tokensImg) {
                                    const tokenImg = res.tokensImg
                                    const nameImg = res.nameImg

                                    const data = {
                                        name: currentUserName,
                                        image: `${apiFirebaseStorage}${nameImg}?alt=media&token=${tokenImg}`,
                                        password: users.password
                                    }

                                    pushToUpdateProfile(data)
                                }
                            })
                            .catch(err => {
                                alert(err.message)
                                console.log({ error: err.error, jenisError: err.jenisError })
                            })
                    } else {
                        const data = {
                            name: currentUserName,
                            image: users.image,
                            password: users.password
                        }

                        pushToUpdateProfile(data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const mouseOverSubmit = () => {
        if (activeSubmit) {
            setBgHoverBtn(true)
        }
    }

    const mouseLeaveSubmit = () => {
        setBgHoverBtn(false)
    }

    const openFileImg = () => {
        if (loadingUpdate === false) {
            inputElImg.click()
        }
    }

    const handleChangeImg = async (e) => {
        const files = e?.target?.files[0]
        if (
            files?.type === 'image/jpeg' ||
            files?.type === 'image/jpg' ||
            files?.type === 'image/png' ||
            files?.type === 'image/svg' ||
            files?.type === 'image/jfif'
        ) {
            setNewImgProfile(URL.createObjectURL(files))
            setUpdateProfile({
                ...updateProfile,
                'image': files
            })
        }
    }

    const cancelChangeImg = () => {
        setUpdateProfile({
            ...updateProfile,
            'image': null
        })
        setNewImgProfile(null)
    }
    const cancelChangeName = ()=>{
        setUpdateProfile({
            ...updateProfile,
            'name': users.name
        })
    }

    return (
        <>
            <Loading
                displayLoadingPage={loadingProfile ? 'flex' : 'none'}
            />
            <div className="wrapp-user-profile">
                <div className="container-user-profile">
                    <div className="container-user-img-profile">
                        <div className="user-img-profile">
                            {users?.image ? (
                                <>
                                    <button className='btn-input-img'
                                        onClick={openFileImg}
                                        style={{
                                            cursor: loadingUpdate ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        <i className="fas fa-camera"></i>
                                        <input type="file" className='input-img-profile' accept='image/png, image/jpeg, image/jpg' id='input-img-profile' style={{ display: 'none' }}
                                            onChange={handleChangeImg}
                                        />
                                    </button>
                                    <img src={newImgProfile !== null ? newImgProfile : users?.image} alt="" className="img-profile" />
                                </>
                            ) : (
                                <img src={pf} alt="" className="img-profile" />
                            )}
                        </div>
                    </div>
                    <button className="btn-cancel-update-profile"
                        onClick={cancelChangeImg}
                        style={{
                            display: updateProfile.image !== null && loadingUpdate !== true ? 'flex' : 'none'
                        }}
                    >
                        Cancel
                    </button>

                    <div className="bio-profile">
                        <div className="column-input-update-profile">
                            <BioProfile
                                icon="fas fa-user"
                                labelName="Name"
                                value={updateProfile.name}
                                changeInput={handleNameInput}
                                errorMessage={errorMsg?.name}
                            />
                            <button className="btn-cancel-update-profile btn-cancel-name"
                                onClick={cancelChangeName}
                                style={{
                                    display: onCancelName ? 'flex' : 'none'
                                }}
                            >
                                Cancel
                            </button>
                        </div>

                        <BioProfile
                            icon="fas fa-envelope"
                            labelName="Email"
                            disabledInput='disabled'
                            value={users?.email}
                        />

                        <Button
                            nameBtn="UPDATE PROFILE"
                            margin="30px 0 0 0"
                            cursor={activeSubmit ? 'pointer' : 'not-allowed'}
                            bgColor={bgHoverBtn ? 'transparent' : '#3face4'}
                            color={bgHoverBtn ? '#3face4' : '#fff'}
                            displayLoading={loadingUpdate ? 'flex' : 'none'}
                            mouseOver={mouseOverSubmit}
                            mouseLeave={mouseLeaveSubmit}
                            click={submitUpdateProfile}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile