import { useGameEngine, useGetGameData } from "./game-hooks";
import { renderHook, waitFor } from '@testing-library/react';
import { GameItem, ScoreList } from "../types";
import { calculateTotalScoreAndBonus } from "../helper";

describe('useGetGameData hook', () => {
	const items: GameItem[] = [
		{ label: 'A', unitPoints: 50, bonus: { collect: 3, yield: 200 } },
		{ label: 'B', unitPoints: 30, bonus: { collect: 2, yield: 90  } },
		{ label: 'C', unitPoints: 90 },
	]

	describe('useGetGameData', () => {
		it('should return 3 game items, 2 bonus items', () => {			
			const { result } = renderHook(() => useGetGameData(items) );
			const { gameItems, bonusItems } = result.current;
	
			expect(gameItems).toHaveLength(3);
			expect(bonusItems).toHaveLength(2);
		})
	})

	describe('useGameEngine', () => {
		it('initial state, should return 0 for total score and total bonus', () => {
			const { result } = renderHook(() => useGameEngine(items) );
			const { totalBonus, totalScore } = result.current;

			expect(totalScore).toBe(0);
			expect(totalBonus).toBe(0);
		})

		it('simulating clicking on item A one time', async () => {
			const { result } = renderHook(() => useGameEngine(items) );
			const { scores, handleClickedItem } = result.current;

			const clickedItem: GameItem = items.find(item => item.label === 'A')!;

			handleClickedItem(clickedItem);

			const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scores);

			await waitFor(() => {
				expect(Object.keys(scores)).toHaveLength(1);
				expect(totalScore).toBe(50);
				expect(totalBonus).toBe(0);
			})
		})

		it('simulating clicking on item A for 3 times, on item C for 2 times ', async () => {
			const { result } = renderHook(() => useGameEngine(items) );
			const { scores, handleClickedItem } = result.current;

			const clickedItem1: GameItem = items.find(item => item.label === 'A')!;

			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);

			const clickedItem2: GameItem = items.find(item => item.label === 'C')!;

			handleClickedItem(clickedItem2);
			handleClickedItem(clickedItem2);


			const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scores);

			await waitFor(() => {
				expect(Object.keys(scores)).toHaveLength(2);
				expect(totalScore).toBe(380);
				expect(totalBonus).toBe(50);
			})
		})

		it('simulating clicking on item B for 4 times shall give multiple bonuses', async () => {
			const { result } = renderHook(() => useGameEngine(items) );
			const { scores, handleClickedItem } = result.current;

			const clickedItem1: GameItem = items.find(item => item.label === 'B')!;

			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);

			const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scores);

			await waitFor(() => {
				expect(Object.keys(scores)).toHaveLength(1);
				expect(totalScore).toBe(180);
				expect(totalBonus).toBe(60);
			})
		})

		it('testing calculateTotalScoreAndBonus', () => {
			const scores: ScoreList = {
				'A': {label: 'A', quantity: 3, score: 120, unitPoints: 30},
				'G': {label: 'G', quantity: 5, score: 120, unitPoints: 10},
			}

			const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scores);

			expect(totalScore).toBe(240)
			expect(totalBonus).toBe(100)
		})
	})
})

export default test;