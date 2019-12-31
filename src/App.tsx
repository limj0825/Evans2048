import React from 'react';
import './App.css';
import ChessBoard from "./ChessBoard";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{marginTop: '100px'}}>元旦快乐<br/><br/>最高可以玩到4096~<br/><br/>暂时没有声音</h1>
      <ChessBoard />
    </div>
  );
}

export default App;
