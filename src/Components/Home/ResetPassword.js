import React from 'react';

import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';

import Form from 'react-bootstrap/Form';

import useFetch from '../../Hooks/useFetch';

import Head from '../Helpers/Head';
import cpfMask from '../Helpers/Masks';
import { postResetPassword } from '../../Services/Auth';
import Error from '../Helpers/Error';

const ResetPassword = () => {
  const [cpf, setCpf] = React.useState('');

  const { request, error, loading } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get('key');

    const { res } = request(postResetPassword({ cpf, resetToken }));

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

export default ResetPassword;
