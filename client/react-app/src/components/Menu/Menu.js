import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Nav,
} from "react-bootstrap";

class Menu extends React.Component{
    
    handleLogout = (e) => {
        //const navigate = useNavigate();
        const cookies = new Cookies();
        cookies.set('userid', '', { path: '/' });
        window.location.href = '/';
    }

    render(){
        const cookies = new Cookies();
        let isLoggedId = cookies.get('userid');

        return(
        <Nav>
            <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                {isLoggedId == "" ? 
                    null : 
                <Nav.Link eventKey="link-fileupload" href="/fileupload">File upload</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {isLoggedId == "" ? 
                    null : 
                <Nav.Link eventKey="link-files" href="/files">Files</Nav.Link>}
            </Nav.Item>
            <Nav.Item className="ms-auto" >
                {isLoggedId == "" ? 
                <Nav.Link eventKey="link-in" href="/login">Login</Nav.Link> : 
                <Nav.Link eventKey="link-logout" onClick={()=> this.handleLogout()}>Logout</Nav.Link>}
            
            </Nav.Item>
        </Nav>
        )
    }
}

export default Menu;