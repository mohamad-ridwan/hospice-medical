import fetchJwtToken from "./fetchJwtToken"
import useFetch from "./useFetch"

// navbar
const APIGetNavbar = () => useFetch('navbar/get?limit=50', 'GET')

// headerpage
const APIGetHeaderPage = () => useFetch('header-page/get', 'GET')

// procedure category
const APIGetProcedureCategory = () => useFetch('procedure-category/get', 'GET')

// about myself
const APIGetAboutMyself = () => useFetch('about-myself/get', 'GET')

// feedback
const APIGetFeedback = () => useFetch('feedback/get', 'GET')

// our offered services
const APIGetOurOfferedServices = () => useFetch('our-offered-services/get', 'GET')

// servicing hours
const APIGetServicingHours = () => useFetch('servicing-hours/get', 'GET')
const APIPostFormAppointment = (_id, data) => useFetch(`servicing-hours/post/book-an-appointment/user-appointment-data/${_id}`, 'POST', data)
const APIPostPatientRegistration = (roleId, data)=>useFetch(`servicing-hours/post/role/${roleId}/data`, 'POST', data)

// blogs
const APIGetBlogs = () => useFetch('blog/get', 'GET')
const APIPostComment = (_id, id, data) => useFetch(`blog/post/all-document/data/comments/${_id}/${id}`, 'POST', data)
const APIDeleteComment = (_idblog, iduser, index) => useFetch(`blog/delete/blog/data/comments/${_idblog}/${iduser}/${index}`, 'DELETE')
const APIPutProfileUserComment = (id, data)=>useFetch(`blog/put/profile-user-comment/every-article/data/comments/${id}`, 'PUT', data)

// footer
const APIGetFooter = () => useFetch('footer/get', 'GET')
const APIPostNewsletter = (_id, data) => useFetch(`footer/post/newsletter/users/${_id}`, 'POST', data)

// doctors
const APIGetDoctors = () => useFetch('doctors/get', 'GET')

// contact
const APIGetContact = () => useFetch('contact/get/get-all', 'GET')
const APIPostContactForm = (_id, data) => useFetch(`contact/post/form-contact-us/data/${_id}`, 'POST', data)

//users
const APIGetUsers = () => useFetch('users/get', 'GET')
const APIPostUsers = (data) => useFetch(`users/post`, 'POST', data)
const APIPutIsVerification = (userId, data)=>useFetch(`users/put/${userId}`, 'PUT', data)
const APIPutUser = (id, data)=>useFetch(`users/put/user/${id}`, 'PUT', data)

// verification
const APIPostVerification = (data)=>useFetch('verification/post', 'POST', data)
const APIGetVerification = ()=>useFetch('verification/get', 'GET')
const APIPutVerification = (userId, data)=>useFetch(`verification/put/${userId}`, 'PUT', data)
const APIDeleteVerification = (id)=>useFetch(`verification/delete/${id}`, 'DELETE')
// verification create new password and create jwt-token
const APIPostCreateJwtToken = (userId)=>useFetch(`verification/post/forgot-password/create-new-password/${userId}/user`, 'POST')
const APIGetJwtTokenVerif = (token)=>fetchJwtToken('verification/get/forgot-password/create-new-password', 'GET', token)

// black list JWT
const APIPostBlackListJWT = (data)=>useFetch(`black-list-jwt/post`, 'POST', data)
const APIGetBlackListJWT = ()=>useFetch(`black-list-jwt/get`, 'GET')

const API = {
    APIGetNavbar,
    APIGetHeaderPage,
    APIGetProcedureCategory,
    APIGetAboutMyself,
    APIGetFeedback,
    APIGetOurOfferedServices,
    APIGetServicingHours,
    APIPostFormAppointment,
    APIPostPatientRegistration,
    APIGetBlogs,
    APIPutProfileUserComment,
    APIGetFooter,
    APIGetDoctors,
    APIGetContact,
    APIPostContactForm,
    APIPostNewsletter,
    APIGetUsers,
    APIPostUsers,
    APIPutUser,
    APIPostComment,
    APIDeleteComment,
    APIPostVerification,
    APIGetVerification,
    APIPutIsVerification,
    APIPutVerification,
    APIDeleteVerification,
    APIPostCreateJwtToken,
    APIGetJwtTokenVerif,
    APIPostBlackListJWT,
    APIGetBlackListJWT
}

export default API