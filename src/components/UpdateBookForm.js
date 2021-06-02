import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class UpdateBookForm extends React.Component{


    render(){
        console.log(this.props.valueDatas)
        return(
            <>
                { this.props.updateFormShow && 
                
                    
                    <>
                        <Modal.Dialog>
                        <Modal.Header onClick={this.props.hideModal} closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
        
                            <Modal.Body>
                            
                                <Form onSubmit={e=> this.props.updateOnDataBase(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Book Name</Form.Label>
                                        <Form.Control type="text" placeholder={this.props.valueDatas[0].bookName} onChange={e=> this.props.bookName(e)} />
                                        
                                    </Form.Group>
        
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder={this.props.valueDatas[0].description} onChange={e=> this.props.Description(e)} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control type="text" placeholder={this.props.valueDatas[0].img} onChange={e=> this.props.ImageURL(e)} />
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
export default UpdateBookForm 

