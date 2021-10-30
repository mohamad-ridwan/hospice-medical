import React, {useState} from 'react';
import Card from '../card/Card';
import './AboutMyself.scss';

function AboutMyself({img, title, paragraph, data, paddingTopWrapp}){

    const [idxHover, setIdxHover] = useState(null)

    function mouseOverCard(i){
        setIdxHover(i)
    }

    function mouseLeaveCard(){
        setIdxHover(null)
    }

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
                                <div className="card-about-myself" style={{
                                    border: i == idxHover ? '1px solid #fff' : '1px solid #ddd',
                                    boxShadow: i == idxHover ? '0px 6px 20px -1px rgba(0,0,0,0.1)' : 'none'
                                }}>
                                    <Card
                                    displayImg="none"
                                    displayContentCard="flex"
                                    icon={e.icon}
                                    title={e.title}
                                    paragraph={e.paragraph}
                                    paddingWrapp="20px"
                                    mouseOver={()=>mouseOverCard(i)}
                                    mouseLeave={mouseLeaveCard}
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