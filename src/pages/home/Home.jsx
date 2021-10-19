import React, {useState} from 'react';
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

function Home(){

    const [imgProcedure, setImgProcedure] = useState([
        {
            title: '',
            img: categorySatu
        },
        {
            title: '',
            img: categoryDua
        },
        {
            title: '',
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

    const eCardAboutMyself = document.getElementsByClassName('card-about-myself-home')

    function mouseOverCardAboutMyself(i){
        if(eCardAboutMyself.length > 0){
            for(let i = 0; i < eCardAboutMyself.length; i++){
                eCardAboutMyself[i].style.border = '1px solid #ddd'
            }

            eCardAboutMyself[i].style.border = '1px solid #fff'
            eCardAboutMyself[i].style.boxShadow = '0px 6px 20px -1px rgba(0,0,0,0.1)'
        }
    }

    function mouseLeaveCardAboutMyself(){
        if(eCardAboutMyself.length > 0){
            for(let i = 0; i < eCardAboutMyself.length; i++){
                eCardAboutMyself[i].style.border = '1px solid #ddd'
                eCardAboutMyself[i].style.boxShadow = 'none'
            }
        }
    }

    const titleServicesHome = document.getElementsByClassName('title-services-home')

    function mouseOverCardServices(idx){
        if(titleServicesHome.length > 0){
            for(let i = 0; i < titleServicesHome.length; i++){
                titleServicesHome[i].style.color = '#000'
            }

            titleServicesHome[idx].style.color = '#3face4'
        }
    }

    function mouseLeaveCardServices(){
        if(titleServicesHome.length > 0){
            for(let i = 0; i < titleServicesHome.length; i++){
                titleServicesHome[i].style.color = '#000'
            }
        }
    }

    return(
        <>
        <div className="wrapp-home">
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
                    {imgProcedure.map((e)=>{
                        return(
                            <div className="card-procedure-home">
                                <Card 
                                img={e.img}
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
                classWrapp="card-about-myself-home"
                data={cardAboutMyself}
                mouseOver={(i)=>mouseOverCardAboutMyself(i)}
                mouseLeave={mouseLeaveCardAboutMyself}
            />

            <div className="feedback-home">
                <p className="title-feedback-home">
                    Enjoy our Client’s Feedback
                </p>
                <p className="paragraph-feedback-home">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
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
                                    classTitle="title-services-home"
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
                    {ourRecentBlogs.map((e)=>{
                        return(
                            <div className="card-recent-blogs-home">
                                <Card
                                    displayContentCard="flex"
                                    img={e.image}
                                    title={e.title}
                                    paragraph={e.paragraph}
                                    heightImg="200px"
                                    fontSizeTitle="18px"
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