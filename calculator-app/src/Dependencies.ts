import { Container } from 'inversify';
import "reflect-metadata";
import {CalculatorStore} from "./stores/CalculatorStore";

let container = new Container({defaultScope: "Singleton"});
container.bind(CalculatorStore).toSelf();

export default container;