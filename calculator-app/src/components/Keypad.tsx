import { useInjection } from "inversify-react";
import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import {CalculatorStore} from "../stores/CalculatorStore";
import { observer } from 'mobx-react';

const Keypad = () => {
    const store = useInjection(CalculatorStore);

    const lastInputValue = () => store.inputExpression.slice((store.inputExpression.length - 1), store.inputExpression.length);

    const isOperator = (expr: string) => expr.includes("+") || expr.includes("-") || expr.includes("*") || expr.includes("/") || expr.includes(".") || expr.includes("=");

    const setExpression = (event: any) => {
        const lastInput = lastInputValue();
        const currentInput = event.target.value as string;
        
        if(isOperator(lastInput) && isOperator(currentInput)) {
            store.setExpression(store.inputExpression.substring(0, store.inputExpression.length - 1) + currentInput);
        }
        else if(store.inputExpression === "0") store.setExpression(currentInput);
        else store.setExpression(store.inputExpression + currentInput);
    };

    return <Container>
    <br/>
    <Row><Button variant="primary" size="lg" block onClick={() => store.clearExpression() }>Clear</Button></Row> <br/>
    <Row>
      <ButtonGroup size="lg" className="mb-2">
          <Button variant="primary" size="sm" className="btn-num" value={1} onClick={setExpression}>1</Button>
          <Button variant="primary" size="sm" className="btn-num" value={2} onClick={setExpression}>2</Button>
          <Button variant="primary" size="sm" className="btn-num" value={3} onClick={setExpression}>3</Button> &nbsp;
          <Button variant="primary" size="sm" className="btn-num" value={"/"} onClick={setExpression}> / </Button>
      </ButtonGroup>
    </Row>

      <Row>
          <ButtonGroup size="lg" className="mb-2">
              <Button variant="primary" size="sm" className="btn-num" value={4} onClick={setExpression}>4</Button>
              <Button variant="primary" size="sm" className="btn-num" value={5} onClick={setExpression}>5</Button>
              <Button variant="primary" size="sm" className="btn-num" value={6} onClick={setExpression}>6</Button> &nbsp;
              <Button variant="primary" size="sm" className="btn-num" value={"+"} onClick={setExpression}>+</Button>
          </ButtonGroup>
      </Row>

      <Row>
          <ButtonGroup size="lg" className="mb-2">
              <Button variant="primary" size="sm" className="btn-num" value={7} onClick={setExpression}>7</Button>
              <Button variant="primary" size="sm" className="btn-num" value={8} onClick={setExpression}>8</Button>
              <Button variant="primary" size="sm" className="btn-num" value={9} onClick={setExpression}>9</Button> &nbsp;
              <Button variant="primary" size="sm" className="btn-num" value={"-"} onClick={setExpression}>-</Button>
          </ButtonGroup>
      </Row>

      <Row>
          <ButtonGroup size="lg" className="mb-2">
              <Button variant="primary" size="sm" className="btn-num" value={"."} onClick={setExpression}>.</Button>
              <Button variant="primary" size="sm" className="btn-num" value={0} onClick={setExpression}>0</Button>
              <Button variant="primary" size="sm" className="btn-num" value={"="} onClick={setExpression}>=</Button> &nbsp;
              <Button variant="primary" size="sm" className="btn-num" value={"*"} onClick={setExpression}>x</Button>
          </ButtonGroup>
      </Row>

      <ButtonGroup size="lg" className="mb-2" vertical>
      </ButtonGroup>
  </Container>
};

export default observer(Keypad);