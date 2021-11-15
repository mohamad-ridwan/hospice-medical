import GetAboutMyself from "./aboutmyself/get"
import GetBlogs from "./blogs/get"
import GetContact from "./contact/get"
import PostContactForm from "./contact/post"
import GetDoctors from "./doctors/get"
import GetFeedback from "./feedback/get"
import GetFooter from "./footer/get"
import PostNewsletter from "./footer/postnewsletter"
import GetHeaderPage from "./headerpage/get"
import GetNavbar from "./navbar/get"
import GetOurOfferedServices from "./ourofferedservices/get"
import GetProcedureCategory from "./procedurecategory/get"
import GetServicingHours from "./servicinghours/get"
import PostFormAppointment from "./servicinghours/postform"

// navbar
const APIGetNavbar = ()=>GetNavbar('v1/navbar/get')

// headerpage
const APIGetHeaderPage = ()=>GetHeaderPage(`v3/header-page/get`)

// procedure category
const APIGetProcedureCategory = ()=>GetProcedureCategory('v4/procedure-category/get')

// about myself
const APIGetAboutMyself = ()=>GetAboutMyself('v5/about-myself/get')

// feedback
const APIGetFeedback = ()=> GetFeedback('v6/feedback/get')

// our offered services
const APIGetOurOfferedServices = ()=>GetOurOfferedServices('v7/our-offered-services/get')

// servicing hours
const APIGetServicingHours = ()=>GetServicingHours('v8/servicing-hours/get')
const APIPostFormAppointment = (_id, data)=>PostFormAppointment(`v8/servicing-hours/post/book-an-appointment/user-appointment-data/${_id}`, data)

// blogs
const APIGetBlogs = ()=>GetBlogs('v9/blog/get')

// footer
const APIGetFooter = ()=> GetFooter('v2/footer/get')
const APIPostNewsletter = (_id, data)=>PostNewsletter(`v2/footer/post/newsletter/users/${_id}`, data)

// doctors
const APIGetDoctors = ()=>GetDoctors('v10/doctors/get')

// contact
const APIGetContact = ()=>GetContact('v11/contact/get/get-all')
const APIPostContactForm = (_id, data)=>PostContactForm(`v11/contact/post/form-contact-us/data/${_id}`, data)

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
    APIPostNewsletter
}

export default API