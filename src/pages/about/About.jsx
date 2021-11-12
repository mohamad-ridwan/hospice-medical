import React, {useState, useEffect} from 'react';
import './About.scss';
import img from '../../images/banner-home.jpg'
import imgCarousel from '../../images/carousel.jpg';
import aboutMyselfImg from '../../images/about-myself.jpg'
import Header from '../../components/header/Header';
import ServicingHours from '../../components/servicinghours/ServicingHours';
import AboutMyself from '../../components/aboutmyself/AboutMyself';
import CarouselCard from '../../components/carouselcard/CarouselCard';

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
                data={cardAboutMyself}
                paddingTopWrapp="80px"
            />

            <div className="feedback-about">
                <p className="title-feedback-about">
                    Enjoy our Client’s Feedback
                </p>
                <p className="paragraph-feedback-about">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <CarouselCard data={dataCarousel}/>
            </div>
        </div>
        </>
    )
}

export default About;