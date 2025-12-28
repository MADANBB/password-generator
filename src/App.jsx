import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {

  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed]=  useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{

     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if(numbersAllowed){
      str += "0123456789"
     }
     if(charAllowed){
      str += "!@#$%^&*()_+-=*/;:<>,.?\|"
     }

     for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
     }
     

     setPassword(pass)

     
  }, [length,numbersAllowed, charAllowed, setPassword])  

  const copyPasswordToClipboard = useCallback(()=>{
   
    window.navigator.clipboard.writeText(password)
    setCopied(true);
    passwordRef.current?.select();
    // To Select selection range 
    // passwordRef.current?.setSelectionRange(0,20);

    setTimeout(()=>{
      passwordRef.current?.setSelectionRange(0,0);
      passwordRef.current?.blur();
      setCopied(false)
    },1500)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  }, [length,numbersAllowed, charAllowed, passwordGenerator]);


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 py-3 text-orange-300 bg-gray-800'>
      <h1 className='text-white text-center my-3'> Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden mb-4 bg-white text-gray-700'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none px-3 py-0.5 shrink-0 transition-all duration-200 
          ${copied ? "bg-green-500 text-white" : "bg-lime-300 text-black"}`}
        >
        {copied ? "Copied!" : "Copy"}
        </button>

      </div>
      <div className='flex flex-col sm:flex-row text-sm gap-3'>
        <div className='flex items-center gap-x-2 w-full'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          onChange={(e)=>{setLength(Number(e.target.value))}}
          className='flex-1'
          />
          <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          checked={numbersAllowed}
          id='numberInput'
          onChange={()=>{
            setNumbersAllowed((prev) => !prev);
          }}
          />
          <label htmlFor="">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          checked={charAllowed}
          id='characterInput'
          onChange={()=>{
            setCharAllowed((prev) => !prev);
          }}
          />
          <label htmlFor="">Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
