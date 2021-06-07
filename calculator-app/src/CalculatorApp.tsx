import { Col, Container, Row } from "react-bootstrap";
import Display from "./components/Display";
import Keypad from "./components/Keypad";

const CalculatorApp = () => {
    return <Container>
            <br/>
            <Row className="justify-content-md-center"><Col sm={{ span: '6', offset: 1 }}><Display /></Col></Row>
            <Row className="justify-content-md-center"><Col sm={{ span: '6', offset: 1 }}><Keypad /></Col></Row>
    </Container>
}

export default  CalculatorApp;