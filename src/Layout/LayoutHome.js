import React from 'react';
import { Card, Col, Container, Figure, Row } from 'react-bootstrap';
import Logo from '../Assets/Logo.png';

const LayoutHome = ({ children }) => {
  return (
    <Container fluid>
      <Row className="justify-content-center bg-white">
        <Col sm="auto" xs="auto">
          <Figure>
            <Figure.Image src={Logo} width={380} className="pt-4 pb-1" />
          </Figure>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ height: '75vh' }}>
        <Col sm="auto" xs="auto" className="align-self-center">
          <Card body style={{ width: '22rem' }} className="p-0">
            {children}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutHome;
