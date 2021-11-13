import React from 'react';
import Slider from 'react-slick'
import endpoint from '../../services/api/endpoint';
import './CarouselCard.scss'

function CarouselCard({data}){

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const carousel = document.getElementsByClassName('content-carousel-card')

    setTimeout(() => {
        if(carousel.length > 0){
            for(let i = 0; i < carousel.length; i++){
                carousel[i].style.display = 'flex'
            }
        }
    }, 50);

    return(
        <>
        <div className="wrapp-carousel">
            <Slider {...settings}>
            {data && data.length > 0 ? data.map((e, i)=>{
                    return(
                        <div key={i} className="content-carousel-card">
                            <img src={`${endpoint}/${e.image}`} alt="" className="img-carousel" />

                            <div className="column-txt-carousel">
                                <p className="title-carousel">
                                    {e.name}
                                </p>

                                <p className="paragraph-carousel">
                                    {e.comment}
                                </p>
                            </div>
                        </div>
                    )
                }):(
                    <div></div>
                )}
            </Slider>
        </div>
        </>
    )
}

export default CarouselCard;