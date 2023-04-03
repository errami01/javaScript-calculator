import './App.css';
function App() {
const keys =['AC', '/','X', 7, 8, 9, '-', 4, 5, 6, '+', 1,2,3, '=', 0,'.']

  const calcKeys = keys.map((key)=>{
    return  (<div key={key}>{key}</div>)
  })
  return (
    
    <div className="App">
      <div className='keyboard-grid'>
        {calcKeys}
      </div>
      
    </div>
  );
}

export default App;
