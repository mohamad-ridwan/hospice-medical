import React from 'react';
import './Card.scss';
import Button from '../button/Button';

function Card({ img, titleImgHover, displayContentCard, displayImg, title, paragraph, icon, borderWrapp, shadowWrapp, paddingWrapp, bdrRadiusWrapp, mouseOver, mouseLeave, fontSizeTitle, justifyContentParagraph, textAlignParagraph, justifyContentTitle, textAlignTitle, fontSizeIcon, justifyContentIcon, heightImg, date, totalComment, displayDate, cursorWrapp, marginWrapp, colorTitle, cursorTitle, nameBtn, displayBtn, marginBtn, paddingBtn, bgColorWrapp, mouseOverBtn, mouseLeaveBtn, flexDirectionWrapp, widthImg, widthWrapp, fontSizeParagraph, marginTitle, marginImg, alignItemsWrapp, cursorImg, fontWeightTitle, colorParagraph, fontWeightParagraph, cursorParagraph, displayTitleHoverImg, iconHoverImg, classHoverBgImg, displayTxtComment, comments, marginHoverImg, opacityHoverImg, paddingHoverImg, fontSizeTitleHoverImg, fontWeightTitleHoverImg, paddingTitleHoverImg, bgColorHoverImg, justifyContentHoverImg, displayListMedsos, paragraphHoverImg, displayParagraphoverImg, borderTitleHoverImg, positionTitleHoverImg, bottomTitleHoverImg,
    positionParagraphHoverImg, bottomParagraphHoverImg, widthTitleHoverImg, justifyContentTitleHoverImg, marginParagraphHoverImg, borderTopParagraphHoverImg, paddingParagraphHoverImg, transformImg, bgColorBtn, borderBtn, colorBtn, classTitle, idTitle, widthContentCard, clickWrapp, dataMedsos, clickTitle, clickBtn, clickImg, clock, bdrRadiusImg, clickParagraph, fontSizeTxtComment, colorTxtComment, marginTopTxtComment, justifyContentTxtComment, textAlignTxtComment, displayDeleteComment, clickDeleteComment }) {
    return (
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
                onClick={clickWrapp}
            >
                <div className="column-img-card" style={{
                    display: displayImg,
                    height: heightImg,
                    width: widthImg,
                    margin: marginImg,
                    cursor: cursorImg,
                    borderRadius: bdrRadiusImg
                }}
                    onClick={clickImg}
                >
                    <img src={img} alt="" className="img-card" style={{
                        transform: transformImg
                    }} />

                    <div className={`hover-bg-img-black ${classHoverBgImg}`} style={{
                        margin: marginHoverImg,
                        opacity: opacityHoverImg,
                        padding: paddingHoverImg,
                        backgroundColor: bgColorHoverImg,
                        justifyContent: justifyContentHoverImg
                    }}>
                        <ul className="column-list-medsos-doctors" style={{
                            display: displayListMedsos
                        }}>
                            {dataMedsos && dataMedsos.length > 0 ? dataMedsos.map((e, i) => {
                                return (
                                    <>
                                        <li key={i} className="list-medsos-doctors">
                                            <a target="_blank" href={e.path} className="link-medsos-doctors">
                                                <i className={e.nameIcon}></i>
                                            </a>
                                        </li>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </ul>

                        <p className="title-hover-img" style={{
                            display: displayTitleHoverImg,
                            fontSize: fontSizeTitleHoverImg,
                            fontWeight: fontWeightTitleHoverImg,
                            padding: paddingTitleHoverImg,
                            border: borderTitleHoverImg,
                            position: positionTitleHoverImg,
                            bottom: bottomTitleHoverImg,
                            width: widthTitleHoverImg,
                            justifyContent: justifyContentTitleHoverImg
                        }}>
                            {titleImgHover}
                        </p>

                        <p className="paragraph-hover-img" style={{
                            display: displayParagraphoverImg,
                            position: positionParagraphHoverImg,
                            bottom: bottomParagraphHoverImg,
                            margin: marginParagraphHoverImg,
                            borderTop: borderTopParagraphHoverImg,
                            padding: paddingParagraphHoverImg
                        }}>
                            {paragraphHoverImg}
                        </p>

                        <i className={iconHoverImg}></i>
                    </div>
                </div>

                <div className="column-content-card" style={{
                    display: displayContentCard,
                    width: widthContentCard
                }}>
                    <i className={icon} style={{
                        fontSize: fontSizeIcon,
                        justifyContent: justifyContentIcon
                    }}></i>

                    <p className={`title-card ${classTitle}`} id={idTitle} style={{
                        fontSize: fontSizeTitle,
                        justifyContent: justifyContentTitle,
                        textAlign: textAlignTitle,
                        color: colorTitle,
                        cursor: cursorTitle,
                        margin: marginTitle,
                        fontWeight: fontWeightTitle
                    }}
                        onClick={clickTitle}
                    >
                        {title}
                    </p>

                    <p className="paragraph-card" style={{
                        justifyContent: justifyContentParagraph,
                        textAlign: textAlignParagraph,
                        fontSize: fontSizeParagraph,
                        color: colorParagraph,
                        fontWeight: fontWeightParagraph,
                        cursor: cursorParagraph
                    }}
                        onClick={clickParagraph}
                    >
                        {paragraph}
                    </p>

                    <p className="comments-card" style={{
                        display: displayTxtComment,
                        fontSize: fontSizeTxtComment,
                        color: colorTxtComment,
                        marginTop: marginTopTxtComment,
                        justifyContent: justifyContentTxtComment,
                        textAlign: textAlignTxtComment
                    }}>
                        {comments}
                    </p>
                </div>

                {/* delete user comment */}
                <button className="btn-delete-comment" style={{
                    display: displayDeleteComment
                }}
                onClick={clickDeleteComment}
                >
                    <i class="fas fa-trash"></i>
                </button>

                <ul className="column-date-content-card" style={{
                    display: displayDate
                }}>
                    <li>
                        <i className="far fa-clock"></i>
                        <p className="date-content-card">
                            {clock}
                        </p>
                    </li>
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
                        color={colorBtn}
                        bgColor={bgColorBtn}
                        border={borderBtn}
                        mouseOver={mouseOverBtn}
                        mouseLeave={mouseLeaveBtn}
                        click={clickBtn}
                    />
                </div>
            </div>
        </>
    )
}

export default Card;