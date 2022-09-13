import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as Styled from './CustomNavbar.style'

const CustomNavbar = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand>
          <Styled.CustomLink to='/'>Book tracker 📖</Styled.CustomLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='d-flex gap-5 me-auto'>
            <Styled.CustomLink to='/'>View book list</Styled.CustomLink>
            <Styled.CustomLink to='/add-book'>Add book</Styled.CustomLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
