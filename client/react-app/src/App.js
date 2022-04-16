import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import Menu from './components/Menu/Menu';

function App() {
  return (
    <Container>
      <Menu></Menu>
      <Row>
        <Col lg={{ span: 6, offset: 3 }} style={{textAlignVertical: "center",textAlign: "center"}}>
          <img src={logo} className="ms-auto" style={{width: 200, height: 200}}  alt="logo" />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 6, offset: 3 }} style={{textAlignVertical: "center",textAlign: "center"}}>
          React app to store User Files
        </Col>
      </Row>
    </Container>
  );
}

export default App;
