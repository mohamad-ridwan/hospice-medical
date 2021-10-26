import React, {useState} from 'react';
import './Blog.scss';
import img from '../../images/banner-home.jpg'
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import imgKategori1 from '../../images/img-blog-kategori1.jpg'
import imgKategori2 from '../../images/img-blog-kategori2.jpg'
import imgKategori3 from '../../images/img-blog-kategori3.jpg'
import imgContentBlog1 from '../../images/img-content-blog1.jpg'
import imgContentBlog2 from '../../images/img-content-blog2.jpg'
import imgPopularPosts1 from '../../images/img-popular-posts1.jpg'
import imgPopularPosts2 from '../../images/img-popular-posts2.jpg'
import imgPopularPosts3 from '../../images/img-popular-posts3.jpg'
import imgPopularPosts4 from '../../images/img-popular-posts4.jpg'
import PopularPosts from '../../components/popularposts/PopularPosts';

function Blog(){

    const [dataImgKategori, setDataImgKategori] = useState([
        {
            img: imgKategori1,
            title: 'SOCIAL LIFE',
            deskripsi: 'Enjoy your social life together'
        },
        {
            img: imgKategori2,
            title: 'POLITICS',
            deskripsi: 'Be a part of politics'
        },
        {
            img: imgKategori3,
            title: 'FOOD',
            deskripsi: 'Let the food be finished'
        },
    ])
    const [contentBlog, setContentBlog] = useState([
        {
            kategori: 'Category, Social Life',
            date: '12 Dec, 2017',
            totalComment: '06 Comments',
            img: imgContentBlog1,
            title: 'Astronomy Binoculars A Great Alternative',
            paragraph: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.'
        },
        {
            kategori: 'Category, Politics',
            date: '14 Dec, 2018',
            totalComment: '20 Comments',
            img: imgContentBlog2,
            title: 'The Basics Of Buying A Telescope',
            paragraph: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.'
        }
    ])
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
    const [hoverImg, setHoverImg] = useState(null)

    const btnContentBlogCard = document.getElementsByClassName('btn-content-blog-card')

    function mouseOverBtnContent(idx){
        if(btnContentBlogCard.length > 0){
            for(let i = 0; i < btnContentBlogCard.length; i++){
                btnContentBlogCard[i].style.color = '#000'
                btnContentBlogCard[i].style.backgroundColor = 'transparent'
                btnContentBlogCard[i].style.border = '1px solid #eee'
            }

            btnContentBlogCard[idx].style.color = '#fff'
            btnContentBlogCard[idx].style.backgroundColor = '#3face4'
            btnContentBlogCard[idx].style.border = '1px solid #3face4'
        }
    }
    
    function mouseLeaveBtnContent(){
        for(let i = 0; i < btnContentBlogCard.length; i++){
            btnContentBlogCard[i].style.color = '#000'
            btnContentBlogCard[i].style.backgroundColor = 'transparent'
            btnContentBlogCard[i].style.border = '1px solid #eee'
        }
    }

    function mouseOverImg(i){
        setHoverImg(i)
    }
    
    function mouseLeaveImg(){
        setHoverImg(null)
    }

    return(
        <>
        <div className="wrapp-blog">
            <div className="container-header">
                <Header
                    title="Blog"
                    img={img}
                    displayIcon2="none"
                    page1="Blog"
                    displayIcon3="none"
                />
            </div>

            <div className="column-card-img-blog">
                {dataImgKategori.map((e, i)=>{
                    return(
                    <div className="card-img-blog">
                        <Card
                            img={e.img}
                            titleImgHover={e.title}
                            paragraphHoverImg={e.deskripsi}
                            heightImg="200px"
                            opacityHoverImg="1"
                            marginHoverImg="20px"
                            fontSizeTitleHoverImg="16px"
                            fontWeightTitleHoverImg="bold"
                            displayTitleHoverImg="flex"
                            bgColorHoverImg={i == hoverImg ? '#3fade491' : 'rgba(0,0,0,0.5)'}
                            displayParagraphoverImg="flex"
                            paddingTitleHoverImg="0 0px 5px 0px"
                            paddingHoverImg="40px"
                            borderTitleHoverImg="none"
                            borderTopParagraphHoverImg="1px solid #fff"
                            paddingParagraphHoverImg="10px 0 0 0"
                            marginParagraphHoverImg="10px 0 0 0"
                            mouseOver={()=>mouseOverImg(i)}
                            mouseLeave={mouseLeaveImg}
                        />
                    </div>
                )   
                })}
            </div>

            <div className="container-content-blog">
                <div className="column-kiri-content-blog">
                    {contentBlog.map((e, i)=>{
                        return(
                            <div className="column-card-content-blog">
                                <div className="date-content-blog">
                                    <p className="name-kategori-content date-group-content">
                                        {e.kategori}
                                    </p>
                                    <p className="date-content-publish date-group-content">
                                        {e.date}

                                        <i className="far fa-calendar-alt"></i>
                                    </p>
                                    <p className="total-comment-content date-group-content">
                                        {e.totalComment}

                                        <i className="far fa-comment"></i>
                                    </p>
                                </div>

                                <div className="card-content-blog">
                                    <Card
                                        displayContentCard="flex"
                                        img={e.img}
                                        title={e.title}
                                        paragraph={e.paragraph}
                                        heightImg="auto"
                                        fontSizeTitle="22px"
                                        cursorTitle="pointer"
                                        nameBtn="View More"
                                        displayBtn="flex"
                                        paddingBtn="10px 30px"
                                        bgColorWrapp="transparent"
                                        classBtn="btn-content-blog-card"
                                        cursorImg="default"
                                        mouseOverBtn={()=>mouseOverBtnContent(i)}
                                        mouseLeaveBtn={mouseLeaveBtnContent}
                                    />
                                </div>
                            </div>
                        )
                    })}
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

export default Blog;