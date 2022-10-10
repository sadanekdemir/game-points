import { useGameEngine, useGetGameData } from "./game-hooks";
import { renderHook, waitFor } from '@testing-library/react';
import { GameItem } from "../types";
import { calculateTotalScoreAndBonus } from "../helper";

describe('useGetGameData hook', () => {
	const items: GameItem[] = [
		{ label: 'A', unitPoints: 50, bonus: { collect: 3, yield: 200 } },
		{ label: 'B', unitPoints: 30 },
		{ label: 'C', unitPoints: 90 },
	]

	describe('useGetGameData', () => {
		it('should return 3 game items, 1 bonus item', () => {			
			const { result } = renderHook(() => useGetGameData(items) );
			const { gameItems, bonusItems } = result.current;
	
			expect(gameItems).toHaveLength(3);
			expect(bonusItems).toHaveLength(1);
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
			const { scoreItemList, handleClickedItem } = result.current;

			const clickedItem: GameItem = items.find(item => item.label === 'A')!;

			handleClickedItem(clickedItem);

			const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scoreItemList);

			await waitFor(() => {
				expect(scoreItemList).toHaveLength(1);
				expect(totalScore).toBe(50);
				expect(totalBonus).toBe(0);
			})
		})

		it('simulating clicking on item A for 3 times, on item C for 2 times ', async () => {
			const { result } = renderHook(() => useGameEngine(items) );
			const { scoreItemList, handleClickedItem } = result.current;

			const clickedItem1: GameItem = items.find(item => item.label === 'A')!;

			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);
			handleClickedItem(clickedItem1);

			const clickedItem2: GameItem = items.find(item => item.label === 'C')!;

			handleClickedItem(clickedItem2);
			handleClickedItem(clickedItem2);


			const { totalScore, totalBonus } = calculateTotalScoreAndBonus(scoreItemList);

			await waitFor(() => {
				expect(scoreItemList).toHaveLength(2);
				expect(totalScore).toBe(380);
				expect(totalBonus).toBe(50);
			})
		})
	})
})

export default test;