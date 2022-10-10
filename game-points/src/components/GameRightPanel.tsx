import React, { useContext } from 'react'
import styles from '../styles/styles.module.scss'
import { ScoreItem } from '../types';
import { GameContext } from './Game';
import GenericEmptyPanel from './shared/GenericEmptyPanel';
import GenericPanel from './shared/GenericPanel';

const Scores = ({ scoreItems } : { scoreItems: ScoreItem[] }) => {
	return (
		<div className={styles.scoreWrapper}>
			<div className={styles.scoreItemsHolder}>
				<span>Item</span>
				<span>Quantity</span>
				<span>Score</span>
			</div>
			<div className={styles.scoreScroll}>
				{scoreItems.length > 0 ? 
					scoreItems.map(scoreItem => (
						<div key={scoreItem.label} className={styles.scoreItemsHolder}>
							<div className={styles.scoreItemLabel}>{scoreItem.label}</div>
							<div className={styles.scoreItemQuantity}>{scoreItem.quantity}</div>
							<div>{scoreItem.score}</div>
						</div>
					)) : (
						<GenericEmptyPanel message="Start the game by clicking on the tiles!" />
					)
				}
			</div>
		</div>
	)
}

const Bonuses = ({ totalBonus }: { totalBonus: number }) => {
	return (
		<div className={styles.bonuses}>Bonuses: {totalBonus}</div>
	)
}

const TotalScore = ({ totalScore, onReset }: { totalScore: number, onReset: () => void }) => {
	return (
		<div className={styles.totalScore}>
			<div>
				Total <h3> {totalScore} </h3>
			</div>

			<button onClick={onReset}>
				New game
			</button>
		</div>
	)
}

const GameRightPanel = ({title, onReset, style}: {title: string, onReset: () => void, style?: React.CSSProperties;}) => {
	const data = useContext(GameContext);

	const { totalBonus, totalScore, scores } = data;

	const scoreItems = Object.entries(scores || {}).map(([k, v]) => ({ ...v }));

  return (
    <GenericPanel title={title}>
      <div className={styles.rightPanel}>
				<Scores scoreItems={scoreItems} />
				<div>
					<Bonuses totalBonus={totalBonus || 0} />
					<TotalScore totalScore={totalScore || 0} onReset={onReset} />
				</div>
      </div>
    </GenericPanel>
  )
}

export default GameRightPanel;