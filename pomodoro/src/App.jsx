import { useRef, useState } from "react"
import "./App.css"
import Sound from "./assets/oven-timer-complete-43537.mp3"

function App() {
  const [session, setSession] = useState(25)
  const [brk, setBrk] = useState(5)
  let [minutes, setMinutes] = useState(session)
  let [seconds, setSeconds] = useState(0)
  const [ON, changeON] = useState(false)
  const [ssion, setSsion] = useState(true)
  const [timer, setTimer] = useState(minutes * 60)
  const [stop, setStop] = useState(brk * 60)

  const audio = new Audio(Sound)
  var timeInterval = useRef(null)
  var stp = useRef(null)

  const startTimer = (time) => {
    changeON(true)
    const now = Date.now()
    const future = now + time * 1000

    timeInterval.current = setInterval(() => {
      const secondsLeft = Math.round((future - Date.now()) / 1000)
      setMinutes(Math.floor(secondsLeft / 60))
      setSeconds(secondsLeft % 60)
      if (ssion) setTimer(secondsLeft)
      if (!ssion) setStop(secondsLeft)

      if (secondsLeft <= 2) {
        audio.play()
      }
      if (secondsLeft <= 0) {
        if (ssion) {
          clearInterval(timeInterval)
          clearInterval(timeInterval.current)
          timeInterval.current = null
          timeInterval = stp
          changeON(true)
          setSsion(false)
          return startTimer(stop)
        }
        if (!ssion) {
          clearInterval(time)
          time.current = null
          return
        }
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (ssion) {
      clearInterval(timeInterval.current)
      timeInterval.current = null
    }
    if (!ssion) {
      clearInterval(timeInterval.current)
      timeInterval.current = null
      clearInterval(stp.current)
      stp.current = null
    }

    changeON(false)
  }

  const reset = () => {
    stopTimer()
    setMinutes(session)
    setSeconds(0)
    setSsion(true)
    changeON(false)
  }

  return (
    <div className="App">
      <div id="pomodoro">
        <h1 id="title">POMODORO TIMER</h1>
        <div id="controls">
          <div id="break-controls">
            <label htmlFor="" id="break-label">
              Break Length
            </label>
            <div id="btns">
              <button
                id="break-increment"
                onClick={() => {
                  if (brk < 59) {
                    setBrk(brk + 1)
                    setStop((brk + 1) * 60)
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
              <span id="break-length">{brk}</span>
              <button
                id="break-decrement"
                onClick={() => {
                  if (brk > 1) {
                    setBrk(brk - 1)
                    setStop((brk - 1) * 60)
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                </svg>
              </button>
            </div>
          </div>
          <div id="session-controls">
            <label htmlFor="" id="session-label">
              Session Length
            </label>
            <div id="btns">
              <button
                id="session-increment"
                onClick={() => {
                  if (session < 59) {
                    setSession(session + 1)
                    setMinutes(session + 1)
                    setTimer((session + 1) * 60)
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
              <span id="session-length">{session}</span>
              <button
                id="session-decrement"
                onClick={() => {
                  if (session > 1 && ON === false) {
                    setSession(session - 1)
                    setMinutes(session - 1)
                    setTimer((session - 1) * 60)
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div id="timer">
          <span id="timer-label">
            {ssion ? (
              <h3 style={{ color: "green" }}>SESSION</h3>
            ) : (
              <h3 style={{ color: "red" }}>BREAK</h3>
            )}
          </span>
          <div id="time-left">
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
          <div id="timer-controls">
            {ON === false ? (
              <button id="start_stop" onClick={() => startTimer(timer)}>
                <span id="start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                </span>
              </button>
            ) : (
              <button id="start_stop" onClick={stopTimer}>
                <span id="stop">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                  </svg>
                </span>
              </button>
            )}

            <button
              id="reset"
              onClick={() => {
                setSession(25)
                setBrk(5)
                reset()
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
