import { render, screen } from "@testing-library/react";
import App from "../App";
import { GameItem } from "../types";
import React from 'react';
import Game from "./Game";

// put tests here
describe('Game tests', () => {
	const items: GameItem[] = [
		{ label: 'A', unitPoints: 50, bonus: { collect: 3, yield: 200 } },
		{ label: 'B', unitPoints: 30 },
		{ label: 'C', unitPoints: 90 },
	]

	describe('Game left panel', () => {
		it('should render 3 boxes', () => {
			render(<Game items={items} />)
			
			const element = screen.getByText('Kahoot! POINTS');
			expect(element).toBeInTheDocument();

			const boxes = screen.getAllByRole('gameItem');
			expect(boxes).toHaveLength(3);
		})
	})

})

export default test;