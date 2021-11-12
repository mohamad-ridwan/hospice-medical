import React, {useState, useEffect} from 'react';
import './Doctors.scss';
import img from '../../images/banner-home.jpg'
import Header from '../../components/header/Header';
import categorySatu from '../../images/category-satu.jpg';
import categoryDua from '../../images/category-dua.jpg';
import categoryTiga from '../../images/category-tiga.jpg';
import Card from '../../components/card/Card';

function Doctors(){

    const [imgDoctors, setImgDoctors] = useState([
        {
            img: categorySatu,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categoryDua,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categoryTiga,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categorySatu,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categoryDua,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categoryTiga,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categoryTiga,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
        {
            img: categoryTiga,
            title: 'Andy Florence',
            paragraph: 'inappropriate behavior'
        },
    ])
    const [idxHover, setIdxHover] = useState(null)

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    function mouseOver(i){
        setIdxHover(i)
    }

    function mouseLeave(){
        setIdxHover(null)
    }

    return(
        <>
        <div className="wrapp-doctors">
            <div className="container-header">
                <Header
                    title="Consultants"
                    img={img}
                    displayIcon2="none"
                    page1="Consultants"
                    displayIcon3="none"
                />
            </div>

            <div className="offered-services-doctors">
                <p className="title-services-doctors">
                    Our Offered Services
                </p>
                <p className="paragraph-services-doctors">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-card-services-doctors">
                    {imgDoctors.map((e, i)=>{
                        return(
                            <div className="card-services-doctors">
                                <Card 
                                    img={e.img}
                                    titleImgHover={e.title}
                                    paragraphHoverImg={e.paragraph}
                                    displayTitleHoverImg="flex"
                                    displayParagraphoverImg="flex"
                                    fontSizeTitleHoverImg="16px"
                                    paddingTitleHoverImg="0"
                                    fontWeightTitleHoverImg="bold"
                                    opacityHoverImg={i == idxHover ? '1' : '0'}
                                    cursorImg="default"
                                    bgColorHoverImg="#3fade4d5"
                                    paddingHoverImg="20px"
                                    displayListMedsos="flex"
                                    borderTitleHoverImg="none"
                                    positionTitleHoverImg="absolute"
                                    bottomTitleHoverImg="75px"
                                    positionParagraphHoverImg="absolute"
                                    bottomParagraphHoverImg="40px"
                                    mouseOver={()=>mouseOver(i)}
                                    mouseLeave={mouseLeave}
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

export default Doctors;