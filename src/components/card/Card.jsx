import React from 'react';
import './Card.scss';
import Button from '../button/Button';

function Card({img, titleImgHover, displayContentCard, displayImg, title, paragraph, icon, borderWrapp, shadowWrapp, paddingWrapp, bdrRadiusWrapp, mouseOver, mouseLeave, fontSizeTitle, justifyContentParagraph, textAlignParagraph, justifyContentTitle, textAlignTitle, fontSizeIcon, justifyContentIcon, classTitle, heightImg, date, totalComment, displayDate, cursorWrapp, classImg, marginWrapp, colorTitle, cursorTitle, nameBtn, displayBtn, marginBtn, paddingBtn, bgColorWrapp, mouseOverBtn, mouseLeaveBtn, classBtn, flexDirectionWrapp, widthImg, widthWrapp, fontSizeParagraph, marginTitle, marginImg, alignItemsWrapp, cursorImg, fontWeightTitle, colorParagraph, fontWeightParagraph, cursorParagraph, displayTitleHoverImg, iconHoverImg, classHoverBgImg, displayTxtComment, comments}){
    return(
        <>
        <div className={`wrapp-card`} style={{
            border: borderWrapp,
            boxShadow: shadowWrapp,
            padding: paddingWrapp,
            borderRadius: bdrRadiusWrapp,
            cursor: cursorWrapp,
            margin: marginWrapp,
            backgroundColor: bgColorWrapp,
            flexDirection: flexDirectionWrapp,
            width: widthWrapp,
            alignItems: alignItemsWrapp
        }}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        >
            <div className="column-img-card" style={{
                    display: displayImg,
                    height: heightImg,
                    width: widthImg,
                    margin: marginImg,
                    cursor: cursorImg
                }}>
                <img src={img} alt="" className={`img-card ${classImg}`}/>

                <div className={`hover-bg-img-black ${classHoverBgImg}`}>
                    <p className="title-hover-img" style={{
                        display: displayTitleHoverImg
                    }}>
                        {titleImgHover}
                    </p>

                    <i className={iconHoverImg}></i>
                </div>
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
                    textAlign: textAlignTitle,
                    color: colorTitle,
                    cursor: cursorTitle,
                    margin: marginTitle,
                    fontWeight: fontWeightTitle
                }}>
                    {title}
                </p>

                <p className="paragraph-card" style={{
                    justifyContent: justifyContentParagraph,
                    textAlign: textAlignParagraph,
                    fontSize: fontSizeParagraph,
                    color: colorParagraph,
                    fontWeight: fontWeightParagraph,
                    cursor: cursorParagraph
                }}>
                    {paragraph}
                </p>

                <p className="comments-card" style={{
                    display: displayTxtComment
                }}>
                    {comments}
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
            
            <div className="column-btn-submit-card" style={{
                display: displayBtn,
                margin: marginBtn
            }}>
                <Button
                padding={paddingBtn}
                nameBtn={nameBtn}
                color="#000"
                bgColor="transparent"
                border="1px solid #eee"
                mouseOver={mouseOverBtn}
                mouseLeave={mouseLeaveBtn}
                classBtn={classBtn}
                />
            </div>
        </div>
        </>
    )
}

export default Card;