import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Ratio from 'react-bootstrap/Ratio';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

export const App: React.FC<{}> = (props: {}) => {
  return (
    <>
      <Nav defaultActiveKey="link-0"  className="justify-content-center text-bg-dark" as="ul">
        <Nav.Item as="li">
          <Nav.Link eventKey="link-0">
						<Link to="/">
							About
						</Link>
					</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
						<Link to="/example/">
							Example
						</Link>
					</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">
						<Link to="/err/">
							Err404
						</Link>
					</Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" element={<Hello />}>
          <Route path="" element={<AboutMe />} />
          <Route path="example/" element={<Example />} />
          <Route path="*" element={<Err404 />} />
        </Route>
      </Routes>
    </>
  );
};

const Hello: React.FC<{}> = (props: {}) => {
  return (
    <>
      <header className="p-4 mb-4 border-3 border-bottom">
        <h1>
          Hi there! 👋
        </h1>
      </header>
      <Outlet />
    </>
  );
};

const AboutMe: React.FC<{}> = (props: {}) => {
  return (
    <main>
      <div className="ms-4">
        I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
        I program mainly in Haskell, Rust, and Python.<br/>
        I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
      </div>
    </main>
  );
};

const Example: React.FC<{}> = (props: {}) => {
  const Letter = (props: {s: string}) => {
		const {s} = props;
		return (
			<Ratio aspectRatio={"1x1"}>
				<Container className="m-0 p-0 text-bg-light rounded">
					<div className="position-absolute top-50 start-50 translate-middle">
						{s}
					</div>
				</Container>
			</Ratio>
		);
  };
	const MyCol = (props: {children: JSX.Element[] | JSX.Element }) => {
		const {children} = props;
		return (
			<Col className="m-0 p-0 me-2">
				{children}
			</Col>
		);
	};
	const MyColEnd = (props: {children: JSX.Element[] | JSX.Element }) => {
		const {children} = props;
		return (	
			<Col className="m-0 p-0">
				{children}
			</Col>
		);
	};
	const MyRow = (props: {children: JSX.Element[] | JSX.Element }) => {
		const {children} = props;
		return (
			<Row className="m-0 p-0 mb-2">
				{children}
			</Row>
		);
	};
	const MyRowEnd = (props: {children: JSX.Element[] | JSX.Element }) => {
		const {children} = props;
		return (
			<Row className="m-0 p-0">
				{children}
			</Row>
		);
	};
  return (
    <Container className="p-2 mb-3 text-bg-dark rounded">
			<MyRow>
				<MyCol>
					<Letter s="A" />
				</MyCol>
				<MyCol>
					<Letter s="B" />
				</MyCol>
				<MyColEnd>
					<Letter s="C" />
				</MyColEnd>
			</MyRow>
			<MyRow>
				<MyCol>
					<Letter s="D" />
				</MyCol>
				<MyCol>
					<Letter s="E" />
				</MyCol>
				<MyColEnd>
					<Letter s="F" />
				</MyColEnd>
			</MyRow>
			<MyRowEnd>
				<MyCol>
					<Letter s="G" />
				</MyCol>
				<MyCol>
					<Letter s="H" />
				</MyCol>
				<MyColEnd>
					<Letter s="I" />
				</MyColEnd>
			</MyRowEnd>
    </Container>
  );
};

const Err404: React.FC<{}> = (props: {}) => {
  return (
    <main>
      <div className="ms-4">
        <h2>
          Error 404!
        </h2>
        The page you are looking for does not exist!<br/>
        Check if your URL is correct.
      </div>
    </main>
  );
};

export default App;
