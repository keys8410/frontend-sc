import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import LoginForm from './LoginForm';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Login = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>

      <Row>
        <Col>
          <Card body>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/forgot" element={<ForgotPassword />} />
            </Routes>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
