/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./App.css";
function genPassWord(characterSet, len) {
  let password = "";
  // Used the in-built browser random API to get some random digits, apparently this is more secure
  const randomBytes = new Uint8Array(len);
  window.crypto.getRandomValues(randomBytes);
  for (let i = 0; i < len; i++) {
    // Math.random can also be used for this though, and i don't really see the difference
    // const l = Math.floor(Math.random() * characterSet.length) + 1;
    let randomIndex = randomBytes[i] % characterSet.length;
    password += characterSet[randomIndex];
  }
  return password;
}
function App() {
  const [len, setLen] = useState(9);
  const [digits] = useState(true);
  const [letters, setLetters] = useState(true);
  const [syms, setSyms] = useState(true);
  const [regen, setRegen] = useState(true);
  let pwd = useRef(null);
  const bg = len <= 6 ? "#D1364E" : len > 8 ? "#1c815a" : "#BE4E3A";
  let characterSet = "0123456789";
  characterSet = letters
    ? characterSet + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : characterSet;
  characterSet = syms ? characterSet + "!@#$%^&*_-/+=" : characterSet;
  console.log(letters, syms, characterSet);
  pwd.current = genPassWord(characterSet, len);
  async function handleCopy(text) {
    await navigator.clipboard.writeText(text);
    alert("Text Copied Successfully!");
  }
  //   genPassWord(len);
  return (
    <div className="app" style={{ background: bg }}>
      <p className="password">
        <p>{pwd.current}</p>
        <span title="Regenerate Password" onClick={() => setRegen((r) => !r)}>
          <MySvg />
        </span>
      </p>
      <div>
        <span>
          {len <= 6 && "Weak Password"}
          {len > 6 && len < 9 && "Fairly Strong Password"}
          {len > 8 && "Strong Password"}
        </span>
        <button onClick={() => handleCopy(pwd.current)}>Copy Password</button>
      </div>
      <span>
        <label htmlFor="passwordLen">Password Length ({len})</label>
        <input
          type="range"
          id="passwordLen"
          value={len}
          min={4}
          max={20}
          onChange={(e) => setLen(e.target.value)}
        />
      </span>
      <div>
        <label className="cr-wrapper">
          <input
            type="checkbox"
            checked={letters}
            onChange={(e) => setLetters(e.target.checked)}
          />
          <div className="cr-input"></div>
          <span>Letters (e.g. Aa)</span>
        </label>
        <label className="cr-wrapper">
          <input type="checkbox" checked="checked" disabled value={digits} />
          <div className="cr-input"></div>
          <span>Digits (e.g. 123)</span>
        </label>
        <label className="cr-wrapper">
          <input
            type="checkbox"
            checked={syms}
            onChange={(e) => setSyms(e.target.checked)}
          />
          <div className="cr-input"></div>
          <span>Symbols (e.g. @#$!?&)</span>
        </label>
      </div>
    </div>
  );
}
function MySvg() {
  return (
    <svg
      fill="white"
      width="36px"
      height="36px"
      viewBox="0 0 512 512"
      data-name="Layer 1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z" />
    </svg>
  );
}
export default App;
