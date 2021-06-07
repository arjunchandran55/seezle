import { injectable } from "inversify";
import { observable, action, makeObservable } from "mobx";
import {config} from "../config/config";

@injectable()
export class CalculatorStore {
    @observable inputExpression: string;
    @observable result: string;
    private defaultExpression = "0";

    constructor() {
        makeObservable(this);
        this.inputExpression = this.defaultExpression;
        this.result = "";
    }

    @action calculate = () => {
        fetch(`${config.apiUrl}/basic-calculator?expression=${(encodeURIComponent(this.inputExpression))}`)
        .then(response => response.json())
        .then(response => {
            this.result = response.expressionResult as string;
        });
    }

    @action setExpression = (expression: string) => {
            this.inputExpression = expression;
    }

    @action clearExpression = () => {
        this.inputExpression = this.defaultExpression;
        this.result = "";
    }

    @action deleteLast = () => {
        this.inputExpression = this.inputExpression.slice(0, this.inputExpression.length - 1);
        this.result = "";
    }
}