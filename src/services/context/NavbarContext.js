import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import API from '../api/index'

export const NavbarContext = createContext()

const NavbarProvider = ({ children }) => {
    const [linkMedsos, setLinkMedsos] = useState([])
    const [contactNav, setContactNav] = useState([])
    const [logoWeb, setLogoWeb] = useState({})
    const [menuPage, setMenuPage] = useState([])
    const [users, setUsers] = useState({})
    const [pathActiveMenuNav, setPathActiveMenuNav] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(true)

    const idUser = Cookies.get('idUser')

    function setAllAPI() {
        API.APIGetNavbar()
            .then(res => {
                const respons = res.data
                const getLinkMedsos = respons.filter((e) => e.id === "link-medsos")
                const getContact = respons.filter((e) => e.id === "contact")
                const getLogoWeb = respons.filter((e) => e.id === "logo-web")
                const getMenuPage = respons.filter((e) => e.id === "menu-page")

                setLinkMedsos(getLinkMedsos)
                setContactNav(getContact)
                setLogoWeb(getLogoWeb[0])
                setMenuPage(getMenuPage)
            })
            .catch(err => console.log(err))

        API.APIGetUsers()
            .then(res => {
                const respons = res.data
                const checkUser = respons.filter(e => e.id === idUser)
                if (checkUser.length > 0) {
                    setUsers(checkUser[0])
                    Cookies.set('idUser', `${checkUser[0].id}`)
                    setLoadingProfile(false)
                } else {
                    setUsers({})
                    setLoadingProfile(false)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
    }, [])

    return (
        <NavbarContext.Provider value={[linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav, loadingProfile]}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider