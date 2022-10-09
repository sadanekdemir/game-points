import { useGameEngine, useGetGameData } from '../hooks/game-hooks';
import styles from '../styles/styles.module.scss';
import GameLeftPanel from './GameLeftPanel';
import GameRightPanel from './GameRightPanel';

const Game = () => {
  const { gameItems } = useGetGameData();
  const { scoreItemList, totalBonus, totalScore, handleClickedItem, handleResetGame } = useGameEngine();

	return (
		<div className={styles.main}>
			<div className={styles.gameApp}>
				<GameLeftPanel title="Kahoot! POINTS" gameItems={gameItems} onClick={(item) => handleClickedItem(item)} />
				<GameRightPanel title="PLAYER ITEMS" onClick={handleResetGame} scoreItems={scoreItemList} totalBonus={totalBonus} totalScore={totalScore} />
			</div>
		</div>
	)
}

export default Game;