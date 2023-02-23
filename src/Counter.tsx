import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function Counter(props : {initial: number}) {
    const {initial} = props;
    const [count, setCount] = useState(initial);
    return (
        <Container>
            <Row>
                <Col>
                    <Button onClick={() => setCount(count - 1)}>
                        {"-1"}
                    </Button>
                </Col>
                <Col>
                    <p><strong>
                        {`${count}`}
                    </strong></p>
                </Col>
                <Col>
                    <Button onClick={() => setCount(count + 1)}>
                        {"+1"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
