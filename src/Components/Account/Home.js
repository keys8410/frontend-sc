import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm="auto" xs="auto">
          <Card body style={{ width: '25rem' }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/forgot" element={<ForgotPassword />} />
            </Routes>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
