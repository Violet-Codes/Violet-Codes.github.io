import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

export const App: React.FC<{}> = (props: {}) => {
  return (
    <>
      <Nav defaultActiveKey="link-0"  className="justify-content-center text-bg-dark" as="ul">
        <Nav.Item as="li">
          <Nav.Link eventKey="link-0">Foo</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">Bar</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">Qux</Nav.Link>
        </Nav.Item>
      </Nav>
      <header className="p-4 mb-4 border-3 border-bottom">
        <h1>
          Hi there! 👋
        </h1>
      </header>
      <main>
        <div className="ms-4">
          I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
          I program mainly in Haskell, Rust, and Python.<br/>
          I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
        </div>
      </main>
    </>
  );
}

export default App;
