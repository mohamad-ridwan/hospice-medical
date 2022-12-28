import React from 'react'
import { useHistory } from 'react-router';
import './NavbarMobile.scss'
import imgUser from '../../images/user.png'

function NavbarMobile({ menuPage, toPage, height, zIndex, showCollapse, onCollapseMenu, displayCollapseProfile, clickProfile, users, logOut, login, register, activePathNavMobile, pathActiveNav, mouseOver, mouseLeave }) {

    const history = useHistory()

    return (
        <>
            <div className="wrapp-navbar-mobile" style={{
                maxHeight: height,
                zIndex: zIndex
            }}>
                <ul className="column-navbar-mobile">
                    {users && Object.keys(users).length > 0 ? (
                        <li className="login-nav-mobile">
                            <div className="column-profile-nav-mobile" onClick={clickProfile}>
                                <img src={users.image} alt="" className="img-profile-nav-mobile" />
                                <p className="name-profile-nav-mobile">
                                    {users.name}
                                </p>
                            </div>

                            <ul className="collapse-nav-mobile" style={{
                                display: displayCollapseProfile ? 'flex' : 'none',
                                marginTop: '10px'
                            }}>
                                <p className="name-menu-collapse-mobile"
                                onClick={logOut}
                                >
                                    LOG OUT
                                </p>
                            </ul>
                        </li>
                    ):(
                        <li className="login-nav-mobile">
                            <div className="column-profile-nav-mobile" onClick={clickProfile}>
                                <img src={imgUser} alt="" className="img-profile-nav-mobile" />
                                <p className="name-profile-nav-mobile">
                                    Login
                                </p>
                            </div>

                            <ul className="collapse-nav-mobile" style={{
                                display: displayCollapseProfile ? 'flex' : 'none',
                                marginTop: '10px'
                            }}>
                                <p className={`name-menu-collapse-mobile ${history && history.location.pathname === '/login' ? 'name-menu-collapse-mobile-active' : ''}`} onClick={login}>
                                    LOGIN
                                </p>
                                <p className={`name-menu-collapse-mobile ${history && history.location.pathname === '/register' ? 'name-menu-collapse-mobile-active' : ''}`} onClick={register}>
                                    REGISTER
                                </p>
                            </ul>
                        </li>
                    )}

                    {menuPage && menuPage.length > 0 ? menuPage.map((e, i) => {
                        const pageCollapse = e.menuCollapse
                        return (
                            <li key={i} className="menu-nav-mobile" style={{
                                color: pathActiveNav === i ? '#3face4' : '#000'
                            }}
                                onClick={() => {
                                    if (e.path !== 'null') {
                                        toPage(e.path)
                                        activePathNavMobile(i)
                                    }
                                    if (pageCollapse.length > 0) {
                                        showCollapse()
                                    }
                                }}
                                onMouseOver={()=>mouseOver(i)}
                                onMouseLeave={()=>mouseLeave()}
                            >
                                {e.name}

                                <ul className="collapse-nav-mobile" style={{
                                    display: onCollapseMenu ? 'flex' : 'none',
                                    marginTop: `${pageCollapse.length > 0 ? '10px' : '0'}`
                                }}>
                                    {pageCollapse && pageCollapse.length > 0 ? pageCollapse.map((e, i) => {
                                        return (
                                            <li key={i} className="name-menu-collapse-mobile" style={{
                                                borderBottom: i === 0 ? '1px solid #eee' : 'none'
                                            }}
                                                onClick={(p) => {
                                                    p.stopPropagation()
                                                    toPage(e.path)
                                                }}
                                            >
                                                {e.name}
                                            </li>
                                        )
                                    }) : (
                                        <div></div>
                                    )}
                                </ul>
                            </li>
                        )
                    }) : (
                        <div></div>
                    )}
                </ul>
            </div>
        </>
    )
}

export default NavbarMobile