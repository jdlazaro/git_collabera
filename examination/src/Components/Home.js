import React from 'react'
import { useState, useEffect } from 'react'
import { Button , Card, Form } from 'react-bootstrap';
import PostCard from './PostCard'; 
import PostAdd from './PostAdd';
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import PostView from './PostView'


 const Home = () => {

    const initPosts = [{
        id : 1,
        title : "a",
        content : "apple is a sample content",
        dateCreated : "10/10/2020"
    },{
        id : 2,
        title : "z",
        content : "mango is a sample content",
        dateCreated : "10/09/2020"
    },{
       id : 3,
       title : "d",
       content : "mango is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 4,
       title : "r",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 5,
       title : "x",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 6,
       title : "y",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 7,
       title : "z",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 8,
       title : "a",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 9,
       title : "f9",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   },{
       id : 10,
       title : "xk",
       content : "this is a sample content",
       dateCreated : "10/10/2020"
   }];

 
   
    //UI Specific
    const [PostAddComponentIsDisplayed,setPostAddComponentIsDisplayed] = useState(false);
    const [PostEditComponentIsDisplayed,setPostEditComponentIsDisplayed] = useState(false); 
    const [PostDeleteComponentIsDisplayed,setPostDeleteComponentIsDisplayed] = useState(false); 
    const [PostViewComponentIsDisplayed, setPostViewComponentIsDisplayed] = useState(false) ;
    const [selectedPostId, setSelectedPostId] = useState();  
    const [selectedPostTitle, setSelectedPostTitle] = useState();  
    const [selectedPostContent, setSelectedPostContent] = useState();   
    const [selectedPostIndex, setSelectedPostIndex] = useState();;
    

    
   


     //ADD Component Functionalities
     const PostAddHandleSubmit = (newPost) => {
       
        HideSidebarComponents();
        const newPosts = [...posts,newPost];
        setPosts(newPosts);    
          
       }


    //Delete
    const PostDeleteHandleSubmit = (postId) => {
        HideSidebarComponents(); 
        const newPosts =  posts.filter(post => post.id != postId );
        setPosts(newPosts);  
         
    }


    //Edit
    const PostEditHandleSubmit = (post) => {
        HideSidebarComponents();
         

        let gotPost = [];
        posts.filter((item) => {
            if(item.id === post.id)
            {
               item.title = post.title;
               item.content = post.content 
            }
          }
         )
 
        const newArr = [...posts];
        setPosts(newArr);

    }


    const HandleSortBy = (e) => {

        

        if(e.target.value=="bydate")
        {

            
            loadList(posts
                .sort((a, b) => {
                    if (a.dateCreated < b.dateCreated)
                    return -1;
                    if (a.dateCreated > b.dateCreated)
                    return 1;
                    return 0;
                }),1);


           // setRenderedList(createRenderedList()    ,0,pageLimit));
  
        }
        else
        {
          
            loadList(posts
                .sort((a, b) => {
                    if (a.title < b.title)
                    return -1;
                    if (a.title > b.title)
                    return 1;
                    return 0;
                }),1);



        }
    }


    //SEarch
    const HandleSearch = (e) => {
        
        const searchKeyword = e.target.value;
        
        let foundItems = [];

        if(searchKeyword !== "")
       {
        posts.map(x => {  
            const result =  x.title.search(searchKeyword);
            console.log(result);

            if(result > -1)
            { 
               const arr =  [...foundItems, x];
               foundItems = [...arr];
            }

            const result2 = x.content.search(searchKeyword);
            if(result2 > - 1){
              
              const duplicityCheck = foundItems.filter(z=> z.id === x.id);
              if(duplicityCheck ==  0)
              {
                const arr =  [...foundItems, x];
                foundItems = [...arr];
              }
              

            }



        })  
         

       
          const _remainder = foundItems.length % pageLimit;
          let _pageNumbers = Math.round(  foundItems.length / pageLimit);  
         
         if(foundItems.length > 0 )
         {
 
            setRenderedList(createRenderedList(foundItems,0,pageLimit)); 
            if(foundItems.length > pageLimit)
            {

                setPager(createPagination(_pageNumbers,1)); 
            }
            else
            {
                setPager(createPagination(0,1));

            }
          }
         else
         {
            

                setRenderedList(<p className='text-danger'>search not found!</p>);
                setPager(createPagination(0,1)); 
         }
         

       }
       else
       {
           //LOAD DEFAULTS
           loadList(posts,1);
       }

    }

    

    //Generic Cancel Functionality
    const PostHandleCancel= () => { 
         HideSidebarComponents();
    }

    const HandleAddButton = () =>
    { 
        HideSidebarComponents();
        setPostAddComponentIsDisplayed(true);
    }

    
    
    const HandleViewButton = (id) =>
    {  
       
        setSelectedPostId(id);  

        let item = posts.find(item => item.id === id);

        setSelectedPostTitle(item.title);
        setSelectedPostContent(item.content);
        setSelectedPostId(item.id);


        HideSidebarComponents(); 
        
        
        setPostViewComponentIsDisplayed(true);
    }


    const HandleDeleteButton = (id) =>
    {  
        let item = posts.find(item => item.id === id);

        setSelectedPostTitle(item.title);
        setSelectedPostContent(item.content);
        setSelectedPostId(item.id);
        HideSidebarComponents();
        setPostDeleteComponentIsDisplayed(true);
    }


    const HandleEditButton = (id) =>
    { 
        
        HideSidebarComponents();
        setSelectedPostId(id); 
       // setSelectedPostIndex(_index); 
        
        setPostEditComponentIsDisplayed(true);

        let gotPost = [];
        posts.filter((item) => {
            if(item.id === id)
            {
                setSelectedPostTitle(item.title);
                setSelectedPostContent(item.content); 
            }
          }
         )

    }

    const HideSidebarComponents = () => {
        setPostAddComponentIsDisplayed(false);
        setPostEditComponentIsDisplayed(false);
        setPostDeleteComponentIsDisplayed(false);
        
        setPostViewComponentIsDisplayed(false);
    }


    //end UI specific

    const [posts, setPosts] = useState(initPosts); 
    const [pageLimit] = useState(4); 
    const [pageCurrent, setPageCurrent] = useState(1);  
    const remainder = posts.length % pageLimit;
    let pageNumbers = Math.round(posts.length / pageLimit);
    const [pagesCount, setPagesCount] = useState(pageNumbers);  
    const [end, setEnd ] = useState(pageCurrent * pageLimit);
    const [start, setStart]  = useState(end - pageLimit);

    const createPagination = (totalPages,activePage) => {
  
      

        let rows = [];  
        for (let i = 1; i <= totalPages; i++) { 
            
            if(i===activePage)
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


    const [pager, setPager] = useState(createPagination(pagesCount,pageCurrent));
    
    const createRenderedList = (_arr, _start, _end) => {

        console.log(_arr, '_ARR');
 
        return (
           _arr.slice(_start,_end).map(post =>
               { 
                 return  (
                     <div>
                         <PostCard
                              title={post.title}
                              content={post.content}
                              id={post.id}
                              dateCreated={post.dateCreated}
                              HandleDeleteButton={()=> HandleDeleteButton(post.id)}
                              HandleViewButton={()=> HandleViewButton(post.id)}
                              HandleEditButton={()=>  HandleEditButton(post.id)}
                         />
                     </div> )
              })
        )     
           
   
   }

   

    const [renderedList, setRenderedList] = useState(createRenderedList(posts,start,end)); 

  




   
    
     //END START
     
   

 
          
        const HandleChangePage = (selectedPage) => {  
               
                setPageCurrent(selectedPage); 
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


    const loadList = (_arr,_currentPage) => {
        

               
        
            let _end = _currentPage * pageLimit; 
            
            let _start = _end - pageLimit;  
           
            let pageNumbers = Math.round(_arr.length  / pageLimit); 
            const remainder = _arr.length  % pageLimit;
            if(remainder ===1 ) {
                pageNumbers += 1;
                _currentPage += 1;
                _end  += pageLimit;
                _start = _end - pageLimit;
            } 

            setRenderedList(createRenderedList( _arr ,     _start,  _end));  
            if(pageNumbers > 1 ){
                
                setPager(createPagination(pageNumbers,_currentPage)); 
            
            }
            
    } 
   
 


    useEffect(() => { 
           
           
                loadList(posts, Math.round(posts.length  /  pageLimit));
       
        
    }, [posts])


        
 

        
useEffect(() => {  

   
   loadList(posts,pageCurrent);
        
    
}, [pageCurrent])

   



    

    return (
        <div>
                <h1>Post</h1>
  
                    
                    <br></br> 
                     
                  
                    {
                        (!PostAddComponentIsDisplayed) ? 
                        <Button variant="primary" size="md" onClick={HandleAddButton}>ADD NEW POST </Button> : ""
                    }

                    
           
                <div className="row">
                    <div className="col-sm-6">   



                  
                    <Form>
                    <Form.Group >
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="title, description"  onKeyDown={HandleSearch}  />
                    </Form.Group>
                    
                    <Form.Group >
                    <Form.Label>Sort By</Form.Label>
                  
                    <Form.Control as="select" onChange={HandleSortBy}>
                        
                    <option></option>
                        <option value="bytitle">Title</option>
                        <option value="bydate">Date Created</option> 
                        </Form.Control>
                    </Form.Group>
                   
                    </Form>










                                            {  
                            renderedList
                        }

                        <br></br>
                        {
                            pager
                        } 
                    </div>
                    
                    <div className="col-sm-6 col-md-6" > 

{ 
(PostAddComponentIsDisplayed) ?  
<PostAdd     HandleSubmit={PostAddHandleSubmit}   HandleCancel={PostHandleCancel}     /> 
: ""
}   

{ 
(PostDeleteComponentIsDisplayed) ?  
<PostDelete  selectedPostIndex={selectedPostIndex}  
 selectedPostId={selectedPostId}   
 selectedtitle={selectedPostTitle} 
 selectedcontent={selectedPostContent}   

  HandleSubmit={PostDeleteHandleSubmit} 
    HandleCancel={PostHandleCancel}     /> 
: ""
}   

{ 
(PostEditComponentIsDisplayed) ?  
<PostEdit     selectedPostId={selectedPostId}   
selectedtitle={selectedPostTitle} 
selectedcontent={selectedPostContent}   
   HandleSubmit={PostEditHandleSubmit} 
     HandleCancel={PostHandleCancel}     /> 
: ""
}   


{ 
(PostViewComponentIsDisplayed) ?  
<PostView    selectedPostId={selectedPostId}   
selectedtitle={selectedPostTitle} 
selectedcontent={selectedPostContent}  

     HandleCancel={PostHandleCancel}     /> 
: ""
}   


</div> 

                </div>
                 

               
        </div>
    )
}

export default Home