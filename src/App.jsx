import { useState, useCallback,useEffect,useRef } from 'react';
import './App.css';

function shuffleString(str) {
  // Convert the string to an array
  let arr = str.split('');

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Convert the array back to a string
  return arr.join('');
}

function App() {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "01234569";
  const specialCharacters = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  // Hooks
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChars, setIsSpecialChars] = useState(false);
  const [passGen, setPassGen] = useState("");

  const PasswordGenrator = useCallback(() => {
    let password = "";
    let WholeString = str;
    if (isNumber) WholeString += numbers;
    if (isSpecialChars) WholeString += specialCharacters;
    WholeString = shuffleString(WholeString);
    for (let i = 0; i < length; i++) {
      password += WholeString[Math.floor(Math.random() * WholeString.length)];
    }
    setPassGen(password);
  }, [length, isNumber, isSpecialChars]);

  useEffect(() => {PasswordGenrator()} , [length,isNumber,isSpecialChars,PasswordGenrator])
  const passwordRef = useRef(null)

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(passGen)
  },[passGen])
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-11/12 max-w-lg bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-white rounded-2xl p-6">
        <h1 className="text-5xl text-center mb-8 text-green-300">Password Generator</h1>
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <input
            type="text"
            className="p-2 bg-green-200 rounded-md text-black w-full"
            value={passGen}
            readOnly
            ref={passwordRef}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="Numbers"
              checked={isNumber}
              onChange={(e) => setIsNumber(e.target.checked)}
            />
            <label className="text-white">Include Numbers</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="Special Characters"
              checked={isSpecialChars}
              onChange={(e) => setIsSpecialChars(e.target.checked)}
            />
            <label className="text-white">Include Special Characters</label>
          </div>
          <div className="flex items-center space-x-2 w-full text-green-300">
            <label className="text-green-300">Password Length:</label>
            <input 
              type="range"
              min="6"
              max="100"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
            <span>{length}</span>
          </div>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={copytoclipboard}
          >
           Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
