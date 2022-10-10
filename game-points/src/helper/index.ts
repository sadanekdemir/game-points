import { ScoreList } from "../types";

// export const calculateTotalScoreAndBonus = (scores: ScoreItem[]): {
// 	totalScore: number,
// 	totalBonus: number
// } => {
// 	const totalScore = scores.reduce((acc, item) => acc + item.score, 0);

// 	const totalScoreWithoutBonus = scores.reduce((acc, item) => acc + item.quantity * item.unitPoints, 0);

// 	const totalBonus = totalScore - totalScoreWithoutBonus;

// 	return { totalScore, totalBonus };
// }

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
