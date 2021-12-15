import React, { useState, useEffect, useContext } from 'react';
import './Home.scss';
import Card from '../../components/card/Card';
import AboutMyself from '../../components/aboutmyself/AboutMyself';
import ServicingHours from '../../components/servicinghours/ServicingHours';
import CarouselCard from '../../components/carouselcard/CarouselCard';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import { useHistory } from 'react-router';
import Loading from '../../components/loading/Loading';
import { NavbarContext } from '../../services/context/NavbarContext';

function Home() {
    const [linkMedsos, contactNav, logoWeb, menuPage, users, setUsers, pathActiveMenuNav, setPathActiveMenuNav] = useContext(NavbarContext)
    const [loading, setLoading] = useState(false)
    const [bannerHome, setBannerHome] = useState({})
    const [dataProcedureCategory, setDataProcedureCategory] = useState({})
    const [imgProcedure, setImgProcedure] = useState([])
    const [aboutMyself, setAboutMyself] = useState({})
    const [feedback, setFeedback] = useState({})
    const [ourOfferedServices, setOurOfferedServices] = useState({})
    const [cardOurOfferedServices, setCardOurOfferedServices] = useState([])
    const [ourRecentBlogs, setOurRecentBlogs] = useState({})
    const [contentRecentBlogs, setContentRecentBlog] = useState([])
    const [hoverProcedureCtg, setHoverProcedureCtg] = useState(null)
    const [idxHoverTitleSerivices, setIdxHoverTitleServices] = useState(null)
    const [idxHoverRecentBlog, setIdxHoverRecentBlog] = useState(null)

    function setAllAPI() {
        API.APIGetHeaderPage()
            .then(res => {
                const respons = res.data
                const headerHome = respons.filter((e) => e.id === "header-home")
                setBannerHome(headerHome[0])
            })
            .catch(err => console.log(err))

        API.APIGetProcedureCategory()
            .then(res => {
                const respons = res.data
                setDataProcedureCategory(respons[0])

                const getDataImg = respons[0].dataImg.filter((e, i) => i < 3)
                setImgProcedure(getDataImg)
            })
            .catch(err => console.log(err))

        API.APIGetAboutMyself()
            .then(res => {
                const respons = res.data
                const aboutMyselfHome = respons.filter((e) => e.id === "about-myself-home")
                setAboutMyself(aboutMyselfHome[0])
            })
            .catch(err => console.log(err))

        API.APIGetFeedback()
            .then(res => {
                setFeedback(res.data[0])
            })
            .catch(err => console.log(err))

        API.APIGetOurOfferedServices()
            .then(res => {
                const respons = res.data[0]

                const getFourItems = respons.data.length > 0 ? respons.data.filter((e, i) => i < 4) : []
                setOurOfferedServices(respons)
                setCardOurOfferedServices(getFourItems)
            })
            .catch(err => console.log(err))

        API.APIGetBlogs()
            .then(res => {
                const respons = res.data

                const getBlogsHome = respons.filter((e) => e.id === "our-recent-blogs")
                const getThreeItems = getBlogsHome[0].data.filter((e, i) => i < 3)
                setOurRecentBlogs(getBlogsHome[0])
                setContentRecentBlog(getThreeItems)

                setTimeout(() => {
                    setLoading(false)
                }, 10);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        setPathActiveMenuNav(0)
        window.scrollTo(0, 0)

        setTimeout(() => {
            setAllAPI()
        }, 0)
    }, [])

    function RenderParagraph({ paragraph }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: paragraph.length > 150 ? paragraph.substr(0, 150) + '...' : paragraph }}></p>
        )
    }

    function mouseOverCardServices(i) {
        setIdxHoverTitleServices(i)
    }

    function mouseLeaveCardServices() {
        setIdxHoverTitleServices(null)
    }

    function mouseOverRecentBlogs(i) {
        setIdxHoverRecentBlog(i)
    }

    function mouseLeaveRecentBlogs() {
        setIdxHoverRecentBlog(null)
    }

    function mouseOverProcedureCtg(i) {
        setHoverProcedureCtg(i)
    }

    function mouseLeaveProcedureCtg() {
        setHoverProcedureCtg(null)
    }

    const history = useHistory()

    function toPage(path) {
        history.push(path)
    }

    return (
        <>
            <div className="wrapp-home" id="home">
                <div className="banner-home">
                    {Object.keys(bannerHome).length > 0 ? (
                        <>
                            <p className="title-banner-home">
                                {bannerHome.title}
                            </p>
                            <p className="paragraph-banner-home">
                                {bannerHome.deskripsi}
                            </p>

                            <img src={`${endpoint}/${bannerHome.image}`} alt="" className="img-banner-home" />
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="procedure-category">
                    {Object.keys(dataProcedureCategory).length > 0 ? (
                        <>
                            <p className="title-procedure">
                                {dataProcedureCategory.title}
                            </p>

                            <p className="paragraph-procedure">
                                {dataProcedureCategory.deskripsi}
                            </p>

                            <div className="container-card-procedure-home">
                                {imgProcedure.length > 0 ? imgProcedure.map((e, i) => {
                                    return (
                                        <div key={i} className="card-procedure-home">
                                            <Card
                                                img={`${endpoint}/${e.image}`}
                                                titleImgHover={e.title}
                                                marginHoverImg="20px"
                                                paddingHoverImg="40px"
                                                fontSizeTitleHoverImg="16px"
                                                displayTitleHoverImg="flex"
                                                fontWeightTitleHoverImg="bold"
                                                paddingTitleHoverImg="10px 0"
                                                opacityHoverImg={i === hoverProcedureCtg ? '1' : '0'}
                                                mouseOver={() => mouseOverProcedureCtg(i)}
                                                mouseLeave={mouseLeaveProcedureCtg}
                                                cursorImg="default"
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

                {Object.keys(aboutMyself).length > 0 ? (
                    <AboutMyself
                        img={`${endpoint}/${aboutMyself.image}`}
                        title={aboutMyself.title}
                        paragraph={aboutMyself.deskripsi}
                        data={aboutMyself.dataBio}
                    />
                ) : (
                    <div></div>
                )}

                <div className="feedback-home">
                    {Object.keys(feedback).length > 0 ? (
                        <>
                            <p className="title-feedback-home">
                                {feedback.title}
                            </p>
                            <p className="paragraph-feedback-home">
                                {feedback.deskripsi}
                            </p>

                            <CarouselCard data={feedback.data} />
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="our-offered-services-home">
                    {Object.keys(ourOfferedServices).length > 0 ? (
                        <>
                            <p className="title-offered-services-home">
                                {ourOfferedServices.title}
                            </p>
                            <p className="paragraph-offered-services-home">
                                {ourOfferedServices.deskripsi}
                            </p>

                            <div className="column-card-offered-services-home">
                                {cardOurOfferedServices.map((e, i) => {
                                    return (
                                        <div key={i} className="card-offered-services-home">
                                            <Card
                                                displayImg="none"
                                                displayContentCard="flex"
                                                icon={e.nameIcon}
                                                title={e.title}
                                                paragraph={e.deskripsi}
                                                colorTitle={i == idxHoverTitleSerivices ? '#3face4' : '#000'}
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
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>

                <ServicingHours />

                <div className="our-recent-blogs-home">
                    {Object.keys(ourRecentBlogs).length > 0 ? (
                        <>
                            <p className="title-recent-blogs-home">
                                {ourRecentBlogs.title}
                            </p>
                            <p className="paragraph-recent-blogs-home">
                                {ourRecentBlogs.deskripsi}
                            </p>

                            <div className="column-card-recent-blogs-home">
                                {contentRecentBlogs && contentRecentBlogs.length > 0 ? contentRecentBlogs.map((e, i) => {
                                    return (
                                        <div className="card-recent-blogs-home" key={i}>
                                            <Card
                                                displayContentCard="flex"
                                                displayDate="flex"
                                                img={`${endpoint}/${e.image}`}
                                                title={e.title}
                                                paragraph={<RenderParagraph paragraph={e.paragraphSatu} />}
                                                cursorWrapp="pointer"
                                                heightImg="250px"
                                                fontSizeTitle="18px"
                                                clock={e.clock}
                                                date={e.date}
                                                totalComment={e.comments.length}
                                                colorTitle={i == idxHoverRecentBlog ? '#3face4' : '#000'}
                                                transformImg={i == idxHoverRecentBlog ? 'scale(1.1)' : 'scale(1)'}
                                                mouseOver={() => mouseOverRecentBlogs(i)}
                                                mouseLeave={mouseLeaveRecentBlogs}
                                                clickWrapp={() => toPage(`blog/blog-details/${e.path}`)}
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

                <Loading
                    displayLoadingPage={loading ? 'flex' : 'none'}
                />
            </div>
        </>
    )
}

export default Home;