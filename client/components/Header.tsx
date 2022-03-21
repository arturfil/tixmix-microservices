import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import buildClient from "../api/buildClient";
import { User } from "../interfaces/User";
import NavLink from "./NavLink";

interface Props {
  currentUser?: User | null;
}

const Header = ({ currentUser }: Props) => {
  return (
    <Navbar className="header" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">Tixmix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink path="/" title="Home" />
            <NavLink path="/about" title="About" />
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <p>{currentUser?.email} </p>
                <button className="btn btn-dark">Sign Out</button>
              </>
            ) : (
              <>
                <NavLink path="/auth/signin" title="Sign In" />
                <NavLink path="/auth/signup" title="Sign Up" />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
