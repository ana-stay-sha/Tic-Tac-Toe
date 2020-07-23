import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      square : Array(9).fill(null),
      count : 0,
      button : '',
      currentX : 0,
      currentO : 0,
      symO : 0,
      symX : 0,
      checkDraw : 8,
    }
    this.wiinerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 4, 8],
      [2, 4, 6],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ]
  }

// Проверка победителя
win = () => {
    let element = (this.state.count % 2 === 0) ? 'X' : 'O';
    for (let i = 0; i < 8; i++){
      let line = this.wiinerLine[i];
      if (this.state.square[line[0]] === element &&
          this.state.square[line[1]] === element &&
          this.state.square[line[2]] === element){
            if (element === 'X'){
              this.setState({ currentX : this.state.currentX + 1});
              alert('Крестики победили');
            }
            else if (element === 'O'){
              this.setState({ currentO : this.state.currentO + 1}); 
              alert('Нолики победили');
            }
            this.newGame();    
            return
      }
    }
    // Проверка на ничью
    if (this.state.count === this.state.checkDraw){
        alert('Ничья!');
        this.setState({ checkDraw : 8});
        this.newGame();
      }
  }
// Обнуление полей
newGame = () => {
  this.setState({ square: Array(9).fill(null) });
  this.setState({ count: 0 }) 
  this.setState({ checkDraw : 8});
}

clickHandler = (event) => {
    let data = event.target.getAttribute('data');
    let currentSquare = this.state.square;
    console.log(currentSquare);
    if (currentSquare[data] === null){
      currentSquare[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
      this.setState({count : this.state.count + 1});
      this.setState({square : currentSquare});
    }
    else{
      alert('Так делать нельзя!!!!');
    }
    this.win();
}
// смена символа для игры
selectSymbol = (elem) =>{
  console.log(elem.target.getAttribute('data'));
  if (elem.target.getAttribute('data') === 'O'){
    this.setState({ count : this.state.count + 1});
    this.setState({ checkDraw : 9});
    this.setState({ square: Array(9).fill(null) });
  }
  else if(elem.target.getAttribute('data') === 'X'){
    this.setState({ count : 0});
    this.setState({ checkDraw : 8});
    this.setState({ square: Array(9).fill(null) });
  }
}
  render(){
    
    return (
      <div className='App'> 
        <h1>Сыграешь в крестики-нолики?)</h1>
        <div className='container'>

          <div className='divSymbol'>
            <p>Выберите символ</p>
            <div className='selectSymbol flexBlocks'>
              <button onClick={this.selectSymbol}  data="X" disabled={this.state.disabled}>X</button>
              <button onClick={this.selectSymbol}  data="O" disabled={this.state.disabled}>O</button>
            </div>
          </div>
          
          <div className="game"> 
            <div className='bigSquare'>
              <div className='littleSquare' data='0' onClick={this.clickHandler}>{this.state.square[0]}</div>
              <div className='littleSquare' data='1' onClick={this.clickHandler}>{this.state.square[1]}</div>
              <div className='littleSquare' data='2' onClick={this.clickHandler}>{this.state.square[2]}</div>
              <div className='littleSquare' data='3' onClick={this.clickHandler}>{this.state.square[3]}</div>
              <div className='littleSquare' data='4' onClick={this.clickHandler}>{this.state.square[4]}</div>
              <div className='littleSquare' data='5' onClick={this.clickHandler}>{this.state.square[5]}</div>
              <div className='littleSquare' data='6' onClick={this.clickHandler}>{this.state.square[6]}</div>
              <div className='littleSquare' data='7' onClick={this.clickHandler}>{this.state.square[7]}</div>
              <div className='littleSquare' data='8' onClick={this.clickHandler}>{this.state.square[8]}</div>
            </div>
            <button onClick={this.newGame}>Начать заново</button>
          </div>
          
          <div className='score'>
            <p>Счет:</p> 
            <div className='scoreBlock flexBlocks'>
              <p>X : {this.state.currentX}</p>
              <p>O : {this.state.currentO}</p>
            </div>
          </div>

      </div>
      </div>
    );
  }
}

export default App;
