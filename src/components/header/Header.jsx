import React from 'react';
import './Header.scss';

function Header({title, page1, img, displayIcon2, page2, displayIcon3}){
    return(
        <>
        <div className="wrapp-header" style={{
            backgroundImage: `url(${img})`
        }}>
            <p className="title-header">
                {title}
            </p>

            <ul>
                <li className="link-page-header">
                    Home

                    <i className="fas fa-long-arrow-alt-right"></i>
                </li>
                <li className="link-page-header">
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