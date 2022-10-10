import styles from './App.module.scss';
import Game from './components/Game';
import { items } from './data';
import React from 'react';

function App() {
  return (
    <Game items={items} />
  )
}

export default App
