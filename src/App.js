import logo from './logo.svg';
import './App.css';
import React from 'react';

function CountCan({ num }) {
  const fontColor = num > 2 ? 'red' : 'black'
  return (
    <div style={{ color: fontColor }}> {num}</div>
  )
}

function Counter() {
  const [num, setNum] = React.useState(0)
  // return (
  //   <div>
  //     <button onClick={() => setNum(num + 1)}>
  //       <CountCan num={num} />
  //     </button>
  //   </div>
  // )
  // or
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: function onClick() {
          return setNum(num + 1)
        }
      },
      React.createElement(
        CountCan,
        { num }
      )
    )
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

export default App;
