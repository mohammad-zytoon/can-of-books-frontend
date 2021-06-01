import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class BookFormModal extends React.Component{
    


    render(){
        return(
            <>
            { this.props.showAddModel && 
                
                <>
                    <Modal.Dialog>
                        <Modal.Header onClick={this.props.hideModal} closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
    
                        <Modal.Body>
                           
                            <Form onSubmit={e=> this.props.addToDataBase(e)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Book Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Name" onChange={e=> this.props.bookName(e)} />
                                    
                                </Form.Group>
    
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description" onChange={e=> this.props.Description(e)}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Image URL" onChange={e=> this.props.ImageURL(e)} />
                                </Form.Group>                                

                                <Button variant="primary" type="submit"  >
                                    Submit
                                </Button>

                            </Form>
                        </Modal.Body>
    
                        <Modal.Footer>
                            <Button onClick={this.props.hideModal} variant="secondary">Close</Button>
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
    
                </>
            }
            </>

        )
    }

}
export default BookFormModal