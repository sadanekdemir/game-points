import { useMemo, useState } from "react";
import { items } from "../data";
import { GameItem, BonusItem, ScoreItem } from "../types";

export const useGetGameData = (): {
  gameItems: GameItem[];
  bonusItems: BonusItem[];
} => {
  const gameItems: GameItem[] = useMemo(()=>{
    return items.map(item => ({ label: item.label, unitPoints: item.unitPoints }) )
  }, [items])

  const bonusItems: BonusItem[] = useMemo(()=>{
    return items.filter(item => item.bonus).map(item => ({ label: item.label, bonus: item.bonus }))
  },[items])

  return { gameItems, bonusItems }
}

export const useGameEngine = () => {
  
  const { bonusItems } = useGetGameData();
  const [totalScore, setTotalScore] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);
  const [scoreItemList, setScoreItemList] = useState<ScoreItem[]>([]);

  const handleClickedItem = (item: GameItem) => {
    // check if label exists, if so, increase quantity, else add a new item
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

  const handleResetGame = () => {
    setScoreItemList([])
    setTotalBonus(0);
    setTotalScore(0);
  }

  return {
    handleClickedItem,
    handleResetGame,
    calculateScorePerItem,
    totalBonus,
    totalScore,
    scoreItemList
  }
}