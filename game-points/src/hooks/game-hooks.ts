import { useCallback, useMemo, useState } from "react";
import { calculateTotalScoreAndBonus } from "../helper";
import { GameItem, BonusItem, ScoreItem, ScoreList } from "../types";

export const useGetGameData = (items: GameItem[]): {
  gameItems: GameItem[];
  bonusItems: BonusItem[];
} => {

  const gameItems: GameItem[] = useMemo(()=>{
    return items.map(item => ({ label: item.label, unitPoints: item.unitPoints }) )
  }, [items])

  const calculateBonusAmount = useCallback((item: GameItem)=>{
    return item.bonus?.yield! - (item.unitPoints * item.bonus?.collect!)
  },[])

  const bonusItems: BonusItem[] = useMemo(()=>{
    return items.filter(item => item.bonus).map(item => (
      { 
        label: item.label, 
        collect: item.bonus?.collect || 0,
        bonusAmount: calculateBonusAmount(item)
      })
    )
  },[items])

  return { gameItems, bonusItems }
}

export const useGameEngine = (items: GameItem[]): {
  handleClickedItem: (item: GameItem) => void,
  handleResetGame: () => void
  calculateScorePerItem: (item:ScoreItem) => void;
  totalBonus: number,
  totalScore: number,
  scores: Record<string, ScoreItem>;
} => {
  const { bonusItems } = useGetGameData(items);

  const [totalScore, setTotalScore] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);

  const [scores, setScores] = useState<ScoreList>({});

  const handleClickedItem = (item: GameItem) => {
    const scoreItem = scores[item.label];
    if (scoreItem) {
      scoreItem.quantity += 1;
      scoreItem.score = calculateScorePerItem(scoreItem);
      setScores({...scores, [item.label]: scoreItem})
    } else {
      const newScoreItem: ScoreItem = { label: item.label, quantity: 1, unitPoints: item.unitPoints, score: 0 };
      newScoreItem.score = calculateScorePerItem(newScoreItem);
      scores[item.label] = newScoreItem;
      setScores({...scores, [item.label]: newScoreItem})
    }

    const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scores);
    setTotalScore(totalScore);
    setTotalBonus(totalBonus);
  }
  
  const calculateScorePerItem = (scoreItem: ScoreItem) => {
    // get properties
    const { label, quantity, unitPoints = 0, score = 0 } = scoreItem;

    // check if there's bonus
    const bonusItem = bonusItems.find(item => item.label === label);

    // check if there's bonus condition 
    const isBonusCondition = bonusItem && quantity % bonusItem.collect === 0;

		// calculate how much to add
    const addition = unitPoints + (isBonusCondition ? bonusItem.bonusAmount : 0);

		// calculate new score
    const newScore = score + addition

    /* I leave this for discussion later. i think it's much cleaner to have it, but then it won't be a pure function.
       Usually this would be calculated in the backend or some sort, but i also like the idea that total score is calculated separately
    */
    // // add this new score to total score
    // setTotalScore(current => current + addition);
    
    // // add this bonus to total bonus
    // setTotalBonus(current => current + (isBonusCondition ? bonusItem.bonusAmount : 0));

    return newScore;
  }

  const handleResetGame = () => {
    setScores({});
    setTotalBonus(0);
    setTotalScore(0);
  }

  return {
    handleClickedItem,
    handleResetGame,
    calculateScorePerItem,
    totalBonus,
    totalScore,
    scores
  }
}