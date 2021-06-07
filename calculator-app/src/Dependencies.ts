import { Container } from 'inversify';
import "reflect-metadata";
import {CalculatorStore} from "./stores/CalculatorStore";
import { TYPES } from './Types';

let container = new Container({defaultScope: "Singleton"});
container.bind<CalculatorStore>(TYPES.CalculatorStore).to(CalculatorStore);

export default container;