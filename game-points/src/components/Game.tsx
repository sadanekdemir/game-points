import { createContext, useMemo } from 'react';
import { useGameEngine, useGetGameData } from '../hooks/game-hooks';
import styles from '../styles/styles.module.scss';
import { GameItem, ScoreItem, ScoreList } from '../types';
import GameLeftPanel from './GameLeftPanel';
import GameRightPanel from './GameRightPanel';

export interface GameData {
  gameItems?: GameItem[],
  scoreItemList?: ScoreItem[],
  scores?: ScoreList,
  totalScore?: number,
  totalBonus?: number
}

export const GameContext = createContext<GameData>({});

const Game = ({items}: {items: GameItem[]}) => {
  const { gameItems } = useGetGameData(items);
  const { scoreItemList, totalBonus, totalScore, scores, handleClickedItem, handleResetGame } = useGameEngine(items);

  // maybe use this context for simpler solution, or maybe not
  const context = useMemo(()=>({
    gameItems, scoreItemList, totalScore, totalBonus, scores
  }),[gameItems, scoreItemList, scores, totalBonus, totalScore])

	return (
		<div className={styles.main}>
			<div className={styles.gameApp}>
        <GameContext.Provider value={context}>
          <GameLeftPanel title="Kahoot! POINTS" onClick={(item) => handleClickedItem(item)} />
          <GameRightPanel title="PLAYER ITEMS" onReset={handleResetGame} />
        </GameContext.Provider>
			</div>
		</div>
	)
}

export default Game;