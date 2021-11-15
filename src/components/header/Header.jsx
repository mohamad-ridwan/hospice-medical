import React from 'react';
import { useHistory } from 'react-router';
import './Header.scss';

function Header({title, page1, img, displayIcon2, page2, displayIcon3, clickPage2}){

    const history = useHistory()

    return(
        <>
        <div className="wrapp-header">
            <img src={img} alt="" className="img-header" />

            <p className="title-header">
                {title}
            </p>

            <ul>
                <li className="link-page-header" onClick={()=>history.push('/')}>
                    Home

                    <i className="fas fa-long-arrow-alt-right"></i>
                </li>
                <li className="link-page-header" onClick={clickPage2}>
                    {page1}

                    <i className="fas fa-long-arrow-alt-right" style={{
                    display: displayIcon2
                    }}></i>
                </li>
                <li className="link-page-header">
                    {page2}

                    <i className="fas fa-long-arrow-alt-right" style={{
                    display: displayIcon3
                    }}></i>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header;