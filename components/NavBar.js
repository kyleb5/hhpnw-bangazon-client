/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Image style={{ marginRight: '25px' }} src="https://i.imgur.com/RwB717Y.jpg" width={64} height={64} roundedCircle />
        <Link passHref href="/">
          <Navbar.Brand>Hip Hop Pizza N Wings</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/view-order">
              <Nav.Link>View Orders</Nav.Link>
            </Link>
            <Link passHref href="/create-order">
              <Nav.Link>Create Order</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>Revenue</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Button variant="danger" onClick={signOut} className="ms-auto">
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
