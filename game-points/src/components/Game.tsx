import { createContext, useMemo } from 'react';
import { useGameEngine, useGetGameData } from '../hooks/game-hooks';
import styles from '../styles/styles.module.scss';
import { GameItem, ScoreItem } from '../types';
import GameLeftPanel from './GameLeftPanel';
import GameRightPanel from './GameRightPanel';

export interface GameData {
  gameItemList?: GameItem[],
  scoreItemList?: ScoreItem[],
  totalScore?: number,
  totalBonus?: number
}

export const GameContext = createContext<GameData>({});

const Game = ({items}: {items: GameItem[]}) => {
  const { gameItems } = useGetGameData(items);
  const { scoreItemList, totalBonus, totalScore, handleClickedItem, handleResetGame } = useGameEngine(items);

  // maybe use this context for simpler solution, or maybe not
  const context = useMemo(()=>({
    gameItems, scoreItemList, totalScore, totalBonus
  }),[gameItems, scoreItemList, totalBonus, totalScore])

	return (
		<div className={styles.main}>
			<div className={styles.gameApp}>
        <GameContext.Provider value={context}>
          <GameLeftPanel title="Kahoot! POINTS" gameItems={gameItems} onClick={(item) => handleClickedItem(item)} />
          <GameRightPanel title="PLAYER ITEMS" onClick={handleResetGame} totalBonus={totalBonus} totalScore={totalScore} scoreItems={scoreItemList} />
        </GameContext.Provider>
			</div>
		</div>
	)
}

export default Game;