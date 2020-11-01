import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import cpfMask from '../Helpers/Masks';

const ResetPassword = () => {
  const [cpf, setCpf] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(cpf);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          placeholder="CPF"
          maxLength="24"
          value={cpf}
          onChange={({ target }) => setCpf(cpfMask(target.value))}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>

      {cpf}
    </Form>
  );
};

export default ResetPassword;
