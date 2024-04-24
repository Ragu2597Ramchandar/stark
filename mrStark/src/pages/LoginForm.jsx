import React, { useState,useEffect } from 'react';
import { Card, Form, Button, Alert, Col, Row, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import login from '../img/login.svg';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { PiEyeClosedBold, PiEyeClosedDuotone } from 'react-icons/pi';


const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = fetchVoices;
    fetchVoices(); // Fetch voices initially
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    try {
      const response = await axios.post('http://localhost:4002/login', formData);
      console.log('Login successful:', response.data.user);
      toast.success(`Logged In Succesfully ${response.data.user.username}`, { theme: "colored" });
      const speech = new SpeechSynthesisUtterance(`welcome ${response.data.user.username}`);
      const femaleVoice = voices.find((voice) => voice.name === 'Google UK English Female'); // Adjust the voice name based on your preference
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }
      window.speechSynthesis.speak(speech);
      // Pass the entire user object to the onLogin function
      onLogin(response.data.user);
      setTimeout(() => {
        // Navigate to home page
        navigate('/');
      }, 5000);
    } catch (error) {
      toast.error(error.response.data, { theme: "colored" });
      console.error('Login failed:', error.response.data);
      setErrors(error.response.data);
    }
  };

  return (
    <>
    <Row>
    <Col md={6}>
      <Image src={login}/>
    </Col>
    <Col md={4}>
    <Card className="p-4  mt-5 bg-body-tertiary">
        <Card.Body>
          <h2 className="text-center mb-4 ">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className={formTouched && !formData.email ? 'border border-danger' : ''}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
           <div className="password-input">
           <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={formTouched && !formData.password ? 'border border-danger placeholder-red' : ''}
              />
                <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <RiEyeFill /> : <PiEyeClosedDuotone/>  }
    </div>
           </div>
              {errors.message && <Alert variant="danger" className='mt-3 text-danger text-center bg-light fw-bold'>{errors.message}</Alert>}
            </Form.Group>
            <Button type="submit" className="w-100 mt-4 stark-bg ">
              Login
            </Button>
          </Form>
          <h6 className='text-center mt-3'>Don't Have An Account</h6>
          <Link to={'/signup'} className='btn  form-control stark-bg text-white'>Register</Link>
        </Card.Body>
      </Card>
    </Col>
    </Row>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
