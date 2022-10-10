import { BonusItem, ScoreItem } from "../types";

export const calculateTotalScoreAndBonus = (scores: ScoreItem[]): {
	totalScore: number,
	totalBonus: number
} => {
	const totalScore = scores.reduce((acc, item) => acc + item.score, 0);

	const totalScoreWithoutBonus = scores.reduce((acc, item) => acc + item.quantity * item.unitPoints, 0);

	const totalBonus = totalScore - totalScoreWithoutBonus;

	return { totalScore, totalBonus };
}

export const calculateScorePerItem = (scoreItem: ScoreItem, bonusItems: BonusItem[]) => {
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

	// // add this new score to total score
	// setTotalScore(current => current + addition);
	
	// // add this bonus to total bonus
	// setTotalBonus(current => current + bonusAmount);

	return newScore;
}