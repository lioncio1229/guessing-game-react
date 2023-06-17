import { useRef, useState } from "react";
import Button from "./Button";
import "./App.css";
import WinSound from './asset/win.mp3';
import LoseSound from './asset/lose.mp3';
import VibrateSound from './asset/vibrate.mp3';

function App() {
  const range = 8;
  const [hiddenNumber, setHiddenNumber] = useState(
    Math.floor(Math.random() * 100)
  );

  const inputRef = useRef("");
  
  const winSoundRef = useRef("");
  const loseSoundRef = useRef("");
  const vibrateSoundRef = useRef("");

  const [guess, setGuess] = useState("Guess the number!");
  const [historyResult, setHistoryResult] = useState("");
  const [lives, setLives] = useState(5);
  const [btnValue, setBtnValue] = useState({
    bg: "#ff7a00",
    label: "Guess",
  });

  const btnGuess = () => {
    let input = inputRef.current;

    if(btnValue.label == 'Play Again' || btnValue.label == 'Try Again')
    {
      setBtnValue({bg:"#ff7a00", label: "Guess"});
      input.value = "";
      setGuess("Guess the number!");
      setLives(5);
      return;
    }
    let guessNumber = input.value;

    let message = "";
    let _lives = lives;

    if (hiddenNumber == guessNumber) {
      winSoundRef.current.play();
      message = "You win!";
      setHiddenNumber(Math.floor(Math.random() * 100));
      setHistoryResult("Win");
      setBtnValue({bg:"green", label: "Play Again"})
    }
    else if (guessNumber > hiddenNumber) {
      vibrateSoundRef.current.play();
      message = "To High!";
      if(guessNumber <= hiddenNumber + range)
      {
        message = "Make it lower";
      }
      _lives -= 1;
    } 
    else if (guessNumber < hiddenNumber) {
      vibrateSoundRef.current.play();
      message = "To Low!";
      if(guessNumber >= hiddenNumber - range){
        message = "Make it higher";
      }
      _lives -= 1;
    }

    if (_lives === 0) {
      loseSoundRef.current.play();
      message = "You Lose! Please try again.";
      setHistoryResult("Lose");
      setHiddenNumber(Math.floor(Math.random() * 100));
      setBtnValue({bg:"red", label: "Try Again"})
    }

    setLives(_lives);
    console.log(lives);
    setGuess(message);

    console.log(lives);
  };

  return (
    <div>

      <audio ref={winSoundRef}>
        <source src={WinSound}/>
      </audio>
      <audio ref={loseSoundRef}>
        <source src={LoseSound}></source>
      </audio>
      <audio ref={vibrateSoundRef}>
          <source src={VibrateSound} />
      </audio>

      <div className="hearts-con">
        {
          Array.from({length: lives}, (value, index) => (
            <div className="hearts">❤</div>
          ))
        }
      </div>

      <div className="top">
        <h1>Guessing GAme</h1>
        <p>Guess the number from 0 to 100</p>
        <h2>{guess}</h2>
        <input type="number" className="inputNumber" ref={inputRef} /> <br />
        <Button className="btnGuess" clickButton={btnGuess} label={btnValue.label} bg={btnValue.bg} />
        <div className="historyContainer">
          <p className="history">Last Game:</p>
          <p className="historyResult">{historyResult}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
