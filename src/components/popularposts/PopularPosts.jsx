import React from 'react';
import './PopularPosts.scss';
import Card from '../card/Card';
import endpoint from '../../services/api/endpoint';

function PopularPosts({ dataPopularPosts, dataPostCategories, btnListPostCategories, mouseOver, mouseLeave,clickPopularPosts }) {
    return (
        <>
            <div className="column-kanan-content-blog">
                <p className="title-content-kanan-blog">
                    Popular Posts
                </p>

                {dataPopularPosts && dataPopularPosts.length > 0 ? dataPopularPosts.map((e, i) => {
                    return (
                        <Card
                            key={i}
                            displayContentCard="flex"
                            img={`${endpoint}/${e.image}`}
                            heightImg="60px"
                            title={e.title.length > 15 ? e.title.substr(0, 15) + '...' : e.title}
                            paragraph={e.date}
                            flexDirectionWrapp="row"
                            widthImg="auto"
                            fontSizeTitle="13px"
                            fontSizeParagraph="11px"
                            marginTitle="0 0 8px 0"
                            bgColorWrapp="transparent"
                            marginImg="0 15px 0 0"
                            marginWrapp="0 0 20px 0"
                            cursorTitle="pointer"
                            alignItemsWrapp="center"
                            clickTitle={()=>clickPopularPosts(e.path)}
                            clickImg={()=>clickPopularPosts(e.path)}
                        />
                    )
                }) : (
                    <div></div>
                )}

                <div className="line-grey"></div>

                <p className="title-content-kanan-blog title-post-categories">
                    Post Categories
                </p>

                <ul className="column-list-post-categories">
                    {dataPostCategories && dataPostCategories.length > 0 ? dataPostCategories.map((e, i) => {
                        return (
                            <li key={i} className={`list-post-categories ${e.id}`}
                            onClick={()=>btnListPostCategories(e.id)}
                            onMouseOver={()=>mouseOver(i)}
                            onMouseLeave={mouseLeave}
                            >
                                {e.title}
                                <p className="total-post-categories">
                                    {e.data.length.toString().length === 1 ? `0${e.data.length}` : e.data.length}
                                </p>
                            </li>
                        )
                    }) : (
                        <div></div>
                    )}
                </ul>
            </div>
        </>
    )
}

export default PopularPosts;