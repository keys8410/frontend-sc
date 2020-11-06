import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import { Card, Col, Container, Row, Figure } from 'react-bootstrap';
import Logo from '../../Assets/Logo.png';

const Home = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center bg-white">
        <Col sm="auto" xs="auto">
          <Figure>
            <Figure.Image src={Logo} width={380} className="pt-4 pb-1" />
          </Figure>
        </Col>
      </Row>
      <hr className="bg-danger p-1 w-100 m-0" />

      <Row className="justify-content-center" style={{ height: '75vh' }}>
        <Col sm="auto" xs="auto" className="align-self-center">
          <Card body style={{ width: '22rem' }} className="p-0">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/reset/*" element={<ResetPassword />} />
            </Routes>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
