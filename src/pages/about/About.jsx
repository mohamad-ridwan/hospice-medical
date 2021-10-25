import React, {useState} from 'react';
import './About.scss';
import img from '../../images/banner-home.jpg'
import aboutMyselfImg from '../../images/about-myself.jpg'
import Header from '../../components/header/Header';
import ServicingHours from '../../components/servicinghours/ServicingHours';
import AboutMyself from '../../components/aboutmyself/AboutMyself';

function About(){

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

    const eCardAboutMyself = document.getElementsByClassName('card-about-myself-about')

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

    return(
        <>
        <div className="wrapp-about">
            <div className="container-header">
                <Header
                    title="About Us"
                    img={img}
                    displayIcon2="none"
                    page1="About"
                    displayIcon3="none"
                />
            </div>
            <ServicingHours
                dateServicing={dataServicingHours}
            />

            <AboutMyself
                img={aboutMyselfImg}
                title="About Myself"
                paragraph="nappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach."
                classWrapp="card-about-myself-about"
                data={cardAboutMyself}
                paddingTopWrapp="80px"
                mouseOver={(i)=>mouseOverCardAboutMyself(i)}
                mouseLeave={mouseLeaveCardAboutMyself}
            />

            <div className="feedback-about">
                <p className="title-feedback-about">
                    Enjoy our Client’s Feedback
                </p>
                <p className="paragraph-feedback-about">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-carousel-feedback-about">
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default About;