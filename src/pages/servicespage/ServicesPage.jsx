import React, {useState, useEffect} from 'react';
import './ServicesPage.scss';
import Header from '../../components/header/Header';
import img from '../../images/banner-home.jpg'
import Card from '../../components/card/Card';

function ServicesPage(){

    const [offeredServices, setOfferedServices] = useState([
        {
            icon: 'fas fa-rocket',
            title: '24/7 Emergency',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },
        {
            icon: 'fas fa-heartbeat',
            title: 'Expert Consultation',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },
        {
            icon: 'fas fa-bug',
            title: 'Intensive Care',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },
        {
            icon: 'fas fa-user-friends',
            title: 'Family Planning',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },{
            icon: 'fas fa-rocket',
            title: '24/7 Emergency',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },
        {
            icon: 'fas fa-heartbeat',
            title: 'Expert Consultation',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },
        {
            icon: 'fas fa-bug',
            title: 'Intensive Care',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        },
        {
            icon: 'fas fa-user-friends',
            title: 'Family Planning',
            paragraph: 'inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct women face higher conduct.'
        }
    ])
    const [idxHover, setIdxHover] = useState(null)

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    function mouseOverCardServices(i){
        setIdxHover(i)
    }

    function mouseLeaveCardServices(){
        setIdxHover(null)
    }

    return(
        <>
        <div className="wrapp-services-page">
            <div className="container-header">
                <Header
                    title="Offered Services"
                    img={img}
                    displayIcon2="none"
                    page1="Services"
                    displayIcon3="none"
                />
            </div>

            <div className="offered-services-page">
                <p className="title-offered-service-page">
                    Our Offered Services
                </p>
                <p className="paragraph-offered-service-page">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-card-services-page">
                    {offeredServices.map((e, i)=>{
                        return(
                            <div className="card-services-page">
                                <Card
                                    displayImg="none"
                                    displayContentCard="flex"
                                    icon={e.icon}
                                    title={e.title}
                                    paragraph={e.paragraph}
                                    colorTitle={i == idxHover ? '#3face4' : '#000'}
                                    fontSizeTitle="18px"
                                    fontSizeIcon="30px"
                                    justifyContentParagraph="center"
                                    justifyContentTitle="center"
                                    textAlignParagraph="center"
                                    textAlignTitle="center"
                                    justifyContentIcon="center"
                                    mouseOver={()=>mouseOverCardServices(i)}
                                    mouseLeave={mouseLeaveCardServices}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default ServicesPage;