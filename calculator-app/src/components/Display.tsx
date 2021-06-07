import { useInjection } from "inversify-react";
import { Card, Form, FormLabel } from "react-bootstrap";
import { CalculatorStore } from "../stores/CalculatorStore";
import { observer } from 'mobx-react';
import { TYPES } from "../Types";

const Display = observer(() => {
    const store: CalculatorStore = useInjection(TYPES.CalculatorStore);
    return <Card className="text-right" style={{ height: '10rem'}}>
    <Card.Body className="card bg-light">
        <Form.Control plaintext readOnly className="display lg text-right" placeholder="0" value={store.inputExpression} />
        <hr/>
        <FormLabel className="text-right text-color-red"><b className="text-right">{store.result}</b></FormLabel>
    </Card.Body>
  </Card>
});

export default Display;