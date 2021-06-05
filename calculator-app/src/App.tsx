import 'reflect-metadata';
import './App.css';
import CalculatorApp from './CalculatorApp';
import container from './Dependencies';
import { Provider } from 'inversify-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        CALCULATOR
      </header>
      <Provider container={container}>
        <CalculatorApp />
      </Provider>
    </div>
  );
}

export default App;
