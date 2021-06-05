import { injectable } from "inversify";
import { observable, action, makeObservable } from "mobx";

@injectable()
export class CalculatorStore {
    @observable inputExpression: string;
    @observable result: string = "12";
    private defaultExpression = "0";

    constructor() {
        makeObservable(this);
        this.inputExpression = this.defaultExpression;
    }

    @action calculate = (expression: string) : number => {
        return 100;
    }

    @action setExpression = (expression: string) => {
            this.inputExpression = expression;
    }

    @action clearExpression = () => {
        this.inputExpression = this.defaultExpression;
    }
}