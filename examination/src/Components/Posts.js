import React from 'react'
import { useState, useEffect } from 'react'
import PostAdd from './PostAdd';
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import PostView from './PostView'
import { Button, ListGroup, Form } from 'react-bootstrap'
import PostPagination from './PostPagination';


export const Posts = () => {

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


    //UI Specific
    const [PostAddComponentIsDisplayed,setPostAddComponentIsDisplayed] = useState(false);
    const [PostEditComponentIsDisplayed,setPostEditComponentIsDisplayed] = useState(false); 
    const [PostDeleteComponentIsDisplayed,setPostDeleteComponentIsDisplayed] = useState(false); 
    const [PostViewComponentIsDisplayed, setPostViewComponentIsDisplayed] = useState(false);
    
   
    const HandleAddButton = () =>
    { 
        HideSidebarComponents();
        setPostAddComponentIsDisplayed(true);
    }

    
    
    const HandleViewButton = (id, _index) =>
    {  
       
        setSelectedPostId(id); 
        setSelectedPostIndex(_index);
        setSelectedPostTitle(posts[_index].title);
        setSelectedPostContent(posts[_index].content);

        console.log(setSelectedPostTitle);

        HideSidebarComponents(); 
        
        
        setPostViewComponentIsDisplayed(true);
    }


    const HandleDeleteButton = (id,_index) =>
    {  
        let item = posts.find(item => item.id === id);

        setSelectedPostTitle(item.title);
        setSelectedPostContent(item.content);
        setSelectedPostId(item.id);
        HideSidebarComponents();
        setPostDeleteComponentIsDisplayed(true);
    }


    const HandleEditButton = (id,_index) =>
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




    //main data access
    const [posts,setPosts] = useState(initPosts);
    const [selectedPostId, setSelectedPostId] = useState();  
    const [selectedPostTitle, setSelectedPostTitle] = useState();  
    const [selectedPostContent, setSelectedPostContent] = useState();   
    const [selectedPostIndex, setSelectedPostIndex] = useState();
    let postsCount = posts.length;
 

    useEffect(() => {
         
        setrenderPagination(<PostPagination  
            HandlePageChange={HandlePageChange} 
            pageLimit = {pageLimit}  
            pageCurrent={pageCurrent}  
            postsCount={postsCount }   
            />);   
        
    },[postsCount])


    //pagination vairables
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageLimit, setPageLimit] = useState(4); 
    const [renderPagination,setrenderPagination] = useState();
    const [pageCurrentItems, setPageCurrentItems] = useState(posts.slice(0,pageLimit)); 
    
 
    
     

    
    const ReloadList = (page_number = 0) => {

        

         if(page_number==0)
         {
 
            let lastPageNumber = postsCount / pageLimit;
            const remainder = postsCount % pageLimit;
           
            if(remainder > 0)
            {
                lastPageNumber = lastPageNumber + 1;
            }
           
            //4 * 3 = 12 - 4 = 8
            //    pagelimit * 3 =12 - 4 = 8 //start index 
            const start = pageLimit * lastPageNumber - pageLimit;
            const end =  start + pageLimit;  
            setPageCurrent(lastPageNumber); 
            setPageCurrentItems(posts.slice(start,end) ); 

            console.log('last PAGE' + lastPageNumber);
            console.log('CURRENT PAGE' + pageCurrent);

         }
         if(page_number > 0)
         {
            
            const start = pageLimit * page_number - pageLimit;
            const end =  start + pageLimit;
     
            setPageCurrent(page_number); 
            setPageCurrentItems(posts.slice(start,end) ); 
         } 
         

         
    }

    
    const HandlePageChange = (page_number) => {  
        
        ReloadList(page_number);

    }

    

    //ADD Component Functionalities
    const PostAddHandleSubmit = (newPost) => {
       
        HideSidebarComponents();
        const newPosts = [...posts,newPost];
        setPosts(newPosts);    
        ReloadList(1);

       
       }


    //Delete
    const PostDeleteHandleSubmit = (postId) => {
        HideSidebarComponents(); 
        const newPosts =  posts.filter(post => post.id != postId );
        setPosts(newPosts);  
        ReloadList(1);

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
 
        const newArr = [...pageCurrentItems];
        setPageCurrentItems(newArr);

    }

    //Generic Cancel Functionality
    const PostHandleCancel= () => { 
         HideSidebarComponents();
    }

     


    //End of Add Component
    return (
        <div className="row">
            <div className="col-sm-6 col-md-6" >
            <h1>Posts</h1>
            <h2>{pageCurrent}</h2>


            
                     {
                        (!PostAddComponentIsDisplayed) ? 
                        <Button variant="primary" onClick={HandleAddButton}>ADD NEW POST </Button> : ""
                    } 
                    
            <h2></h2>
            <h2></h2>
            <Form>
                <Form.Group >
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="title, description" />
                </Form.Group>
            </Form>
            <h2></h2>
 

            {

               

                 pageCurrentItems.map((post,index) => {
                     return (
                         <>  
                    
  <ListGroup as="ul"    key={index}>
  <ListGroup.Item as="li">
                       <p>{post.title}

                           </p> 


                        <div className="pull-right"> 
                            <Button variant="primary" size="sm" onClick={ () => { HandleViewButton(post.id,index); }}>View</Button> 
                            {' '}
                            <Button variant="primary"  size="sm" onClick={ () => { HandleEditButton(post.id,index); }}>Edit</Button> 
                            {' '}
                            <Button  variant="primary"   size="sm"  onClick={ () => { HandleDeleteButton(post.id, index); }}>Delete</Button>
                        </div>
  </ListGroup.Item> 
</ListGroup>        

                         </>
                     )  
                 })
            }
            

            current {pageCurrent}
            <br>
            </br>
            count  {postsCount}
            <br>
            </br>
            LImit{pageLimit}
            <br>
            </br>
            
            {/* {  (postsCount < pageLimit) ?  "" :  {renderPagination} } */}

            {renderPagination}


          
                

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
    )
}

export default Posts