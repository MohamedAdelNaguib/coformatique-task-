import React, { Component } from 'react';
import { Container, Nav, NavItem ,Col,Row, Button, Modal, ModalHeader,ModalBody,NavLink, Navbar} from 'reactstrap';
import Message from './MessageComponent'
import {MESSAGES} from '../shared/messages'

class GuestBook extends Component{
    constructor(props){
        super(props)
        this.state ={
            messages: MESSAGES
        }
    }
    Seen(messageID){
        const UpdatedMessages = this.state.messages
        UpdatedMessages[messageID].seen = true
        this.setState({messages:UpdatedMessages})
    }
    render(){
        return(
            <Container style={{backgroundColor:"#ebecf0" ,fontFamily:"sans-serif"}}>
                <Navbar className="navbar sticky-top">
                    <Nav className="d-flex flex-grow-1"> 
                        <Row className="d-flex flex-grow-1">
                            <Col className="d-flex align-items-center justify-content-center">
                                <NavItem >
                                    <NavLink href="/components/"><Row className="d-flex align-items-center"><i className="fa fa-paper-plane mr-2" style={{color:"white"}}></i><h6 className="mt-2" style={{color:"white"}}>SENT</h6></Row></NavLink>
                                </NavItem>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-center">
                                <NavItem>
                                    <NavLink href="/components/"><Row className="d-flex align-items-center"><i className="fa fa-plus mr-2" style={{color:"white"}}></i><h6 className="mt-2" style={{color:"white"}}>NEW</h6></Row></NavLink>
                                </NavItem>
                            </Col>
                        </Row>  
                    </Nav>
                </Navbar>
                <Message message={this.state.messages} onClick={(messageID) => this.Seen(messageID)}/>
            </Container>
        )
    }
}



export default GuestBook