import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*+-_?/{}[]()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-800 text-center">
        <h1 className="text-2xl text-center text-white py-5">Password generator</h1>
        <div className="flex shadow-xl rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 shadow-xl rounded-lg"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          &nbsp;
          <button 
          onClick={copyPasswordToClipboard}
          className="rounded-lg px-2 py-2 bg-gray-900 shadow-xl outline-none shrink-0 hover:bg-gray-600 hover:text-white">
            Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1"></div>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            style={{accentColor:"rgb(249 115 22)"}} 
            onChange={(e) => { setLength(e.target.value) }}
          />

          <label> Length: {length}</label>
          &nbsp;
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numInput"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label> Numbers </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label> Characters </label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
