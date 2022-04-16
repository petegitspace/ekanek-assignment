import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import Cookies from 'universal-cookie';
import { useState } from 'react';
import axiosInstance from '../../utils/axios';
import Menu from '../Menu/Menu';

function Upload() {

    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState();
  const [error, setError] = useState();

  const handleChange = (e)=>{
    const {name, value} = e.target;
        this.setState({
                [name]: value
        });
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    const cookies = new Cookies();
    let userid = cookies.get('userid');
    let formData = new FormData();
    formData.append("file", selectedFiles[0]);
    //console.log(userid);
    formData.append("title", title.target.value);
    formData.append("description", description.target.value);
    formData.append("user_id", userid);
    axiosInstance
      .post("/downloads/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setProgress(Math.round(100 * (data.loaded / data.total)));
        },
      })
      .catch((error) => {
        const code = error?.response?.data?.code;
        switch (code) {
          case "FILE_MISSING":
            setError("Please select a file before uploading");
            break;
          case "LIMIT_FILE_SIZE":
            setError("File size is too large. Please upload files below 1GB!");
            break;
          case "INVALID_TYPE":
            setError(
              "This file type is not supported. Only .png, .jpg, .jpeg and .pdf files are allowed"
            );
            break;
          default:
            setError("Sorry, something went wrong");
            break;
        }
      });
  }

  return (
    <div className="App">
       <Container>
        <Menu></Menu>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="text" onChange={setTitle} name="title" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="text" onChange={setDescription} name="description" placeholder="Description" />
                </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              {!error && progress && (
                <ProgressBar now={progress} label={`${progress}%`} />
              )}
              <Form.Group className="mb-3" style={{marginTop:30}}>
                <Button variant="primary" type="submit">
                  Upload
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Text className="text-muted">
                            PDF, JPG and PNG allowed with 1 GB limit.
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Upload;
