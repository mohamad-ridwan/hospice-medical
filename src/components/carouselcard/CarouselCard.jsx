import React, {useEffect} from 'react';
import Slider from 'react-slick'
import './CarouselCard.scss'

function CarouselCard({data}){

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return(
        <>
        <div className="wrapp-carousel">
            <Slider {...settings}>
            {data && data.length > 0 ? data.map((e)=>{
                    return(
                        <div className="content-carousel-card">
                            <img src={e.img} alt="" className="img-carousel" />

                            <div className="column-txt-carousel">
                                <p className="title-carousel">
                                    {e.title}
                                </p>

                                <p className="paragraph-carousel">
                                    {e.paragraph}
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