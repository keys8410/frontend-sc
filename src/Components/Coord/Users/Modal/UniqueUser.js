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
import { FaMobileAlt, FaUserTie } from 'react-icons/fa';
import useFetch from '../../../../Hooks/useFetch';
import Error from '../../../Helpers/Error';
import { cpfMask, phoneMask } from '../../../Helpers/Masks';
import { getUniqueUser } from '../../../../Services/Users';
import Sectors from '../../../Sectors/Sectors';
import Genders from '../../../Genders/Genders';
import { CrudContext } from '../../../Contexts/CrudContext';
import { useToasts } from 'react-toast-notifications';

const UniqueUser = ({ idUser }) => {
  console.log(idUser);

  const [name, setName] = React.useState('');
  const [sector, setSector] = React.useState('1');
  const [email, setEmail] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [gender, setGender] = React.useState('2');
  const [phone, setPhone] = React.useState('');

  const [show, setShow] = React.useState(false);

  const { request, loading, data } = useFetch();

  const handleClick = async () => {
    const { res } = await request(getUniqueUser(idUser));

    if (res && res.status === 200) {
      setName(res.data.user.name);

      setSector(res.data.user.sector.toString());
      setEmail(res.data.user.email);
      setCpf(cpfMask(res.data.user.cpf));
      setGender(res.data.user.sector.toString());
      setPhone(phoneMask(res.data.user.phone));
      handleShow();
    }
  };

  console.log(gender);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="border-0" variant="none" onClick={handleClick}>
        <FaUserTie className="text-black" />
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">
            {`${name} - ${idUser}`}
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} md={8} controlId="name">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  placeholder="Nome Completo"
                  className="text-capitalize"
                  value={name}
                  readOnly
                />
              </Form.Group>

              <Form.Group as={Col} controlId="sector">
                <Form.Label>Setor</Form.Label>
                <Form.Control as="select" disabled>
                  <option value="1">{sector}</option>
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
                  value={email}
                  readOnly
                />
              </InputGroup>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CPF"
                  maxLength="14"
                  value={cpf}
                  readOnly
                />
              </Form.Group>

              <Form.Group as={Col} controlId="gender">
                <Form.Label>Sexo</Form.Label>
                <Form.Control as="select" defaultValue={gender} disabled>
                  <option value="1">{gender}</option>
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
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default UniqueUser;
