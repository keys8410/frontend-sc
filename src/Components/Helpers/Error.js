import React from 'react';
import { Form } from 'react-bootstrap';

const Error = ({ error }) => {
  if (!error) return null;

  return (
    <Form.Text variant="danger" className="text-danger m-0 p-0 text-right">
      {error}
    </Form.Text>
  );
};

export default Error;
