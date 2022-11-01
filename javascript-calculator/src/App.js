
import { useState } from 'react';
import './App.css';

function App() {
  const [disp, setDisp] = useState('')

  const onClick = (e) => {
    e.preventDefault()
    const value = e.target.value
    try {
      if (value === "clear") {
        setDisp('')
      } else if (value === "=") {

        const operator = disp && disp.match(/[+-/*]/)
        const num1 = disp && disp.slice(0, operator.index)
        const num2 = disp && disp.slice(operator.index + 1)

        const res = eval(`${Number(num1)}${operator[0]}${Number(num2)}`)

        setDisp(res)
      } else if (disp[disp.length - 1] == '.' && value == '.') {
      }
      else if (disp[0] == '0' && value == '0') {
      }
      else {

        let refresh = disp + value

        setDisp(refresh)
      }
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className="App">
      <div id="calculator">
        <div id="display">{disp == '' ? 0 : disp}</div>

        <div id="numbers">
          <button className='button' id="zero" value={0} onClick={onClick}>0</button>
          <button className='button' id="one" value={1} onClick={onClick}>1</button>
          <button className='button' id="two" value={2} onClick={onClick}>2</button>
          <button className='button' id="three" value={3} onClick={onClick}>3</button>
          <button className='button' id="four" value={4} onClick={onClick}>4</button>
          <button className='button' id="five" value={5} onClick={onClick}>5</button>
          <button className='button' id="six" value={6} onClick={onClick}>6</button>
          <button className='button' id="seven" value={7} onClick={onClick}>7</button>
          <button className='button' id="eight" value={8} onClick={onClick}>8</button>
          <button className='button' id="nine" value={9} onClick={onClick}>9</button>
          <button className='button' id="decimal" value={'.'} onClick={onClick}>.</button>
        </div>
        <div id="operators">
          <button className='button' id="add" value={"+"} onClick={onClick}>+</button>
          <button className='button' id="subtract" value={"-"} onClick={onClick}>-</button>
          <button className='button' id="multiply" value={"*"} onClick={onClick}>X</button>
          <button className='button' id="divide" value={"/"} onClick={onClick}>/</button>
        </div>

        <div id="finish">
          <button className='button' id="clear" value={"clear"} onClick={onClick}>A/C</button>
          <button className='button' id="equals" value={"="} onClick={onClick}>=</button></div>

      </div>

    </div>
  );
}

export default App;
