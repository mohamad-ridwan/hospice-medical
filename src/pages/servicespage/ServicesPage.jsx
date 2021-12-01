import React, { useState, useEffect, useContext } from 'react';
import './ServicesPage.scss';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import Loading from '../../components/loading/Loading';
import { NavbarContext } from '../../services/context/NavbarContext';

function ServicesPage() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav] = useContext(NavbarContext)
    const [loading, setLoading] = useState(false)
    const [dataHeaders, setDataHeaders] = useState({})
    const [offeredServices, setOfferedServices] = useState({})
    const [idxHover, setIdxHover] = useState(null)

    function setAllAPI() {
        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const headers = respons.filter((e) => e.id === "header-services")
                setDataHeaders(headers[0])
            })
            .catch(err => console.log(err))

        API.APIGetOurOfferedServices()
            .then(res => {
                setOfferedServices(res.data[0])
                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        setPathActiveMenuNav(3)
        window.scrollTo(0, 0)

        setTimeout(() => {
            setAllAPI()
        }, 0)
    }, [])

    function mouseOverCardServices(i) {
        setIdxHover(i)
    }

    function mouseLeaveCardServices() {
        setIdxHover(null)
    }

    return (
        <>
            <div className="wrapp-services-page">
                <div className="container-header">
                    {Object.keys(dataHeaders).length > 0 ? (
                        <Header
                            title={dataHeaders.title}
                            img={`${endpoint}/${dataHeaders.image}`}
                            displayIcon2="none"
                            page1="Services"
                            displayIcon3="none"
                        />
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="offered-services-page">
                    {Object.keys(offeredServices).length > 0 ? (
                        <>
                            <p className="title-offered-service-page">
                                {offeredServices.title}
                            </p>
                            <p className="paragraph-offered-service-page">
                                {offeredServices.deskripsi}
                            </p>

                            <div className="column-card-services-page">
                                {offeredServices && offeredServices.data ? offeredServices.data.map((e, i) => {
                                    return (
                                        <div className="card-services-page">
                                            <Card
                                                displayImg="none"
                                                displayContentCard="flex"
                                                icon={e.nameIcon}
                                                title={e.title}
                                                paragraph={e.deskripsi}
                                                colorTitle={i == idxHover ? '#3face4' : '#000'}
                                                fontSizeTitle="18px"
                                                fontSizeIcon="30px"
                                                justifyContentParagraph="center"
                                                justifyContentTitle="center"
                                                textAlignParagraph="center"
                                                textAlignTitle="center"
                                                justifyContentIcon="center"
                                                mouseOver={() => mouseOverCardServices(i)}
                                                mouseLeave={mouseLeaveCardServices}
                                            />
                                        </div>
                                    )
                                }) : (
                                    <div></div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>

                <Loading displayLoadingPage={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default ServicesPage;