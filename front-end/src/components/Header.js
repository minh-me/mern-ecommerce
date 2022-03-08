import { useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { CartDash, PersonFill } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'

import { authSelector } from '../redux/selectors'
import { getToken, getUser, logout } from '../redux/actions/authActions'

export const Header = () => {
  const { isLoggedIn, token, user } = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    isLoggedIn && dispatch(getToken())
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    if (token) {
      dispatch(getUser(token))
    }
  }, [dispatch, token])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>Online Shop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link className='d-flex align-items-center'>
                    <CartDash className='me-1' /> Cart
                  </Nav.Link>
                </LinkContainer>

                {user ? (
                  <NavDropdown title={user.name} id='username'>
                    <NavDropdown.Item as={NavLink} to='/profile'>
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    as={NavLink}
                    to='/sign-in'
                    className='d-flex align-items-center'
                  >
                    <PersonFill className='me-1' /> Join
                  </Nav.Link>
                )}

                {user && user.role === 'admin' && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <NavDropdown.Item as={NavLink} to='/admin/userlist'>
                      Users
                    </NavDropdown.Item>

                    <NavDropdown.Item as={NavLink} to='/admin/productlist'>
                      Products
                    </NavDropdown.Item>

                    <NavDropdown.Item as={NavLink} to='/admin/orderlist'>
                      Orders
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}
