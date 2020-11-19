import React from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FaKaaba } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { LayoutContext } from '../Components/Contexts/LayoutContext';
import { UserContext } from '../Components/Contexts/UserContext';

const Layout = ({ children }) => {
  const { collapsed, handleCollapse } = React.useContext(LayoutContext);
  const { data, error, loading, menuItens } = React.useContext(UserContext);

  if (loading) return null;
  else
    return (
      <Container className="bg-white" fluid>
        <Row>
          <div
            style={{ height: '100vh', position: 'sticky' }}
            className="p-0 m-0"
          >
            <ProSidebar collapsed={collapsed}>
              <Menu iconShape="square">
                <MenuItem icon={<FaKaaba />}>Dashboard</MenuItem>
                <SubMenu title="Components" icon={<FaKaaba />}>
                  {menuItens.items.map((iten) => (
                    <MenuItem key={iten}>{iten}</MenuItem>
                  ))}
                </SubMenu>
              </Menu>
            </ProSidebar>
          </div>

          <div>
            <Navbar bg="danger" variant="dark">
              <Button onClick={handleCollapse}>Collapse</Button>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Navbar>
            <Container fluid className="w-100">
              {children}
            </Container>
          </div>
        </Row>
      </Container>
    );
};

export default Layout;
