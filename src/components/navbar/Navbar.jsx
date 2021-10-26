import React, {useState} from 'react';
import './Navbar.scss';
import logoWeb from '../../images/logo-web.jpg'
import { useHistory } from 'react-router';

function Navbar() {

    const [menuPage, setMenuPage] = useState([
        {
            name : 'HOME',
            path: '/'
        },
        {
            name : 'DEPARTMENTS',
            path: '/departments'
        },
        {
            name : 'DOCTORS',
            path: '/doctors'
        },
        {
            name : 'PAGES',
        },
        {
            name : 'BLOG',
        },
        {
            name : 'CONTACT',
            path: '/contact'
        }
    ])

    const history = useHistory();

    return (
        <>
            <div className="wrapp-navbar">
                <div className="nav-contact">
                    <ul className="column-icon-medsos">
                        <li className="icon-medsos">
                            <i className="fab fa-facebook-f"></i>
                        </li>
                        <li className="icon-medsos">
                            <i className="fab fa-twitter"></i>
                        </li>
                        <li className="icon-medsos">
                            <i className="fab fa-instagram"></i>
                        </li>
                    </ul>

                    <ul className="column-contact">
                        <li className="icon-contact">
                            <i className="fas fa-mobile-alt"></i>
                            081-383-959-452
                        </li>
                        <li className="icon-contact">
                            <i className="far fa-envelope"></i>
                            mr643062@gmail.com
                        </li>
                    </ul>
                </div>

                <div className="nav-page">
                    <img src={logoWeb} alt="" className="logo-web" />

                    <ul className="menu-page-navbar">
                        {menuPage.map((e)=>{
                            return(
                                <li className="page-navbar" onClick={()=>{
                                    history.push(e.path)
                                }}>
                                    {e.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar;