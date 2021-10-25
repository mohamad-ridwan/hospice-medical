import React from 'react';
import Card from '../card/Card';
import './AboutMyself.scss';

function AboutMyself({img, title, paragraph, data, mouseOver, mouseLeave, classWrapp, paddingTopWrapp}){
    return(
        <>
        <div className="about-myself-home" style={{
            paddingTop: paddingTopWrapp
        }}>
                <img src={img} alt="" className="img-about-myself-home"/>

                <div className="kanan-about-myself-home">
                    <p className="title-about-myself-home">
                        {title}
                    </p>
                    <p className="paragraph-about-myself-home">
                        {paragraph}
                    </p>

                    <div className="column-card-about-myself">
                        {data && data.length > 0 ? data.map((e, i)=>{
                            return(
                                <div className={`card-about-myself ${classWrapp}`}>
                                    <Card
                                    displayImg="none"
                                    displayContentCard="flex"
                                    icon={e.icon}
                                    title={e.title}
                                    paragraph={e.paragraph}
                                    paddingWrapp="20px"
                                    mouseOver={()=>mouseOver(i)}
                                    mouseLeave={mouseLeave}
                                    colorTitle="#000"
                                    />
                                </div>
                                )
                            }):(
                                <div></div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutMyself;