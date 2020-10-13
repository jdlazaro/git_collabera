import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useState } from 'react'

export const PostPagination = (props) => {


    const { pageLimit, postsCount} = props;
    
    const hasRemainder = postsCount % pageLimit;
      
    let pageNumbers = postsCount / pageLimit;
     
    if(hasRemainder > 0)
    {
        pageNumbers = pageNumbers + 1;
    }
    
    const [pageCurrent, setpageCurrent ] = useState(props.pageCurrent);


    const HandlePageChange = (pageNumber) => {

        setpageCurrent(pageNumber);
        props.HandlePageChange(pageNumber);

    }



    let active = pageCurrent;
let items = [];
for (let number = 1; number <= pageNumbers; number++) {
  items.push(
    <Pagination.Item         key={number}
            onClick={() => HandlePageChange(number)}
    active={number === active}>
      {number}  |  {pageCurrent}
    </Pagination.Item>,
  );
}




console.log('page count' + props.postsCount);

console.log('page current' + props.pageCurrent);


console.log(pageNumbers);


const paginationBasic = (
  <div>
      <br></br>
    <Pagination >{items}</Pagination>
    <br />
 
  </div>
);

return paginationBasic
}


export default PostPagination