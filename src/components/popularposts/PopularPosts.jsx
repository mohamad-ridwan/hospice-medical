import React, {useState} from 'react';
import './PopularPosts.scss';
import Card from '../card/Card';

function PopularPosts({dataPopularPosts, dataPostCategories}){

    return(
        <>
        <div className="column-kanan-content-blog">
                    <p className="title-content-kanan-blog">
                        Popular Posts
                    </p>

                    {dataPopularPosts && dataPopularPosts.length > 0 ? dataPopularPosts.map((e)=>{
                        return(
                            <Card
                                displayContentCard="flex"
                                img={e.img}
                                heightImg="60px"
                                title={e.title}
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
                            />
                        )
                    }):(
                        <div></div>
                    )}

                    <div className="line-grey"></div>

                    <p className="title-content-kanan-blog title-post-categories">
                        Post Categories
                    </p>

                    <ul className="column-list-post-categories">
                        {dataPostCategories && dataPostCategories.length > 0 ? dataPostCategories.map((e)=>{
                            return(
                                <li className="list-post-categories">
                                    {e.name}
                                    <p className="total-post-categories">
                                        {e.total}
                                    </p>
                                </li>
                            )
                        }):(
                            <div></div>
                        )}
                    </ul>
                </div>
        </>
    )
}

export default PopularPosts;