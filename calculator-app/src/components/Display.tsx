import { useInjection } from "inversify-react";
import { Card, Form } from "react-bootstrap";
import { CalculatorStore } from "../stores/CalculatorStore";
import { observer } from 'mobx-react';

const Display = observer(() => {
    const store = useInjection(CalculatorStore);
    return <Card className="text-right">
    <Card.Body>
        <Form.Control plaintext readOnly className="display lg text-right" placeholder="0" value={store.inputExpression} />
        <hr/>
        {store.result}
    </Card.Body>
  </Card>
});

export default Display;