import useFetch from "./useFetch"

// navbar
const APIGetNavbar = () => useFetch('v1/navbar/get', 'GET')

// headerpage
const APIGetHeaderPage = () => useFetch('v3/header-page/get', 'GET')

// procedure category
const APIGetProcedureCategory = () => useFetch('v4/procedure-category/get', 'GET')

// about myself
const APIGetAboutMyself = () => useFetch('v5/about-myself/get', 'GET')

// feedback
const APIGetFeedback = () => useFetch('v6/feedback/get', 'GET')

// our offered services
const APIGetOurOfferedServices = () => useFetch('v7/our-offered-services/get', 'GET')

// servicing hours
const APIGetServicingHours = () => useFetch('v8/servicing-hours/get', 'GET')
const APIPostFormAppointment = (_id, data) => useFetch(`v8/servicing-hours/post/book-an-appointment/user-appointment-data/${_id}`, 'POST', data)

// blogs
const APIGetBlogs = () => useFetch('v9/blog/get', 'GET')
const APIPostComment = (_id, id, data) => useFetch(`v9/blog/post/all-document/data/comments/${_id}/${id}`, 'POST', data)
const APIDeleteComment = (_idblog, iduser, index) => useFetch(`v9/blog/delete/blog/data/comments/${_idblog}/${iduser}/${index}`, 'DELETE')

// footer
const APIGetFooter = () => useFetch('v2/footer/get', 'GET')
const APIPostNewsletter = (_id, data) => useFetch(`v2/footer/post/newsletter/users/${_id}`, 'POST', data)

// doctors
const APIGetDoctors = () => useFetch('v10/doctors/get', 'GET')

// contact
const APIGetContact = () => useFetch('v11/contact/get/get-all', 'GET')
const APIPostContactForm = (_id, data) => useFetch(`v11/contact/post/form-contact-us/data/${_id}`, 'POST', data)

//users
const APIGetUsers = () => useFetch('v12/users/get', 'GET')
const APIPostUsers = (data) => useFetch(`v12/users/post`, 'POST', data)
const APIPutIsVerification = (userId, data)=>useFetch(`v12/users/put/${userId}`, 'PUT', data)
const APIPutUser = (id, data)=>useFetch(`v12/users/put/user/${id}`, 'PUT', data)

// verification
const APIPostVerification = (data)=>useFetch('v13/verification/post', 'POST', data)
const APIGetVerification = ()=>useFetch('v13/verification/get', 'GET')
const APIPutVerification = (userId, data)=>useFetch(`v13/verification/put/${userId}`, 'PUT', data)
const APIDeleteVerification = (id)=>useFetch(`v13/verification/delete/${id}`, 'DELETE')

const API = {
    APIGetNavbar,
    APIGetHeaderPage,
    APIGetProcedureCategory,
    APIGetAboutMyself,
    APIGetFeedback,
    APIGetOurOfferedServices,
    APIGetServicingHours,
    APIPostFormAppointment,
    APIGetBlogs,
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
    APIDeleteVerification
}

export default API