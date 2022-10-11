import React from 'react';
import { createContext, useMemo } from 'react';
import { useGameEngine, useGetGameData } from '../hooks/game-hooks';
import styles from '../styles/styles.module.scss';
import { GameData, GameItem, ScoreItem, ScoreList } from '../types';
import GameLeftPanel from './GameLeftPanel';
import GameRightPanel from './GameRightPanel';

export const GameContext = createContext<GameData>({});

const Game = ({items}: {items: GameItem[]}) => {
  const { gameItems } = useGetGameData(items);
  const { totalBonus, totalScore, scores, handleClickedItem, handleResetGame } = useGameEngine(items);

  // using context here to simplify the components and avoid prop drilling
  const context = useMemo(()=>({
    gameItems, totalScore, totalBonus, scores
  }),[gameItems, scores, totalBonus, totalScore])

	return (
		<div className={styles.main}>
			<div className={styles.gameApp} data-test="game-app">
        <GameContext.Provider value={context}>
          <GameLeftPanel title="Kahoot! POINTS" onClick={(item) => handleClickedItem(item)} />
          <GameRightPanel title="PLAYER ITEMS" onReset={handleResetGame} />
        </GameContext.Provider>
			</div>
		</div>
	)
}

export default Game;