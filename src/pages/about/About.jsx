import React, { useState, useEffect } from 'react';
import './About.scss';
import Header from '../../components/header/Header';
import ServicingHours from '../../components/servicinghours/ServicingHours';
import AboutMyself from '../../components/aboutmyself/AboutMyself';
import CarouselCard from '../../components/carouselcard/CarouselCard';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import Loading from '../../components/loading/Loading';

function About() {
    const [loading, setLoading] = useState(false)
    const [dataHeaders, setDataHeaders] = useState({})
    const [dataAboutMyself, setDataAboutMyself] = useState({})
    const [feedback, setFeedback] = useState({})

    function setAllAPI() {
        setLoading(true)

        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const getHeader = respons.filter((e) => e.id === "header-about")
                setDataHeaders(getHeader[0])
            })
            .catch(err => console.log(err))

        API.APIGetAboutMyself()
            .then(res => {
                const respons = res.data
                const aboutMyselfAbout = respons.filter((e) => e.id === "about-myself-about")
                setDataAboutMyself(aboutMyselfAbout[0])
            })
            .catch(err => console.log(err))

        API.APIGetFeedback()
            .then(res => {
                setFeedback(res.data[0])

                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="wrapp-about">
                <div className="container-header">
                    {Object.keys(dataHeaders).length > 0 ? (
                        <Header
                            title={dataHeaders.title}
                            img={`${endpoint}/${dataHeaders.image}`}
                            displayIcon2="none"
                            page1="About"
                            displayIcon3="none"
                        />
                    ) : (
                        <div></div>
                    )}
                </div>
                <ServicingHours />

                {Object.keys(dataAboutMyself).length > 0 ? (
                    <AboutMyself
                        img={`${endpoint}/${dataAboutMyself.image}`}
                        title={dataAboutMyself.title}
                        paragraph={dataAboutMyself.deskripsi}
                        data={dataAboutMyself && dataAboutMyself.dataBio.length > 0 ? dataAboutMyself.dataBio : []}
                        paddingTopWrapp="80px"
                    />
                ) : (
                    <div></div>
                )}

                <div className="feedback-about">
                    {Object.keys(feedback).length > 0 ? (
                        <>
                            <p className="title-feedback-about">
                                {feedback.title}
                            </p>
                            <p className="paragraph-feedback-about">
                                {feedback.deskripsi}
                            </p>

                            <CarouselCard data={feedback && feedback.data.length > 0 ? feedback.data : []} />
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

export default About;