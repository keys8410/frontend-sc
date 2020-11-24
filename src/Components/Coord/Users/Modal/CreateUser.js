import React from 'react';
import {
  Col,
  Form,
  InputGroup,
  Spinner,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaMobileAlt } from 'react-icons/fa';
import useFetch from '../../../../Hooks/useFetch';
import Error from '../../../Helpers/Error';
import { cpfMask, phoneMask } from '../../../Helpers/Masks';
import { postNewUser } from '../../../../Services/Users';
import { FaUserPlus } from 'react-icons/fa';
import Sectors from '../../../Sectors/Sectors';
import Genders from '../../../Genders/Genders';
import { CrudContext } from '../../../Contexts/CrudContext';
import { useToasts } from 'react-toast-notifications';

const CreateUser = () => {
  const { setCrud } = React.useContext(CrudContext);

  const [name, setName] = React.useState('');
  const [sector, setSector] = React.useState('1');
  const [email, setEmail] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [gender, setGender] = React.useState('2');
  const [phone, setPhone] = React.useState('');

  const [show, setShow] = React.useState(false);

  const { request, loading, data, jsonError, setJsonError } = useFetch();

  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request(postNewUser({ name, sector, email, cpf, gender, phone }));

    if (data && data.status === 200) {
      setCrud(true);
      handleClose();
      addToast(data.message, {
        appearance: 'success',
        autoDismiss: true,
      });

      setName('');
      setSector('1');
      setEmail('');
      setCpf('');
      setGender('2');
      setPhone('');
      setJsonError(null);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaUserPlus />
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Usuário</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} md={8} controlId="name">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  placeholder="Nome Completo"
                  value={name}
                  required
                  className="text-capitalize"
                  onChange={({ target }) => setName(target.value)}
                />
                <Error error={jsonError && jsonError.name} />
              </Form.Group>

              <Form.Group as={Col} controlId="sector">
                <Form.Label>Setor</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="1"
                  onChange={({ target }) => setSector(Number(target.value))}
                >
                  <Sectors />
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  id="email"
                  placeholder="Email"
                  className="text-lowercase"
                  required
                  onChange={({ target }) => setEmail(target.value)}
                />
              </InputGroup>
              <Error error={jsonError && jsonError.email} />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CPF"
                  maxLength="14"
                  required
                  value={cpf}
                  onChange={({ target }) => setCpf(cpfMask(target.value))}
                />
                <Error error={jsonError && jsonError.cpf} />
              </Form.Group>

              <Form.Group as={Col} controlId="gender">
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="2"
                  onChange={({ target }) => setGender(Number(target.value))}
                >
                  <Genders />
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label htmlFor="phone">Telefone</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaMobileAlt />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="phone"
                    placeholder="Telefone Celular"
                    value={phone}
                    maxLength="15"
                    required
                    onChange={({ target }) => setPhone(phoneMask(target.value))}
                  />
                </InputGroup>
                <Error error={jsonError && jsonError.phone} />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Cancelar
            </Button>

            {loading ? (
              <Button variant="danger" disabled type="submit" className="my-2">
                <Spinner animation="border" size="sm" />
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Enviar
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;
