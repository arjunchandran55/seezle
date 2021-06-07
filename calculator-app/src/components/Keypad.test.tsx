import { configure, render, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {CalculatorStore} from "../stores/CalculatorStore";
import { Provider } from 'inversify-react';
import { Container } from 'inversify';
import { TYPES } from '../Types';
import "reflect-metadata";
import Keypad from "./Keypad";

configure({ adapter: new Adapter() }); // configure enzyme adapter

var containerMock: Container;
var storeMock: CalculatorStore;
beforeEach(() => {
  
  containerMock = new Container();
  
  storeMock = jest.genMockFromModule(
    "../stores/CalculatorStore",
  ) as CalculatorStore;

  storeMock.setExpression = jest.fn(e => { storeMock.inputExpression = e } );
  containerMock.bind(TYPES.CalculatorStore).toConstantValue(storeMock);
});

const renderComponent = (renderer: any) =>
  renderer(
    <Provider container={containerMock}>
      <Keypad />
    </Provider>
  );

test("Render Keypad for calculator", () => {
  const comp = renderComponent(shallow);
  expect(comp).toMatchSnapshot();
});