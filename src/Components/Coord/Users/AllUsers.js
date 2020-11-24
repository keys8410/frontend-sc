import React from 'react';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
import styles from './AllUsers.module.css';
import { FaEllipsisH } from 'react-icons/fa';
import { getAllUsers } from '../../../Services/Users';
import useFetch from '../../../Hooks/useFetch';
import { CrudContext } from '../../Contexts/CrudContext';
import DeleteUser from './Modal/DeleteUser';
import UniqueUser from './Modal/UniqueUser';
import EditUser from './Modal/EditUser';

const AllUsers = () => {
  const [users, setUsers] = React.useState(null);

  const { crud, setCrud } = React.useContext(CrudContext);
  const { request, error, loading } = useFetch();

  React.useEffect(() => {
    const getUsers = async () => {
      if (crud) {
        const { res } = await request(getAllUsers());

        setUsers(res.data.users);
      }

      setCrud(false);
    };

    getUsers();
  }, [crud, request, setCrud]);

  /**
   * FINALIZAR CRUD
   * - read all: OK!
   * - create one: OK!
   * - read one: ??
   * - update one: ??
   * - delete one: ??
   */

  return (
    <>
      {users &&
        users.map((user) => (
          <Card key={user.id} className={`${styles.cards} shadow-sm p-0`}>
            <Card.Body className="pl-2 pt-3 pb-0 m-0">
              <Row>
                <Col xs={8}>
                  <Card.Title
                    className="h5 d-inline-block text-truncate text-capitalize px-0 mb-0 mt-2"
                    style={{ maxWidth: '14.8rem', lineHeight: '1.5' }}
                    title={user.name}
                  >
                    <span className="text-capitalize">{user.name}</span>
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 small text-capitalize text-muted"
                    title={`Setor ${user.sector}`}
                  >
                    {user.sector}
                  </Card.Subtitle>
                </Col>

                <Col className={styles.dropright}>
                  <Dropdown drop={'right'} className="mr-1">
                    <Dropdown.Toggle
                      className={`btn btn-outline-dark ${styles.btnCard} shadow-sm py-0 rounded-0 border border-dark`}
                      id="dropdown-basic"
                      title="Ver mais"
                    >
                      <FaEllipsisH />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="border border-dark shadow-sm p-1">
                      <UniqueUser idUser={user.id} />

                      <Dropdown.Divider className="my-1 p-0" />

                      <EditUser />

                      <Dropdown.Divider className="my-1 p-0" />

                      <DeleteUser />
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Card.Body>

            <hr className="m-0 p-0" />

            <Card.Body className="py-2 pl-2 m-0">
              <p
                className={`${styles.firstLetter} m-0 pb-0 first-letter text-truncate small text-muted`}
                style={{ maxWidth: '15rem', lineHeight: '1.4' }}
                title={user.about}
              >
                {user.about}
              </p>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default AllUsers;
