import React from 'react'
import { useState } from 'react'
import { Form , Button, Card } from 'react-bootstrap'

const PostEdit = (props) => {
 


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [SystemMessage, setSystemMessage] = useState(
        <p className="text-muted">Please supply details below. Note that all fields are required</p> 
    )

    const HandleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const HandleContentChange = (e) => {
        setContent(e.target.value)
    }

    const HandleSubmit = (e) => {

        e.preventDefault();
      
        if(title !== "" && content !== "")
        { 
            var updatedPost = {
                id : props.selectedPostId,
                title,
                content
            }
            props.HandleSubmit(updatedPost); 
        }
        else
        {
            setSystemMessage(<p className="text-danger">All fields are required</p>);
        }
      
    }


    const HandleCancel = (e) => {

        e.preventDefault(); 
        props.HandleCancel(); 
    }

    


    return (
        <>
        <Card>
            <Card.Body>
            <h1>Update Post</h1>
            {SystemMessage}
            
            <Form onSubmit={HandleSubmit}>
  
        <Form.Group controlId="c1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"  placeholder="Title"
            value={props.selectedtitle}  onChange={HandleTitleChange} />
        </Form.Group>
                

            <Form.Group controlId="2x">
    <Form.Label>Content  </Form.Label>
    <Form.Control value={props.selectedcontent}   
     as="textarea"  onChange={HandleContentChange}  rows={3} />
  </Form.Group>
                
             
            <Button variant="primary"   type="submit" >SAVE</Button>
            {' '}
            <Button variant="primary" onClick={HandleCancel}>CANCEL</Button>

            </Form>
            </Card.Body>
        </Card>
        </>
    )
}

export default PostEdit