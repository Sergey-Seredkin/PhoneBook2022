import React, {Component} from 'react';
import {Modal, ModalBody,ModalFooter,Button,ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalExample1 from './modalRegistration';


class Login extends Component{
    constructor() {
        super(); 
        this.state ={modal: false,setModal: false,buttonLabel1:"Login"};   
        
    }
    handleSubmit = (name) => this.setState({name:name})
    render() {
       
        return(
            
            <div>                
              <ModalExample1 buttonLabel={this.state.buttonLabel1}/>  
            </div>
        );
    }
}

export default Login;