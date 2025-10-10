import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { saveStudent } from "../../../utils/StudentService";
import FadeTransition from './FadeTransition';
import './fadetransition.css';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function Register() {
  const [student, setStudent] = useState({
    full_name: '',
    email: '',
    prn_no: '',
    roll_no: '',
    password: '',
    subscribe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!student.full_name) newErrors.full_name = 'Full Name is required';
    if (!student.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(student.email)) newErrors.email = 'Email is not valid';
    if (!student.prn_no) newErrors.prn_no = 'PRN is required';
    else if (student.prn_no <= 0) newErrors.prn_no = 'PRN should be a positive number';
    if (!student.roll_no) newErrors.roll_no = 'Roll Number is required';
    if (!student.password) newErrors.password = 'Password is required';
    else if (student.password.length < 8) newErrors.password = 'Password must contain at least 8 characters';
    if (!student.subscribe) newErrors.subscribe = 'You must accept the terms and conditions';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await saveStudent(student);
      if (response && response.message === 'Student saved successfully') {
        alert('Registration successful!');
        setStudent({ full_name: '', email: '', prn_no: '', roll_no: '', password: '', subscribe: false });
        setErrors({});
        navigate("/Login-Page");
      } else {
        alert('Failed to register student. Please try again.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert('A student with this email or PRN already exists.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
      <MDBContainer fluid>
        <FadeTransition in={showContent}>
          <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Student Sign Up</p>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user" size='lg' className="me-3" />
                    <MDBInput label='Your Name' id='form1' type='text' name='full_name' value={student.full_name} onChange={handleChange} className={`w-100 ${errors.full_name ? 'is-invalid' : ''}`} />
                  </div>
                  {errors.full_name && <p className="text-danger-custom">{errors.full_name}</p>}
                  
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope" size='lg' className="me-3" />
                    <MDBInput label='Your Email' id='form2' type='email' name='email' value={student.email} onChange={handleChange} className={`${errors.email ? 'is-invalid' : ''}`} />
                  </div>
                  {errors.email && <p className="text-danger-custom">{errors.email}</p>}

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="id-card" size='lg' className="me-3" />
                    <MDBInput label='PRN Number' id='form3' type='number' name='prn_no' value={student.prn_no} onChange={handleChange} className={`${errors.prn_no ? 'is-invalid' : ''}`} />
                  </div>
                  {errors.prn_no && <p className="text-danger-custom">{errors.prn_no}</p>}
                  
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="address-card" size='lg' className="me-3" />
                    <MDBInput label='Roll Number' id='form4' type='text' name='roll_no' value={student.roll_no} onChange={handleChange} className={`${errors.roll_no ? 'is-invalid' : ''}`} />
                  </div>
                  {errors.roll_no && <p className="text-danger-custom">{errors.roll_no}</p>}

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock" size='lg' className="me-3" />
                    <MDBInput label='Password' id='form5' type='password' name='password' value={student.password} onChange={handleChange} className={`${errors.password ? 'is-invalid' : ''}`} />
                  </div>
                  {errors.password && <p className="text-danger-custom">{errors.password}</p>}

                  <div className='mb-4'>
                    <MDBCheckbox name='subscribe' checked={student.subscribe} onChange={handleChange} id='flexCheckDefault' label='I accept all terms and conditions' />
                  </div>
                  {errors.subscribe && <p className="text-danger-custom mb-3">{errors.subscribe}</p>}

                  <MDBBtn className='mb-4' size='lg' onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </MDBBtn>

                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='/Exam-PNG-Pic.png' fluid />
                </MDBCol>

              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </FadeTransition>
      </MDBContainer>
    </StyledWrapper>
  );
}

// Styled Components for Glassmorphism Effect
const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  overflow: hidden;

  /* --- CHANGE HERE: GRADIENT BACKGROUND --- */
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 60%, #e2e8f0 100%);

  .card {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .h1, .form-label, .form-check-label {
    color: #fff !important;
  }
  
  .me-3 {
    color: #fff;
  }

  .form-control {
    background: rgba(255, 255, 255, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    border-radius: 10px !important;
    color: #fff !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    
    &:focus {
      border-color: rgba(255, 255, 255, 0.7) !important;
      background: rgba(255, 255, 255, 0.3) !important;
      box-shadow: none !important;
    }
  }

  .is-invalid {
    border-color: #ff7b7b !important;
  }

  .text-danger-custom {
    color: #ffcccc;
    width: 100%;
    text-align: center;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }

  .btn {
    font-weight: 600;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    }
  }

  .form-check-input {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    &:checked {
      background-color: #fff;
      border-color: #fff;
    }
  }
  
  @media (max-width: 991.98px) {
    .order-lg-2 {
      display: none !important;
    }
    .order-lg-1 {
      padding: 20px;
    }
  }
`;

export default Register;