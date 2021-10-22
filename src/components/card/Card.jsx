import React from 'react';
import './Card.scss';

function Card({img, titleImgHover, displayContentCard, displayImg, title, paragraph, icon, borderWrapp, shadowWrapp, paddingWrapp, bdrRadiusWrapp, mouseOver, mouseLeave, fontSizeTitle, justifyContentParagraph, textAlignParagraph, justifyContentTitle, textAlignTitle, fontSizeIcon, justifyContentIcon, classTitle, heightImg, date, totalComment, displayDate, cursorWrapp, classImg, marginWrapp}){
    return(
        <>
        <div className={`wrapp-card`} style={{
            border: borderWrapp,
            boxShadow: shadowWrapp,
            padding: paddingWrapp,
            borderRadius: bdrRadiusWrapp,
            cursor: cursorWrapp,
            margin: marginWrapp
        }}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        >
            <div className="column-img-card" style={{
                    display: displayImg,
                    height: heightImg
                }}>
                <img src={img} alt="" className={`img-card ${classImg}`}/>
            </div>
            
            <div className="column-content-card" style={{
                display: displayContentCard
            }}>
                <i className={icon} style={{
                    fontSize: fontSizeIcon,
                    justifyContent: justifyContentIcon
                }}></i>

                <p className={`title-card ${classTitle}`} style={{
                    fontSize: fontSizeTitle,
                    justifyContent: justifyContentTitle,
                    textAlign: textAlignTitle
                }}>
                    {title}
                </p>

                <p className="paragraph-card" style={{
                    justifyContent: justifyContentParagraph,
                    textAlign: textAlignParagraph
                }}>
                    {paragraph}
                </p>
            </div>

            <ul className="column-date-content-card" style={{
                display: displayDate
            }}>
                <li>
                        <i className="far fa-calendar-alt">
                        
                        </i>
                        <p className="date-content-card">
                            {date}
                        </p>
                    </li>
                    <li>
                        <i className="far fa-comment">
                        
                        </i>
                        <p className="date-content-card">
                            {totalComment}
                        </p>
                    </li>
            </ul>

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