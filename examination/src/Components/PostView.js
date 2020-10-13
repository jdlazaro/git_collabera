import React from 'react'
import { useState } from 'react'
import { Form , Button , Card } from 'react-bootstrap'

const PostView = (props) => {
 
 
    const HandleCancel = (e) => {

        e.preventDefault(); 
        props.HandleCancel(); 
    }

    


    return (
        <>
         <Card>
            <Card.Body>
            <h1>{props.selectedtitle}</h1>
            <p>{props.selectedcontent}</p> 
            
            <form>
  
            
            <Button variant="primary" onClick={HandleCancel}>CLOSE</Button>

            </form>

            </Card.Body>
        </Card>
           
          
        </>
    )
}

export default PostView