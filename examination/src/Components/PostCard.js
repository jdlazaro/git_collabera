import React from 'react'
import { Card ,Button } from 'react-bootstrap'

  const PostCard = (props) => {

    const {title, content,dateCreated, id} = props;
   
    
    const HandleViewButton = (id) =>
    {  
       
         props.HandleViewButton(id);
    }


    const HandleDeleteButton = (id) =>
    {  
        props.HandleDeleteButton(id);
    }


    const HandleEditButton = (id) =>
    { 
        props.HandleEditButton(id); 
    }








    return (  
                            <Card style={{marginBottom:'20px'}}>
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                    {content}
                                    </Card.Text>
                                    <Card.Subtitle className="mb-2 text-muted">{dateCreated}</Card.Subtitle>
                                   
                                   
                                    <Button variant="primary" size="sm" onClick={ () => { HandleViewButton(props.id); }}>View</Button> 
                            {' '}
                            <Button variant="primary"  size="sm" onClick={ () => { HandleEditButton(props.id); }}>Edit</Button> 
                            {' '}
                            <Button  variant="primary"   size="sm"  onClick={ () => { HandleDeleteButton(props.id); }}>Delete</Button>
                        
                                </Card.Body>
                            </Card>   
    )
}


export default PostCard