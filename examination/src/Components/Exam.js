import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';



 const Exam = () => {

    
    const initPosts = [{
        id : 1,
        title : "one",
        content : "this is a sample content",
        dateCreated : "10/10/2020"
    },{
        id : 2,
        title : "2",
        content : "this is a sample content",
        dateCreated : "10/10/2020"
    },{
       id : 3,
       title : "3",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 4,
       title : "4",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 5,
       title : "5",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 6,
       title : "6",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 7,
       title : "7",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 8,
       title : "8",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 9,
       title : "f9",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 10,
       title : "10",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   }];

   
  

   
    const [posts, setPosts] = useState(initPosts); 
    const [pageLimit, setPagelimit] = useState(3); 
    const [pageCurrent, setPageCurrent] = useState(1); 

    const remainder = posts.length % pageLimit;
    let pageNumbers = Math.round(posts.length / pageLimit);

    console.log(remainder);
    
     
    const [pagesCount, setPagesCount] = useState(pageNumbers);  
    
    const [end, setEnd ] = useState(pageCurrent * pageLimit);
    const [start, setStart]  = useState(end - pageLimit);
    const [renderedList, setRenderedList ] = useState(posts.slice(start, end).map(x =>
        { 
           return  <h4>{x.title}</h4>
        }) );

  
     useEffect(() => { 

             const end = pageCurrent * pageLimit;
             const start = end - pageLimit; 
             setStart(start);
             setEnd(end);  
            
             setRenderedList(posts.slice(start, end).map(x =>
                { 
                   return  <h4>{x.title}</h4>
                }));


             setPager(createPagination)

        }, [pageCurrent])
     




        useEffect(() => {   
           
                const remainder = posts.length % pageLimit;
                let pageNumbers = Math.round(posts.length / pageLimit);
 
                if(remainder !== 0)
                {
                    console.log('rem' + remainder);
                    pageNumbers += 1;
                }

                setPagesCount(pageNumbers);  
                setPager(createPagination); 

                
             
        }, [posts])
          
        const HandleChangePage = (selectedPage) => { 
            setPageCurrent(selectedPage); 
        }
     


    const createPagination = () => {

        let rows = []; 
 
        for (let i = 1; i <= pagesCount; i++) { 
            
            if(i===pageCurrent)
            {
                rows.push(<li className='page-item active'>
                <a className="page-link active" href="#"  
                onClick={ () => HandleChangePage(i)}  >{i}</a></li>);
            }
            else
            {
                rows.push(<li className='page-item'>
                <a className="page-link" href="#"  onClick={ () =>  HandleChangePage(i)} >{i}</a></li>);
            }
            
        }

        return (
            <nav aria-label="...">
                <ul className="pagination pagination-sm"> 
                {rows}
                </ul>
            </nav>
        ) 

    }



    const AddData = () => {
        
       
        const post = {
            id : Math.random(28 * pageNumbers * 1000),
            title : pagesCount + 1,
            content : "this is content "
        }

        const updatedArr = [...posts,post];
        setPosts(updatedArr);
         
    }

    const DeleteData = (id) => {
        var updatedData =  posts.filter(post => post.id !== id ); 
        setPosts(updatedData);

    }

    const UpdateData = (id) => {

    } 




    const [pager, setPager] = useState(createPagination);
    


    return (
        <div>
                <h1>Post</h1>
                {start} - {end}

                 {  
                    renderedList
                 }

                 {
                     pager
                 }

                 
                 {
                    pagesCount
                 } 'page count ' 


                 {
                     posts.length
                 }

                 <Button onClick={AddData}>ADD NEW ITEM</Button>
        </div>
    )
}

export default Exam