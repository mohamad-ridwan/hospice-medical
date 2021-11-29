import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { useHistory } from 'react-router';
import { NavbarContext } from '../../services/context/NavbarContext';
import endpoint from '../../services/api/endpoint';
import { BlogContext } from '../../services/context/BlogContext';
import imgUser from '../../images/user.png'
import NavbarMobile from '../navbarmobile/NavbarMobile';

function Navbar() {
    const [filterBlog, selectBlogCategory, routeLoginFromComment, setRouteLoginFromComment] = useContext(BlogContext)
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers] = useContext(NavbarContext)
    const [onOverProfile, setOnOverProfile] = useState(false)
    const [positionLogin, setPositionLogin] = useState('0px')
    const [onCollapseNavMobile, setOnCollapseNavMobile] = useState(false)
    const [heightCollapseNavMobile, setHeightCollapseNavMobile] = useState('0px')
    const [onCollapseMenu, setOnCollapseMenu] = useState(false)
    const [onCollapseProfile, setOnCollapseProfile] = useState(false)

    const history = useHistory();

    const navContact = document.getElementsByClassName('nav-contact')
    const navPage = document.getElementsByClassName('nav-page')
    const navMobile = document.getElementsByClassName('wrapp-navbar-mobile')

    window.addEventListener('scroll', () => {
        const scrollPosition = Math.floor(window.pageYOffset)
        if (navPage.length !== 0) {
            const heightNavContact = Math.floor(navContact[0].getBoundingClientRect().height)
            const heightNavPage = Math.floor(navPage[0].getBoundingClientRect().height)
            const count = heightNavContact + heightNavPage + 20

            if (scrollPosition < count) {
                // nav contact
                navContact[0].style.marginTop = '0'

                // nav page
                navPage[0].style.boxShadow = 'none'
                navPage[0].style.marginTop = '45px'
                navMobile[0].style.marginTop = '125px'
                navMobile[0].style.boxShadow = 'none'
            } else if (scrollPosition > count) {
                // nav contact
                navContact[0].style.marginTop = '-45px'

                // nav page
                navPage[0].style.marginTop = '0'
                navPage[0].style.boxShadow = '0 1px 10px -1px rgba(0,0,0,0.2)'
                navMobile[0].style.marginTop = '80px'
                navMobile[0].style.boxShadow = '0 8px 8px -1px rgba(0,0,0,0.1)'
            }
        }
    })

    function toMedsos(path) {
        window.open(path)
    }

    async function toPage(path) {
        const locationBlog = window.location.pathname === "/blog"

        history.push(path)
        setRouteLoginFromComment(null)

        if (locationBlog === false) {
            if (filterBlog.length > 0) {
                const getActiveListPostCtg = document.getElementsByClassName(filterBlog)
                if (getActiveListPostCtg.length > 0) {
                    getActiveListPostCtg[0].style.color = "#777"
                    getActiveListPostCtg[0].style.borderBottom = "2px dotted #eee"
                }
                selectBlogCategory('')
            }
        }

        setOnCollapseNavMobile(false)
        setOnCollapseMenu(false)
        setOnCollapseProfile(false)
        setHeightCollapseNavMobile('0px')

        await window.scrollTo(0, 0)
    }

    function changePositionPageCollapse(index) {
        const scrollPosition = Math.floor(window.pageYOffset)
        const heightNavContact = Math.floor(navContact[0].getBoundingClientRect().height)
        const heightNavPage = Math.floor(navPage[0].getBoundingClientRect().height)
        const count = heightNavContact + heightNavPage

        if (scrollPosition < count) {
            elementMenuCollapse[index].style.top = '125px'
        } else if (scrollPosition > count) {
            elementMenuCollapse[index].style.top = `${heightNavPage}px`
        }
    }

    const elementMenuCollapse = document.getElementsByClassName('menu-collapse')

    function mouseOverMenuCollapse(dataCollapse, index) {
        if (dataCollapse.length > 0) {
            elementMenuCollapse[index].style.display = 'flex'

            changePositionPageCollapse(index);
        }
    }

    function mouseLeaveMenuCollapse(dataCollapse, index) {
        if (dataCollapse.length > 0) {
            elementMenuCollapse[index].style.display = 'none'

            changePositionPageCollapse(index);
        }
    }

    function changePositionProfileCollapse() {
        const scrollPosition = Math.floor(window.pageYOffset)
        const heightNavContact = Math.floor(navContact[0].getBoundingClientRect().height)
        const heightNavPage = Math.floor(navPage[0].getBoundingClientRect().height)
        const count = heightNavContact + heightNavPage

        if (scrollPosition < count) {
            setPositionLogin('125px')
        } else if (scrollPosition > count) {
            setPositionLogin(`${heightNavPage}px`)
        }
    }

    function mouseOverProfile() {
        setOnOverProfile(true)
        changePositionProfileCollapse()
    }

    function mouseLeaveProfile() {
        setOnOverProfile(false)
        changePositionProfileCollapse()
    }

    function logOut() {
        document.cookie = 'idUser='
        setUsers({})
    }

    function toShowNavCollapseMobile() {
        if (onCollapseNavMobile === false) {
            setOnCollapseNavMobile(true)
            setHeightCollapseNavMobile('270px')
        } else {
            setOnCollapseNavMobile(false)
            setOnCollapseMenu(false)
            setOnCollapseProfile(false)
            setHeightCollapseNavMobile('0px')
        }
    }

    function showCollapse() {
        setOnCollapseProfile(false)
        if (onCollapseMenu === false) {
            setOnCollapseMenu(true)
            setHeightCollapseNavMobile('365px')
        } else {
            setOnCollapseMenu(false)
            setHeightCollapseNavMobile('270px')
        }
    }

    function showProfile(){
        setOnCollapseMenu(false)
        if(onCollapseProfile === false){
            setOnCollapseProfile(true)
            setHeightCollapseNavMobile('365px')
        }else{
            setOnCollapseProfile(false)
            setHeightCollapseNavMobile('270px')
        }
    }

    return (
        <>
            <div className="wrapp-navbar">
                <div className="nav-contact">
                    <ul className="column-icon-medsos">
                        {linkMedsos && linkMedsos.length > 0 ? linkMedsos.map((e, i) => (
                            <>
                                <li key={i} className="icon-medsos" onClick={() => toMedsos(e.path)}>
                                    <i className={e.nameIcon}></i>
                                </li>
                            </>
                        )) : (
                            <div></div>
                        )}
                    </ul>

                    <ul className="column-contact">
                        {contactNav && contactNav.length > 0 ? contactNav.map((e, i) => (
                            <>
                                <li key={i} className="icon-contact">
                                    <i className={e.nameIcon}></i>
                                    <a href={e.contact.includes('@') ? `mailto:${e.contact}` : `tel:${e.contact}`} className="contact">{e.contact}</a>
                                </li>
                            </>
                        )) : (
                            <div></div>
                        )}
                    </ul>
                </div>

                <div className="nav-page">
                    <img src={logoWeb && Object.keys(logoWeb).length !== 0 ? `${endpoint}/${logoWeb.image}` : ''} alt="" className="logo-web" onClick={() => toPage('/')} />

                    <div className="column-kanan-navbar">
                        <ul className="menu-page-navbar">
                            {menuPage && menuPage.length > 0 ? menuPage.map((e, i) => {
                                const pageCollapse = e.menuCollapse

                                return (
                                    <>
                                        <li key={i} className="page-navbar" onClick={() => {
                                            if (e.path !== "null") {
                                                toPage(e.path)
                                            }
                                        }}
                                            onMouseOver={() => mouseOverMenuCollapse(e.menuCollapse, i)}
                                            onMouseLeave={() => mouseLeaveMenuCollapse(e.menuCollapse, i)}
                                        >
                                            {e.name}

                                            <ul className="menu-collapse">
                                                {pageCollapse && pageCollapse.length > 0 ? pageCollapse.map((e, i) => {
                                                    return (
                                                        <li key={i} className="name-menu-collapse" onClick={(p) => {
                                                            p.stopPropagation()
                                                            toPage(e.path)
                                                        }}>
                                                            {e.name}
                                                        </li>
                                                    )
                                                }) : (
                                                    <div></div>
                                                )}
                                            </ul>
                                        </li>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </ul>

                        <div className="column-profile">
                            {Object.keys(users).length > 0 ? (
                                <>
                                    <div className="profile-nav"
                                        onMouseOver={mouseOverProfile}
                                        onMouseLeave={mouseLeaveProfile}
                                    >
                                        <img src={`${endpoint}/${users.image}`} alt="" className="img-profile" />
                                        <p className="name-profile">
                                            {users.name.substr(0, 10) + '...'}
                                        </p>

                                        <div className="profile-collapse" style={{
                                            display: onOverProfile ? 'flex' : 'none',
                                            top: positionLogin
                                        }}>
                                            <li className="menu-register"
                                                onClick={logOut}
                                            >
                                                LOG OUT
                                            </li>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="profile-nav"
                                        onMouseOver={mouseOverProfile}
                                        onMouseLeave={mouseLeaveProfile}
                                    >
                                        <img src={imgUser} alt="" className="img-profile" />
                                        <p className="name-profile">
                                            Login/Register
                                        </p>

                                        <div className="profile-collapse" style={{
                                            display: onOverProfile ? 'flex' : 'none',
                                            top: positionLogin
                                        }}>
                                            <li className="menu-register"
                                                onClick={() => toPage('/login')}
                                            >
                                                LOGIN
                                            </li>
                                            <li className="menu-register"
                                                onClick={() => toPage('/register')}
                                            >
                                                REGISTER
                                            </li>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <i className="fas fa-bars btn-collapse-nav"
                        onClick={toShowNavCollapseMobile}
                    ></i>
                </div>

                <NavbarMobile
                    menuPage={menuPage}
                    height={heightCollapseNavMobile}
                    toPage={(path) => toPage(path)}
                    showCollapse={showCollapse}
                    onCollapseMenu={onCollapseMenu}
                    displayCollapseProfile={onCollapseProfile}
                    clickProfile={showProfile}
                    users={users}
                    logOut={logOut}
                    login={()=>toPage('/login')}
                    register={()=>toPage('/register')}
                />
            </div>
        </>
    )
}

export default Navbar;