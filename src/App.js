import './App.css';
import data from './data';
function App() {
// const keys =['AC', '/','X', 7, 8, 9, '-', 4, 5, 6, '+', 1,2,3, '=', 0,'.']


  const calcKeys = data.map(({id, value, role})=>{ 
    return  (<div id={id} className={`${id} ${role} grid-element`} key={id} >{value}</div>)
  })
  return (
    
    <div className="App">
      <div className='calculator'>
        <div className='formula' value="Hello"></div>
        <div id='display' className='display'>0</div>
        <div className='keyboard-grid'>
          {calcKeys}
        </div>
      </div>
    </div>
  );
}

export default App;
