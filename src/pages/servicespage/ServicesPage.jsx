import React from 'react';
import './ServicesPage.scss';
import Header from '../../components/header/Header';
import img from '../../images/banner-home.jpg'

function ServicesPage(){
    return(
        <>
        <div className="wrapp-services-page">
            <div className="container-header">
                <Header
                    title="Offered Services"
                    img={img}
                    displayIcon2="none"
                    page1="Services"
                />
            </div>
        </div>
        </>
    )
}

export default ServicesPage;