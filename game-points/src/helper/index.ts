import { ScoreList } from "../types";

export const calculateTotalScoreAndBonus = (scores: ScoreList): {
	totalScore: number,
	totalBonus: number
} => {

	let totalScore = 0, totalBonus = 0, totalPlain = 0;

	Object.entries(scores).map(([key, value]) => {
		totalScore += value.score
		totalPlain += value.quantity * value.unitPoints
	})

	totalBonus = totalScore - totalPlain;

	return { totalScore, totalBonus };
}
