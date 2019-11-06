import React from 'react';
import './App.css';
import ChessBoard from "./ChessBoard";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{marginTop: '100px'}}>Team Evans 2048</h1>
      <ChessBoard />
    </div>
  );
}

export default App;
