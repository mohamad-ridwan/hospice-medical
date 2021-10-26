import React, {useState} from 'react';
import './Departments.scss';
import Header from '../../components/header/Header';
import img from '../../images/banner-home.jpg'
import categorySatu from '../../images/category-satu.jpg';
import categoryDua from '../../images/category-dua.jpg';
import categoryTiga from '../../images/category-tiga.jpg';
import Card from '../../components/card/Card';

function Departments(){

    const [imgProcedure, setImgProcedure] = useState([
        {
            img: categorySatu,
            title: 'EMERGENCY TREATMENT'
        },
        {
            img: categoryDua,
            title: 'EMERGENCY TREATMENT'
        },
        {
            img: categoryTiga,
            title: 'EMERGENCY TREATMENT'
        },
        {
            img: categorySatu,
            title: 'EMERGENCY TREATMENT'
        },
        {
            img: categoryDua,
            title: 'EMERGENCY TREATMENT'
        },
        {
            img: categoryTiga,
            title: 'EMERGENCY TREATMENT'
        },
    ])
    const [hoverProcedureCtg, setHoverProcedureCtg] = useState(null)

    function mouseOverProcedureCtg(i){
        setHoverProcedureCtg(i)
    }

    function mouseLeaveProcedureCtg(){
        setHoverProcedureCtg(null)
    }

    return(
        <>
        <div className="wrapp-departments">
            <div className="container-header">
                <Header
                title="Procedure Category"
                img={img}
                displayIcon2="none"
                page1="Departments"
                displayIcon3="none"
                />
            </div>

            <div className="procedure-category-departments">
                <p className="title-procedure-departments">
                    Procedure Category
                </p>
                <p className="paragraph-procedure-departments">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="column-card-procedure-departments">
                    {imgProcedure.map((e, i)=>{
                        return(
                            <div className="card-procedure-departments">
                            <Card 
                                img={e.img}
                                titleImgHover={e.title}
                                marginHoverImg="20px"
                                paddingHoverImg="40px"
                                fontSizeTitleHoverImg="16px"
                                displayTitleHoverImg="flex"
                                fontWeightTitleHoverImg="bold"
                                paddingTitleHoverImg="10px 0"
                                widthTitleHoverImg="100%"
                                opacityHoverImg={i === hoverProcedureCtg ? '1' : '0'}
                                mouseOver={()=>mouseOverProcedureCtg(i)}
                                mouseLeave={mouseLeaveProcedureCtg}
                                cursorImg="default"
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

export default Departments;