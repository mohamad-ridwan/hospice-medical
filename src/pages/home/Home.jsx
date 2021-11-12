import React, {useState, useEffect, useRef} from 'react';
import './Home.scss';
import bannerHome from '../../images/banner-home.jpg'
import Card from '../../components/card/Card';
import categorySatu from '../../images/category-satu.jpg';
import categoryDua from '../../images/category-dua.jpg';
import categoryTiga from '../../images/category-tiga.jpg';
import aboutMyselfImg from '../../images/about-myself.jpg'
import AboutMyself from '../../components/aboutmyself/AboutMyself';
import ServicingHours from '../../components/servicinghours/ServicingHours';
import recentBlogs1 from '../../images/recent-blogs1.jpg';
import recentBlogs2 from '../../images/recent-blogs2.jpg';
import recentBlogs3 from '../../images/recent-blogs3.jpg';
import imgCarousel from '../../images/carousel.jpg';
import CarouselCard from '../../components/carouselcard/CarouselCard';

function Home(){

    const [imgProcedure, setImgProcedure] = useState([
        {
            title: 'EMERGENCY TREATMENT',
            img: categorySatu
        },
        {
            title: 'EMERGENCY TREATMENT',
            img: categoryDua
        },
        {
            title: 'EMERGENCY TREATMENT',
            img: categoryTiga
        }
    ])
    const [cardAboutMyself, setCardAboutMyself] = useState([
        {
            icon: 'fas fa-database',
            title: '$0.2 M',
            paragraph: 'Total Donation'
        },
        {
            icon: 'fas fa-book',
            title: '112',
            paragraph: 'Total Project'
        },
        {
            icon: 'fas fa-users',
            title: '517',
            paragraph: 'Total Volunteers'
        },
        {
            icon: 'fas fa-users',
            title: '505',
            paragraph: 'Total Volunteers'
        }
    ])
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
        }
    ])
    const [dataServicingHours, setDataServicingHours] = useState([
        {
            day: 'Monday-Friday',
            time: '08.00 am - 10.00 pm'
        },
        {
            day: 'Saturday',
            time: '08.00 am - 10.00 pm'
        },
        {
            day: 'Sunday',
            time: '08.00 am - 10.00 pm'
        }
    ])
    const [ourRecentBlogs, setOurRecentBlogs] = useState([
        {
            image: recentBlogs1,
            title: 'Portable Fashion for women',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
            date: '13th Dec',
            comments: '04'
        },
        {
            image: recentBlogs2,
            title: 'Summer ware are coming',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
            date: '13th Dec',
            comments: '04'
        },
        {
            image: recentBlogs3,
            title: 'Summer ware are coming',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
            date: '13th Dec',
            comments: '04'
        }
    ])
    const [dataCarousel, setDataCarousel] = useState([
        {
            img: imgCarousel,
            title: 'Fannie Rowe',
            paragraph: 'Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker. Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker'
        },
        {
            img: imgCarousel,
            title: 'Dono Kasino',
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but'
        },
        {
            img: imgCarousel,
            title: 'Dono Kasino',
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but'
        }
    ])
    const [hoverProcedureCtg, setHoverProcedureCtg] = useState(null)
    const [idxHoverTitleSerivices, setIdxHoverTitleServices] = useState(null)
    const [idxHoverRecentBlog, setIdxHoverRecentBlog] = useState(null)

    const contentCarousel = document.getElementsByClassName('content-carousel-card')

    function displayCarousel(){
        setTimeout(() => {
            if(contentCarousel.length > 0){
                for(let i = 0; i < contentCarousel.length; i++){
                    contentCarousel[i].style.display = 'flex'
                }
            }
        }, 0);
    }

    useEffect(()=>{
        window.scrollTo(0,0)
        displayCarousel()
    }, [])

    function mouseOverCardServices(i){
        setIdxHoverTitleServices(i)
    }

    function mouseLeaveCardServices(){
        setIdxHoverTitleServices(null)
    }
    
    function mouseOverRecentBlogs(i){
        setIdxHoverRecentBlog(i)
    }

    function mouseLeaveRecentBlogs(){
        setIdxHoverRecentBlog(null)
    }

    function mouseOverProcedureCtg(i){
        setHoverProcedureCtg(i)
    }

    function mouseLeaveProcedureCtg(){
        setHoverProcedureCtg(null)
    }

    return(
        <>
        <div className="wrapp-home" id="home">
            <div className="banner-home" style={{
                backgroundImage: `url(${bannerHome})`
            }}>
                <p className="title-banner-home">
                    We Care for Your Health Every Moment
                </p>
                <p className="paragraph-banner-home">
                    If you are looking at blank cassettes on the web, you may be very confused at the difference in price You may see some for as low as each.
                </p>
            </div>
        
            <div className="procedure-category">
                <p className="title-procedure">
                    Procedure Category
                </p>

                <p className="paragraph-procedure">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.is simply dummy text of the printing
                </p>

                <div className="container-card-procedure-home">
                    {imgProcedure.map((e, i)=>{
                        return(
                            <div className="card-procedure-home">
                                <Card 
                                img={e.img}
                                titleImgHover={e.title}
                                marginHoverImg="20px"
                                paddingHoverImg="40px"
                                fontSizeTitleHoverImg="16px"
                                displayTitleHoverImg="flex"
                                fontWeightTitleHoverImg="bold"
                                paddingTitleHoverImg="10px 0"
                                opacityHoverImg={i === hoverProcedureCtg ? '1' : '0'}
                                mouseOver={()=>mouseOverProcedureCtg(i)}
                                mouseLeave={mouseLeaveProcedureCtg}
                                cursorImg="default"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        
            <AboutMyself
                img={aboutMyselfImg}
                title="About Myself"
                paragraph="nappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach."
                data={cardAboutMyself}
            />

            <div className="feedback-home">
                <p className="title-feedback-home">
                    Enjoy our Client’s Feedback
                </p>
                <p className="paragraph-feedback-home">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <CarouselCard data={dataCarousel}/>
            </div>

            <div className="our-offered-services-home">
                <p className="title-offered-services-home">
                    Our Offered Services
                </p>
                <p className="paragraph-offered-services-home">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-card-offered-services-home">
                    {offeredServices.map((e, i)=>{
                        return(
                            <div className="card-offered-services-home">
                                <Card
                                    displayImg="none"
                                    displayContentCard="flex"
                                    icon={e.icon}
                                    title={e.title}
                                    paragraph={e.paragraph}
                                    colorTitle={i == idxHoverTitleSerivices ? '#3face4' : '#000'}
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

            <ServicingHours
            dateServicing={dataServicingHours}
            />

            <div className="our-recent-blogs-home">
                <p className="title-recent-blogs-home">
                    Our Recent Blogs
                </p>
                <p className="paragraph-recent-blogs-home">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-card-recent-blogs-home">
                    {ourRecentBlogs.map((e, i)=>{
                        return(
                            <div className="card-recent-blogs-home">
                                <Card
                                    displayContentCard="flex"
                                    displayDate="flex"
                                    img={e.image}
                                    title={e.title}
                                    paragraph={e.paragraph}
                                    cursorWrapp="pointer"
                                    heightImg="200px"
                                    fontSizeTitle="18px"
                                    date="13th Dec"
                                    totalComment="04"
                                    colorTitle={i == idxHoverRecentBlog ? '#3face4' : '#000'}
                                    transformImg={i == idxHoverRecentBlog ? 'scale(1.1)' : 'scale(1)'}
                                    mouseOver={()=>mouseOverRecentBlogs(i)}
                                    mouseLeave={mouseLeaveRecentBlogs}
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

export default Home;