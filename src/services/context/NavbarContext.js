import React, {createContext, useEffect, useState} from 'react'
import API from '../api/index'

export const NavbarContext = createContext()

const NavbarProvider = ({children})=>{
    const [linkMedsos, setLinkMedsos] = useState([])
    const [contactNav, setContactNav] = useState([])
    const [logoWeb, setLogoWeb] = useState({})
    const [menuPage, setMenuPage] = useState([])

    function setAllAPI(){
        API.APIGetNavbar()
        .then(res=>{
            const respons = res.data
            const getLinkMedsos = respons.filter((e)=>e.id === "link-medsos")
            const getContact = respons.filter((e)=>e.id === "contact")
            const getLogoWeb = respons.filter((e)=>e.id === "logo-web")
            const getMenuPage = respons.filter((e)=>e.id === "menu-page")

            setLinkMedsos(getLinkMedsos)
            setContactNav(getContact)
            setLogoWeb(getLogoWeb[0])
            setMenuPage(getMenuPage)
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        setAllAPI()
    }, [])

    return(
        <NavbarContext.Provider value={[linkMedsos, contactNav, logoWeb, menuPage]}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider