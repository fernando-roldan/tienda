import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function GuestLayout() {
    const {token} = useStateContext()

    if(token) {
        
        return <Navigate to={'/admin'} />
    }
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/tienda">Tienda</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                </Nav>
                <Nav>
                  <Nav.Link href="/login">login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className='bg-secondary-subtle'>
            <Outlet />
        </div>
        
    </div>
  )
}

export default GuestLayout