import React from 'react';
import './Card.scss';

function Card({img, titleImgHover, displayContentCard, displayImg, title, paragraph, icon, borderWrapp, shadowWrapp, paddingWrapp, bdrRadiusWrapp, mouseOver, mouseLeave, classWrapp}){
    return(
        <>
        <div className={`wrapp-card ${classWrapp}`} style={{
            border: borderWrapp,
            boxShadow: shadowWrapp,
            padding: paddingWrapp,
            borderRadius: bdrRadiusWrapp
        }}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        >
            <img src={img} alt="" className="img-card" style={{
                display: displayImg
            }}/>

            <div className="column-content-card" style={{
                display: displayContentCard
            }}>
                <i className={icon}></i>

                <p className="title-card">
                    {title}
                </p>

                <p className="paragraph-card">
                    {paragraph}
                </p>
            </div>

            <div className="hover-bg-img-black">
                <p className="title-hover-img">
                    {titleImgHover}
                </p>
            </div>
        </div>
        </>
    )
}

export default Card;