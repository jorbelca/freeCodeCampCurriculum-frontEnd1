import { useState } from 'react';
import './App.css';


const colors = ['red', 'blue', 'burlywood', 'orange', 'greeen', 'brown', 'purple', 'navy', 'mustard', 'gray']
let idx = 0


function App() {
  const [quote, setQuote] = useState("There are alway going to be bad things. But you can write it down and make a song out of it.")
  const [author, setAuthor] = useState("Billie Eilish")
  const [bgCol, setBgCol] = useState(colors[idx])


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_HOST
    }
  };



  const handleClick = () => {
    fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
      .then(response => response.json())
      .then(response => {

        setQuote(response.content)
        setAuthor(response.originator.name)
        idx = Math.round(Math.random() * colors.length - 1)
        setBgCol(colors[idx])
      })
      .catch(err => {
        alert("PLEASE, TRY TO PRESS THE BUTTON LESS OFTEN, YOU'RE EXCEEDING THE CAPACITY OF THE API")

        console.error(err);
        handleClick()
      });
  }


  return (
    <div className="App">
      <div id="quote-box" style={{ backgroundColor: bgCol }}>
        <div id="text" style={bgCol === 'white' ? { color: 'red' } : {}}><em>{quote && '" ' + quote + ' "'}</em></div>
        <div id="author">{author && author}</div>
        <button id="new-quote" style={{ backgroundColor: bgCol }} onClick={handleClick}>New Quote</button>
        <a href="https://twitter.com/intent/tweet" id="tweet-quote" target={"_blank"} rel='noreferrer'><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>
        </a>
      </div>
    </div >
  );
}

export default App;
