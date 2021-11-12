import React, {useState, useEffect} from 'react';
import './DetailBlog.scss';
import Header from '../../components/header/Header';
import img from '../../images/banner-home.jpg'
import imgPopularPosts1 from '../../images/img-popular-posts1.jpg'
import imgPopularPosts2 from '../../images/img-popular-posts2.jpg'
import imgPopularPosts3 from '../../images/img-popular-posts3.jpg'
import imgPopularPosts4 from '../../images/img-popular-posts4.jpg'
import imgBlogDetail1 from '../../images/img-blog-details1.jpg'
import PopularPosts from '../../components/popularposts/PopularPosts';
import Card from '../../components/card/Card';
import imgPrevPost from '../../images/img-prev-post.jpg'
import imgNextPost from '../../images/img-next-post.jpg'
import imgComment1 from '../../images/img-comment1.jpg'
import imgComment2 from '../../images/img-comment2.jpg'
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

function DetailBlog(){

    const [dataPopularPosts, setDataPopularPosts] = useState([
        {
            img: imgPopularPosts1,
            title: 'Space The Final Frontier',
            date: '21:51 12 Dec, 2017'
        },
        {
            img: imgPopularPosts2,
            title: 'The Amazing Hubble',
            date: '08:51 13 Dec, 2012'
        },
        {
            img: imgPopularPosts3,
            title: 'Astronomy Or Astrology',
            date: '09:51 12 Dec, 2013'
        },
        {
            img: imgPopularPosts4,
            title: 'Asteroids telescope',
            date: '21:51 12 Dec, 2017'
        },
    ])
    const [dataPostCategories, setDataPostCategories] = useState([
        {
            name: 'Social Life',
            total: '23'
        },
        {
            name: 'Politics',
            total: '50'
        },
        {
            name: 'Food',
            total: '20'
        },
        {
            name: 'Technology',
            total: '18'
        },
        {
            name: 'Art',
            total: '70'
        },
    ])
    const [nextAndPrevPosts, setNextAndPrevPosts] = useState([
        {
            img: imgPrevPost,
            title: 'Space The Final Frontier',
        },
        {
            img: imgNextPost,
            title: 'Telescopes 101',
        }
    ])
    const [dataComments, setDataComments] = useState([
        {
            image: imgComment1,
            name: 'Emilly Blunt',
            date: 'December 4, 2017 at 3:12 pm',
            comment: 'Never say goodbye till the end comes!'
        },
        {
            image: imgComment2,
            name: 'Maria Luna',
            date: 'December 4, 2017 at 3:12 pm',
            comment: 'Never say goodbye till the end comes!'
        }
    ])
 
    const hoverBgImgPaginate = document.getElementsByClassName('hover-paginate-blog-details')

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    function mouseOverPaginate(idx){
        if(hoverBgImgPaginate.length > 0){
            for(let i = 0; i < hoverBgImgPaginate.length; i++){
                hoverBgImgPaginate[i].style.opacity = '0'
            }

            hoverBgImgPaginate[idx].style.opacity = '1'
        }
    }

    function mouseLeavePaginate(){
        for(let i = 0; i < hoverBgImgPaginate.length; i++){
            hoverBgImgPaginate[i].style.opacity = '0'
        }
    }

    function focusInput(classInput, idx){
        document.getElementsByClassName(classInput)[idx].style.border = '1px solid #eee'
    }

    return(
        <>
        <div className="wrapp-detail-blog">
            <div className="container-header">
                <Header
                    title="Blog Details"
                    img={img}
                    page1="Blog"
                    page2="Blog Details"
                    displayIcon3="none"
                />
            </div>

            <div className="container-content-blog-details">
                <div className="column-kiri-content-blog-details">
                    <img src={imgBlogDetail1} alt="" className="img-content-blog-details" />

                    <div className="main-content-blog-details">
                        <div className="column-category-blog-details">
                            <p className="name-category-content date-group-blog-details">
                                Category, Life
                            </p>

                            <p className="date-group-blog-details">
                                12 Dec, 2017

                                <i className="far fa-calendar-alt"></i>
                            </p>

                            <p className="date-group-blog-details">
                                06 Comments

                                <i className="far fa-comment"></i>
                            </p>
                        </div>

                        <div className="column-main-content">
                            <p className="title-main-content">
                                Astronomy Binoculars A Great Alternative
                            </p>
                            <p className="paragraph-main-content">
                                MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.
                                <br />
                                <br />
                                Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed
                            </p>
                        </div>
                    </div>

                    <p className="paragraph-highlight">
                        MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training.
                    </p>

                    <img src={imgBlogDetail1} alt="" className="img-content-blog-details img-body-content" />

                    <p className="paragraph-body-content">
                    MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower.
                    <br /><br />
                    MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower.
                    </p>

                    <div className="container-comments-blog-details">
                        <div className="paginate-next-posts">
                            {nextAndPrevPosts.map((e, i)=>{
                                return(
                                    <div className="card-prev-next-blog-details">
                                        <Card
                                            displayContentCard="flex"
                                            img={e.img}
                                            heightImg="60px"
                                            title={i === 0 ? 'Prev Post' : 'Next Post'}
                                            iconHoverImg={i === 0 ? 'fas fa-long-arrow-alt-left' : 'fas fa-long-arrow-alt-right'}
                                            paragraph={e.title}
                                            flexDirectionWrapp={i === 0 ? 'row' : 'row-reverse'}
                                            justifyContentTitle={i === 0 ? 'flex-start' : 'flex-end'}
                                            textAlignTitle={i === 0? 'start' : 'end'}
                                            justifyContentParagraph={i === 0 ? 'flex-start' : 'flex-end'}
                                            textAlignParagraph={i === 0 ? 'start' : 'end'}
                                            widthImg="auto"
                                            fontSizeTitle="14px"
                                            fontSizeParagraph="18px"
                                            marginTitle="0 0 5px 0"
                                            bgColorWrapp="transparent"
                                            marginImg={i === 0 ? '0 15px 0 0' : '0 0 0 15px'}
                                            alignItemsWrapp="center"
                                            colorTitle="#777"
                                            fontWeightTitle="normal"
                                            colorParagraph="#000"
                                            fontWeightParagraph="bold"
                                            cursorParagraph="pointer"
                                            classHoverBgImg="hover-paginate-blog-details"
                                            mouseOver={()=>mouseOverPaginate(i)}
                                            mouseLeave={mouseLeavePaginate}
                                        />
                                    </div>
                                )
                            })}             
                        </div>

                        <div className="column-list-comments-blog-details">
                            <p className="total-comments">
                                05 Comments
                            </p>

                            {dataComments.map((e)=>{
                                return(
                                    <Card
                                        displayContentCard="flex"
                                        img={e.image}
                                        heightImg="60px"
                                        title={e.name}
                                        paragraph={e.date}
                                        comments={e.comment}
                                        displayTxtComment="flex"
                                        flexDirectionWrapp="row"
                                        widthImg="auto"
                                        fontSizeTitle="16px"
                                        fontSizeParagraph="12px"
                                        marginTitle="0 0 5px 0"
                                        marginImg="0 15px 0 0"
                                        bgColorWrapp="transparent"
                                        marginWrapp="40px 0 0 0"
                                        colorTitle="#000"
                                        colorParagraph="#ccc"
                                        cursorImg="default"
                                    />
                                )
                            })}
                        </div>

                        <div className="leave-a-reply">
                            <p className="title-leave-a-reply">
                                Leave a Reply
                            </p>

                            <form action="" className="form-leave-a-reply">
                                <div className="main-input-leave-a-reply">
                                    <Input
                                    type="text"
                                    placeholder="Enter Name"
                                    widthInputCard="100%"
                                    />
                                </div>
                                <div className="main-input-leave-a-reply">
                                    <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    widthInputCard="100%"
                                    />
                                </div>

                                <Input
                                    type="text"
                                    placeholder="Subject"
                                    widthInputCard="100%"
                                    marginInputCard="0 0 15px 0"
                                />
                                <Input
                                    displayTxtInput="none"
                                    displayTxtArea="flex"
                                    widthInputCard="100%"
                                    placeholderTxtArea="Message"
                                    resizeTxtArea="none"
                                    widthTxtArea="100%"
                                />

                                <div className="column-btn-submit-leave-a-reply">
                                    <Button
                                    nameBtn="Post Comment"
                                    padding="12px 40px"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <PopularPosts
                    dataPopularPosts={dataPopularPosts}
                    dataPostCategories={dataPostCategories}
                />
            </div>
        </div>
        </>
    )
}

export default DetailBlog;