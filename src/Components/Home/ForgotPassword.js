import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form, Spinner } from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';

import { postForgotPassword } from '../../Services/Auth';
import useFetch from '../../Hooks/useFetch';

import Error from '../Helpers/Error';
import Head from '../Helpers/Head';
import cpfMask from '../Helpers/Masks';

const ForgotPassword = () => {
  const [cpf, setCpf] = React.useState('');

  const { request, error, loading } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = window.location.href.replace('forgot', 'reset');

    const res = await request(postForgotPassword({ cpf, url }));

    window.localStorage.removeItem('tkn');
    window.localStorage.removeItem('sct');

    console.log(res);
  };

  return (
    <>
      <Head title="Esqueci a senha" />

      <div className="align-self-center text-center mb-4">
        <FaKey color="#333" size="65" />
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="CPF"
            maxLength="14"
            value={cpf}
            required
            onChange={({ target }) => setCpf(cpfMask(target.value))}
          />
        </Form.Group>

        <Row>
          <Col>
            {loading ? (
              <Button variant="danger" disabled type="submit" className="my-2">
                <Spinner animation="border" size="sm" />
              </Button>
            ) : (
              <Button variant="danger" type="submit" className="my-2">
                Entrar
              </Button>
            )}
          </Col>
          <Col className="align-self-center">
            <Error error={error} />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ForgotPassword;
