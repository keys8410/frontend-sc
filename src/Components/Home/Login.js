import React from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import Error from '../Helpers/Error';
import { FaUsers } from 'react-icons/fa';
import Head from '../Helpers/Head';

const Login = () => {
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');

  const { userLogin, error, loading } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    userLogin({ login, pass });
  };

  return (
    <>
      <Head title="Login" />
      <div className="align-self-center text-center mb-4">
        <FaUsers color="#333" size="75" />
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>teste</Form.Label>
          <Form.Control
            type="text"
            placeholder="Login"
            required
            onChange={({ target }) => setLogin(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Senha"
            required
            onChange={({ target }) => setPass(target.value)}
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

        <p className="my-0 mt-3 text-center">
          <Link to="/forgot" className="text-muted">
            Esqueceu sua senha?
          </Link>
        </p>
      </Form>
    </>
  );
};

export default Login;
