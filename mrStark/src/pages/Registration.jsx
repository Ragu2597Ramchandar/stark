import React, { useState } from 'react';
import { Card, Form, Button, Alert, Col, Collapse, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer ,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import signUpImg from '../img/signup.svg';
import { RiEyeFill, RiEyeCloseFill, RiEyeCloseLine } from 'react-icons/ri';


const Registration = () => {

  const navigate = useNavigate('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false); // State to track whether the form has been touched/submitted
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear corresponding error message when the user makes changes
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true); // Set form as touched/submitted
    try {
      const response = await axios.post('http://localhost:4002/registration', formData);
      console.log('Registration successful:', response.data);
      toast.success(response.data.message, { theme: "colored" });
      setTimeout(() => {
        // Navigate to home page
        navigate('/login');
      }, 5000);
      // Clear form data after successful registration
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    } catch (error) {
      toast.error(error.response.data, {theme : "colored" });
      console.error('Registration failed:', error.response.data);
      // Set error messages returned from the backend
      setErrors(error.response.data);
    }
  };

  return (
   <>
 <Row md={12}>
 <Col md={6}>
    <Image src={signUpImg} />
   </Col>
   <Col md={4}>
   <Card className="p-4  mt-5  bg-body-tertiary mx-auto">
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              placeholder="Enter username"
              value={formData.username} 
              onChange={handleChange}
              className={formTouched && !formData.username ? 'border border-danger border- plholder-clr ' : ''} // Apply red border if form is touched/submitted and username is empty
            />
            {/* {errors.username && <Alert variant="danger">{errors.username.message}</Alert>} */}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              placeholder="Enter email" 
              value={formData.email} 
              onChange={handleChange} 
              className={formTouched && !formData.email ? 'border border-danger placeholder-red' : ''} // Apply red border if form is touched/submitted and email is empty
            />
            {/* {errors.email && <Alert variant="danger">{errors.email}</Alert>} */}
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
      {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />  }
    </div>
  </div>
  {/* {errors.password && <Alert variant="danger">{errors.password}</Alert>} */}
</Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className={formTouched && !formData.confirmPassword ? 'border border-danger placeholder-red' : ''} // Apply red border if form is touched/submitted and confirmPassword is empty
            />
            {errors.message && <Alert variant="danger" className='mt-3 text-center text-danger fw-bold bg-light'>{errors.message}</Alert>}
          </Form.Group>
          <Button type="submit" className="w-100 mt-4 signup-btn stark-bg">  
            Register
          </Button>
        </Form>
        <h6 className='mt-3'>Already a user ?<Link to={'/login'}>SignIn</Link></h6>
      </Card.Body>
    </Card>
   </Col>
 </Row>
    <ToastContainer />
   </>
  );
};

export default Registration;
