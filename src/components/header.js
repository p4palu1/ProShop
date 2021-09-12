import React from 'react';
import { Route } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container, NavDropdown} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions"
import { withRouter } from 'react-router-dom';
import SearchBox from "./SearchBox"

const Header = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login');
    }

    return (
        <header>
              <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Route render={({history}) => <SearchBox history={history}/>} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart" >
                            <Nav.Link href="/cart">
                                <i className="fas fa-shopping-cart"></i> 
                                <span> Cart</span>
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>

                        ) : ( <LinkContainer to="/login" >
                            <Nav.Link href="/login">
                                <i className="fas fa-user"></i> 
                                <span> Sign In</span>
                            </Nav.Link>
                            </LinkContainer>
                        )
                        }


                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title="admin" id="adminmenu">
                                <LinkContainer to="/admin/userlist">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/productlist">
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orderlist">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>

                        )}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default withRouter(Header)
