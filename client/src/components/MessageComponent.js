import React, {useState} from 'react';
import { Input,Card, CardBody, CardText, Row ,Col,Media, Button, Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap';

const Message = (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const message = props.message.map((message) => {
        return(
            
            <Row key={message.id} className="d-flex flex-grow-1 bd-highlight m-5" >
                <Card className="d-flex flex-grow-1 bd-highlight message">
                    <CardBody className="messagecontent  m-3">
                        <CardText>
                            <Row>
                                <Col md="auto" className="d-flex flex-grow-1 m-3">   
                                    <h4 >{message.content}</h4>
                                </Col>
                            </Row>                
                        </CardText>
                    </CardBody>
                    <Row className="p-3"> 
                            <Col md="6" className="d-flex flex-grow-1">
                                <Row className="d-flex align-items-center ">
                                    <Col>
                                    <Media object src={message.senderImage} alt="sender" className="profileimg" />
                                    </Col>
                                    <Col>
                                        <h5 className="pt-2">{message.sender}</h5>
                                        <h6>{message.time}</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6" className="d-flex flex-grow-1 ">
                                <button onClick={toggle} className="d-flex flex-grow-1 btn align-items-center justify-content-center"><h5><i className="fa fa-reply" style={{color:  "#ebecf0"}} onClick={() => props.onClickMinus(message.id)}></i>  reply</h5></button> 
                            </Col>                            
                    </Row>
                </Card>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Your Reply</ModalHeader>
                    <ModalBody>
                        <Row className="m-3">
                            <Input rows="6" type="textarea" className="messagecontent" name="text" id="exampleText" />
                        </Row>
                        
                        <Row className="mt-3">
                            <Col className="d-flex flex-row-reverse">
                                <Button  className="d-flex flex-grow-1 btn align-items-center justify-content-center" color="secondary" onClick={toggle}>Cancel</Button>
                            </Col> 
                            <Col className="d-flex flex-row-reverse">
                                <Button className="d-flex flex-grow-1 btn align-items-center justify-content-center" color="primary" onClick={toggle}>Send</Button>{' '}
                            </Col>    
                        </Row>  
                    </ModalBody>   
                </Modal>
            </Row> 
        )
    })
    return(
        <>
        {message}
        </>
    )
    
}



export default Message