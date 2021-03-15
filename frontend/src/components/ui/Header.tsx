import React, { useState } from 'react'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Here Items are not coming Inline
  return (
    <div className="outer-header">
      <Navbar className="inner-header" bg='light' expand='sm'>
        <Navbar.Brand href='/'>
          <img
            src='/MyLivingCityIcon.png'
            width='30'
            height='30'
            className='d-inline-block alight-top'
            alt="My Living City Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/ideas'>Ideas</Nav.Link>
            <Nav.Link href='/test'>Test</Nav.Link>
            {isLoggedIn ? (
              <>
                {/* <Navbar.Text> Fake Name</Navbar.Text> */}
                <Nav.Link href='/profile'>Profile</Nav.Link>
                <Nav.Link onClick={() => setIsLoggedIn(!isLoggedIn)}>Log out</Nav.Link>
              </>
            ) : (
              <Nav.Link>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
