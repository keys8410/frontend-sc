import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import api from '../../Services/Api';

const Login = () => {
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post('auth/sign-in', { login, pass });

      console.log(data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          placeholder="Login"
          onChange={({ target }) => setLogin(target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Senha"
          onChange={({ target }) => setPass(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};

export default Login;
