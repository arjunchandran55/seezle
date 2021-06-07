import { configure, render } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {CalculatorStore} from "./stores/CalculatorStore";
import CalculatorApp from './CalculatorApp';
import { Provider } from 'inversify-react';
import { Container } from 'inversify';
import { TYPES } from './Types';
import "reflect-metadata";

configure({ adapter: new Adapter() }); // configure enzyme adapter

var containerMock: Container;
var storeMock: CalculatorStore;
beforeEach(() => {
  
  containerMock = new Container();
  
  storeMock = jest.genMockFromModule(
    "./stores/CalculatorStore",
  ) as CalculatorStore;

  storeMock.setExpression = jest.fn(e => { storeMock.inputExpression = e } );
  containerMock.bind(TYPES.CalculatorStore).toConstantValue(storeMock);
});

const renderComponent = (renderer: any) =>
  renderer(
    <Provider container={containerMock}>
      <CalculatorApp />
    </Provider>
  );

test("Render calculator app", () => {
  storeMock.setExpression("1*11*12");
  const comp = renderComponent(render);
  expect(comp).toMatchSnapshot();
});