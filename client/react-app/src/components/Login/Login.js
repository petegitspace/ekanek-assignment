import React, { useState } from "react";
import  { BrowserRouter, Navigate, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Col,
    Container,
    Row,
    Form,
    Button,
  } from "react-bootstrap";
  import axiosInstance from '../../utils/axios';
import Menu from "../Menu/Menu";

class Login extends React.Component{
    userid = "";
    state={
        email:'',
        password:'',
        isLoggedIn:false,
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
                [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        cookies.set('userid', '', { path: '/' });
        //console.log(cookies.get('userid'));
        let postData = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            // make axios post request
            const response = axiosInstance({
              method: "post",
              url: "/users/login",
              data: postData,
              headers: { "Content-Type": "application/json" },
            }).then(res => {
                //console.log(res);
                console.log(res.data.message);
                cookies.set('userid', res.data.message, { path: '/' });
                this.userid = res.data.message;
                e.target.submit();
              });
          } catch(error) {
            console.log(error)
          }
    }

    render(){
        console.log(this.userid);
        if(this.userid != ""){
            return <Navigate to="/fileupload" />;
        }
        return(

            <Container>
                <Menu></Menu>
                
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={this.handleChange} name="email" placeholder="Email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.handleChange} name="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login;