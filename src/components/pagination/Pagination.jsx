import React from 'react';
import './Pagination.scss';

function Pagination({totalData, perPage, idxPaginateActive, click, marginLeftLoading}){

    const pageNumber = []

    for(let i = 1; i < Math.ceil(totalData/perPage + 1); i++){
        pageNumber.push(i)
    }

    const paginate = document.getElementsByClassName('number-pagination')
    
    function mouseOver(idx){
        if(paginate.length > 0){
            for(let i = 0; i < paginate.length; i ++){
                paginate[i].style.backgroundColor = 'transparent';
                paginate[i].style.border = '1px solid #eee';
                paginate[i].style.color = '#777';
            }

            // Number Active
            paginate[idxPaginateActive].style.backgroundColor = '#3face4';
            paginate[idxPaginateActive].style.border = '1px solid #3face4';
            paginate[idxPaginateActive].style.color = '#fff';

            // Number Hover
            paginate[idx].style.backgroundColor = '#3face4';
            paginate[idx].style.border = '1px solid #3face4';
            paginate[idx].style.color = '#fff';
        }
    }

    function mouseLeave(){
        for(let i = 0; i < paginate.length; i ++){
            paginate[i].style.backgroundColor = 'transparent';
            paginate[i].style.border = '1px solid #eee';
            paginate[i].style.color = '#777';
        }

        paginate[idxPaginateActive].style.backgroundColor = '#3face4';
        paginate[idxPaginateActive].style.border = '1px solid #3face4';
        paginate[idxPaginateActive].style.color = '#fff';
    }

    return(
        <>
        <div className="wrapp-pagination">
            <ul className="column-btn-pagination">
                {pageNumber.map((e, i)=>{
                    return(
                        <li className="number-pagination"
                        onMouseOver={()=>mouseOver(i)}
                        onMouseLeave={mouseLeave}
                        onClick={()=>click(i)}
                        >
                            {e}
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default Pagination;