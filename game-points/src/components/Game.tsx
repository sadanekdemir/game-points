import { useState } from 'react';
import { useGetGameData } from '../hooks/game-hooks';
import styles from '../styles/styles.module.scss';
import { GameItem, ScoreItem } from '../types';
import GameLeftPanel from './GameLeftPanel';
import GameRightPanel from './GameRightPanel';

const Game = () => {
	const [totalScore, setTotalScore] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);
  const [scoreItemList, setScoreItemList] = useState<ScoreItem[]>([]);

  const { gameItems, bonusItems } = useGetGameData();

  const handleClickedItem = (item: GameItem) => {
    // check if label exists, if so, increase quantity, or else add a new member
    const tempList = scoreItemList;
    const scoreItem = scoreItemList.find(scoreItem => scoreItem.label === item.label);
    if (scoreItem) {
      scoreItem.quantity += 1;
      scoreItem.score = calculateScorePerItem(scoreItem)
    } else {
      const newScoreItem: ScoreItem = { label: item.label, quantity: 1, unitPoints: item.unitPoints, score: 0 };
      newScoreItem.score = calculateScorePerItem(newScoreItem);
      tempList.push(newScoreItem);
    }

    setScoreItemList(tempList);
  }

  const handleResetGame = () => {
    setScoreItemList([])
    setTotalBonus(0);
    setTotalScore(0);
  }

  const calculateScorePerItem = (scoreItem: ScoreItem) => {
    // get properties
    const { label, quantity, unitPoints = 0, score = 0 } = scoreItem;

    // check if there's bonus
    const bonus = bonusItems.find(item => item.label === label)?.bonus;

    // check if there's bonus condition 
    const isBonusCondition = bonus && quantity === bonus?.collect;

		// calculate bonus
    const bonusAmount = isBonusCondition ? bonus.yield - quantity  * unitPoints : 0

		// calculate how much to add
    const addition = unitPoints + (isBonusCondition ? bonusAmount : 0);

		// calculate new score
    const newScore = score + addition

    // add this new score to total score
    setTotalScore(current => current + addition);
    // add this bonus to total bonus
    setTotalBonus(current => current + bonusAmount);

    return newScore;
  }

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