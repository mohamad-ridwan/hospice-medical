import React, {useState} from 'react';
import './Home.scss';
import bannerHome from '../../images/banner-home.jpg'
import Card from '../../components/card/Card';
import categorySatu from '../../images/category-satu.jpg';
import categoryDua from '../../images/category-dua.jpg';
import categoryTiga from '../../images/category-tiga.jpg';
import aboutMyselfImg from '../../images/about-myself.jpg'
import AboutMyself from '../../components/aboutmyself/AboutMyself';

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
            title: '$2.5 M',
            paragraph: 'Total Donation'
        },
        {
            icon: 'fas fa-book',
            title: '1465',
            paragraph: 'Total Project'
        },
        {
            icon: 'fas fa-users',
            title: '3965',
            paragraph: 'Total Volunteers'
        },
        {
            icon: 'fas fa-users',
            title: '3965',
            paragraph: 'Total Volunteers'
        }
    ])

    const eCardAboutMyself = document.getElementsByClassName('card-about-myself-home')

    function mouseOverCardAboutMyself(i){
        if(eCardAboutMyself.length > 0){
            for(let i = 0; i < eCardAboutMyself.length; i++){
                eCardAboutMyself[i].style.border = '1px solid #ddd'
                // eCardAboutMyself[i].style.boxShadow = '1px solid #ddd'
            }

            eCardAboutMyself[i].style.border = 'none'
        }
    }

    function mouseLeaveCardAboutMyself(){
        if(eCardAboutMyself.length > 0){
            for(let i = 0; i < eCardAboutMyself.length; i++){
                eCardAboutMyself[i].style.border = '1px solid #ddd'
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
        </div>
        </>
    )
}

export default Home;