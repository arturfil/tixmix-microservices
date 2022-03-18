import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  
  return (
    <Navbar className="header" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">Tixmix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/games">
              <a>Games</a>
            </Link>
            <Link href="/fields">
              <a>Fields</a>
            </Link>
          </Nav>
          <Nav>
            <Link href="/auth/signin">
              <a>Sign In</a>
            </Link>
            <Link href="/auth/signup">
              <a>Sign Up</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
