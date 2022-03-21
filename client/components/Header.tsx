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
          {currentUser && (
            <Nav>
              <h6 style={{marginRight: 5, marginTop: 5}}>Hi, {currentUser?.email}</h6>
            </Nav>
          )}
          <Nav>
            {currentUser ? (
              <>
                <button className="btn btn-outline-dark ">
                  <NavLink path="/auth/signout" title="Sign out"/>
                </button>
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
