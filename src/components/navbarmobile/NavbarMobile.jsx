import React from 'react'
import './NavbarMobile.scss'
import imgUser from '../../images/user.png'

function NavbarMobile({ menuPage, toPage, height, zIndex, showCollapse, onCollapseMenu, displayCollapseProfile, clickProfile }) {
    return (
        <>
            <ul className="wrapp-navbar-mobile" style={{
                height: height,
                zIndex: zIndex
            }}>
                <li className="menu-nav-mobile login-nav-mobile">
                    <div className="column-profile-nav-mobile" onClick={clickProfile}>
                        <img src={imgUser} alt="" className="img-profile-nav-mobile" />
                        <p className="name-profile-nav-mobile">
                            Login/Register
                        </p>
                    </div>

                    <ul className="collapse-nav-mobile" style={{
                        display: displayCollapseProfile ? 'flex' : 'none'
                    }}>
                        <p className="name-menu-collapse-mobile">
                            LOGIN
                        </p>
                        <p className="name-menu-collapse-mobile">
                            REGISTER
                        </p>
                    </ul>
                </li>

                {menuPage && menuPage.length > 0 ? menuPage.map((e, i) => {
                    const pageCollapse = e.menuCollapse
                    return (
                        <li key={i} className="menu-nav-mobile"
                            onClick={() => {
                                if (e.path !== 'null') {
                                    toPage(e.path)
                                }
                                if (pageCollapse.length > 0) {
                                    showCollapse()
                                }
                            }}
                        >
                            {e.name}

                            <ul className="collapse-nav-mobile" style={{
                                display: onCollapseMenu ? 'flex' : 'none',
                                marginTop: `${pageCollapse.length > 0 ? '10px' : '0'}`
                            }}>
                                {pageCollapse && pageCollapse.length > 0 ? pageCollapse.map((e, i) => {
                                    return (
                                        <li key={i} className="name-menu-collapse-mobile"
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
        </>
    )
}

export default NavbarMobile