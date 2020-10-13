import React from 'react' ;
import { Card, Button } from 'react-bootstrap'

const PostDelete = (props) => {


    const HandleCancel = (e) => {

        e.preventDefault(); 
        props.HandleCancel(); 
    }


    const HandleSubmit = () => { 
        
        props.HandleSubmit(props.selectedPostId); 
    }

    return (
        <> 
        <Card>
            <Card.Body>
                <h1>Delete Post?</h1>
             
                <form onSubmit={HandleSubmit} >
                <h2> Are you sure? </h2>
                <p className="text-danger">
                    Please ensure that you want to deletem item below.
                </p>

                <p></p>
                <p><strong>Title : </strong>
                {props.selectedtitle}</p>
                <p>
                <strong>Content : </strong>
                {props.selectedcontent}</p>
                 
                 <Button variant="primary" type="submit">DELETE</Button>
                 { ' ' }
                    <Button onClick={HandleCancel}>CANCEL</Button>
    
                </form>
            
            </Card.Body>
        </Card>
           
        </>
    )
}

export default PostDelete