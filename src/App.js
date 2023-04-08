import './App.css';
import data from './data';
import { useState, useRef } from 'react';

function App() {
// const keys =['AC', '/','X', 7, 8, 9, '-', 4, 5, 6, '+', 1,2,3, '=', 0,'.']
const [clickOutput, setClickOutput] = useState([])
const formula = useRef([])

function handleClick(event){
  const input = event.target.innerHTML
  const parsedInput = parseInt(input)
  
  if(input === 'AC'){
    formula.current = []
    return setClickOutput([])
  }

  if(!isNaN(input)){
    if(formula.current.indexOf('=')>-1){
      formula.current=[parsedInput]
      return setClickOutput([parsedInput])
    }
    if(parsedInput == 0 && clickOutput.length==0) {
      formula.current.push(0)
      return setClickOutput([0])
    }
    if(parsedInput == 0 && clickOutput[0]==0){
      return 
    }
    if(parsedInput > 0 && clickOutput[0]==0 && clickOutput.length == 1){
    formula.current[formula.current.length-1] = parsedInput
    return setClickOutput([parsedInput])
   }
   if(clickOutput[clickOutput.length-1]=='+' || clickOutput[clickOutput.length-1]=='-' || clickOutput[clickOutput.length-1]=='*' 
      || clickOutput[clickOutput.length-1]=='/' ){
        formula.current.push(parsedInput)
        return setClickOutput([parsedInput])
      }
    formula.current.push(parsedInput)
    return setClickOutput(prev=> [...prev, parsedInput])
   
  }
  if(input ==='.'){
    console.log(input)
    if(clickOutput.indexOf('.')>0) return
    if(clickOutput.length===0 || isNaN(clickOutput[clickOutput.length-1])){
      formula.current.push(0, input)
      return setClickOutput([0, input]) 
    }
    if(formula.current.indexOf('=')>-1){
      formula.current=[0,input]
      return setClickOutput([0,input])
    }
    formula.current.push(input)
    return setClickOutput(prev =>[...prev,input])

    
  }
  if(input === '+'){
    if(clickOutput[clickOutput.length-1]=='+' || formula.current.length===0){
      return
    }
    if(formula.current[formula.current.length-1]=='-' && isNaN(formula.current[formula.current.length-2])){
      formula.current.pop()
      formula.current[formula.current.length-1]=input
      return setClickOutput([input])
    }
    if(isNaN(clickOutput[clickOutput.length-1])){
      formula.current[formula.current.length-1]=input
      return setClickOutput([input])
    }
    if(formula.current.indexOf('=')>-1){
      formula.current=[clickOutput, input]
      return setClickOutput([input])
    }
    
    formula.current.push(input)
    return setClickOutput([input])
  }
  if(input == '-'){
    if(clickOutput[clickOutput.length-1]=='-'){
      return
    }
    if(clickOutput[clickOutput.length-1]==='.'){
      formula.current[formula.current.length-1]=input
      return setClickOutput([input])
    }
    if(formula.current.indexOf('=')>-1){
      formula.current=[clickOutput, input]
      return setClickOutput([input])
    }
    formula.current.push(input)
    return setClickOutput([input])
  }
  if(input === 'X'){
    if(clickOutput.length===0) return
    if(formula.current.indexOf('=')>-1){
      formula.current=[clickOutput, '*']
      return setClickOutput(['*'])
    }
    if(formula.current[formula.current.length-1]=='-' && isNaN(formula.current[formula.current.length-2])){
      formula.current.pop()
      formula.current[formula.current.length-1]='*'
      return setClickOutput(['*'])
    }
    if(isNaN(clickOutput[0]) || clickOutput[clickOutput.length-1]=='.'){
      formula.current[formula.current.length-1] = '*'
      setClickOutput(['*'])
      return
    }
    formula.current.push('*')
    return setClickOutput(['*']) 
  }
  if(input === '/'){
    if(clickOutput.length===0 || isNaN(formula.current[0])) return
    if(formula.current[formula.current.length-1]=='-' && isNaN(formula.current[formula.current.length-2])){
      formula.current.pop()
      formula.current[formula.current.length-1]=input
      return setClickOutput([input])
    }
    if(formula.current.indexOf('=')>-1){
      formula.current=[clickOutput, input]
      return setClickOutput([input])
    }
    if(isNaN(clickOutput[clickOutput.length-1])){
      formula.current[formula.current.length-1] = input
      return setClickOutput([input])
    }
   
    formula.current.push(input)
    return setClickOutput([input]) 
  }
  if(input === '='){
      if(formula.current.indexOf('=')>-1) return
      let operation = formula.current.join('')
      const myReg = /[\+\-]?\d+(\.\d+)?([\*\/]\d+(\.\d+)?)+/
      const multAndDivSigns =  /[\*\/]/
      const addAndSousSigns = /\d+(\.\d+)?/
      let product = 0;
      while(multAndDivSigns.test(operation)){
          const extracted = operation.match(myReg)[0]
          const operators = extracted.match(/[\*\/]/g)
          const numbers = extracted.split(multAndDivSigns)
          operators.forEach(oper=>{
              numbers.splice(0,2,multip(numbers[0],numbers[1],oper))
          })
          operation = operation.replace(myReg, '')
          product += numbers[0]
          
      }
      while(addAndSousSigns.test(operation)){
          const extracted = operation.match(/[\+/-]?\d+(\.\d+)?/)[0]
          product += parseFloat(extracted)
          operation = operation.replace(extracted,'')
      }
      formula.current.push('=', product)
       setClickOutput([product])
      

  }

  function multip(a,b,operator){
    switch (operator){
        case '*':
            return parseFloat(a)*parseFloat(b)
        case '/': 
            return parseFloat(a)/parseFloat(b)
    }
}
  

  
}

  const calcKeys = data.map(({id, value, role})=>{ 
    return  (
      <div 
        id={id} 
        className={`${id} ${role} grid-element`} 
        key={id}
        onClick={handleClick} >
          {value}
        </div>)
  })
  return (
    
    <div className="App">
      <div className='calculator'>
        <div className='formula' >{formula.current}</div>
        <div id='display' className='display'>{clickOutput.length>0? clickOutput:'0'}</div>
        <div className='keyboard-grid'>
          {calcKeys}
        </div>
      </div>
    </div>
  );
}

export default App;
