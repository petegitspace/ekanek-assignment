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

class Files extends React.Component{
  
    constructor(props) {
      super(props);
      this.state = {
        edit: false,
        id: null,
        mockData: []
      }
    }
    componentDidMount(){
      this.getfiles();
    }

    getfiles(){
      try {
        // make axios post request
        const response = axiosInstance({
          method: "get",
          url: "/downloads/userlist/1",
          headers: { "Content-Type": "application/json" },
        }).then(res => {
            //console.log(res);
            console.log(res.data.data);
            this.setState({
              mockData: res.data.data
            });
          });
      } catch(error) {
        console.log(error)
      }
    }
    
    onDeleteHandle() {
      let id = arguments[0];
      let name = arguments[1];
      // console.log(arguments);
      // return;

      try {
        // make axios post request
        const response = axiosInstance({
          method: "delete",
          url: "/downloads/"+id+"/"+name,
          headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res.data.data);

            this.setState({
              mockData: this.state.mockData.filter(item => {
                if (item.id !== id) {
                  return item;
                }
              })
            });

          });
      } catch(error) {
        console.log(error)
      }

    }

    render(){
        //console.log(this.userid);
        if(this.userid == ""){
            return <Navigate to="/login" />;
        }
        return(
          <Container>
          <Menu></Menu>
          <Row>
            <Col lg={{ span: 12 }}>
            <ul>
              <Row style={{ padding: 10}}>
                  <Col lg={{ span: 3}}><b>Title</b></Col>
                  <Col lg={{ span: 8 }}><b>Description</b></Col>
                  <Col lg={{ span: 1 }}></Col>
                </Row>
              {this.state.mockData.map(item => (
                <Row key={item.id} style={{ padding: 10}}>
                  <Col lg={{ span: 3}}>{item.title}</Col>
                  <Col lg={{ span: 8 }}>{item.description}</Col>
                  <Col lg={{ span: 1 }}><button onClick={this.onDeleteHandle.bind(this, item.id, item.name)}>Delete</button></Col>
                  
                </Row>
              ))}
            </ul>
            </Col>
          </Row>
          </Container>
        )
    }
}

export default Files;