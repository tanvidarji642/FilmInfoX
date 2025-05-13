// import React from 'react';
// import { Navbar, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Header = () => {
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Navbar.Brand as={Link} to="/">MovieFlix</Navbar.Brand>
//             <Nav className="mr-auto">
//                 <Nav.Link as={Link} to="/popular">Popular</Nav.Link>
//                 <Nav.Link as={Link} to="/top-rated">Top Rated</Nav.Link>
//                 <Nav.Link as={Link} to="/now-playing">Now Playing</Nav.Link>
//                 <Nav.Link as={Link} to="/upcoming">Upcoming</Nav.Link>
//             </Nav>
//         </Navbar>
//     );
// };

// export default Header;
import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <Navbar 
            bg="dark" 
            variant="dark" 
            expand="lg" 
            className="py-3 shadow-sm"
            expanded={expanded}
            onToggle={setExpanded}
        >
            <Container fluid>
                <Navbar.Brand 
                    as={Link} 
                    to="/" 
                    className="fw-bold fs-4 me-auto"
                    onClick={() => setExpanded(false)}
                >
                    <span className="text-danger">Film</span>
                    <span className="text-light">InfoX</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="d-flex align-items-center">
                        <Nav.Link 
                            as={Link} 
                            to="/popular" 
                            className="mx-2 fw-semibold"
                            onClick={() => setExpanded(false)}
                        >
                            Popular
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/top-rated" 
                            className="mx-2 fw-semibold"
                            onClick={() => setExpanded(false)}
                        >
                            Top Rated
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/now-playing" 
                            className="mx-2 fw-semibold"
                            onClick={() => setExpanded(false)}
                        >
                            Now Playing
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/upcoming" 
                            className="mx-2 fw-semibold"
                            onClick={() => setExpanded(false)}
                        >
                            Upcoming
                        </Nav.Link>
                    </Nav>
                    
                    {/* <Form className="d-flex ms-3">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Search movies..."
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="danger">
                                <Search />
                            </Button>
                        </InputGroup>
                    </Form>
                     */}
                    {/* <Nav className="ms-3">
                        <Button 
                            variant="outline-light" 
                            size="sm"
                            onClick={() => setExpanded(false)}
                        >
                            Sign In
                        </Button>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;