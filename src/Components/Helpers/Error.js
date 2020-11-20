import React from 'react';
import { Form, Toast } from 'react-bootstrap';

const Error = ({ error }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (error) setShow(true);
  }, [error]);

  if (!error) return null;

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={2200}
      autohide
      className="shadow-sm"
    >
      <Toast.Body>
        <Form.Text variant="danger" className="text-danger m-0 p-0 text-right">
          {error}
        </Form.Text>
      </Toast.Body>
    </Toast>
  );
};

export default Error;
