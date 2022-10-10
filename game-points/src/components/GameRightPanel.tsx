import React, { useContext } from 'react'
import styles from '../styles/styles.module.scss'
import { ScoreItem } from '../types';
import { GameContext } from './Game';
import GenericPanel from './shared/GenericPanel';

const Scores = ({ scoreItems } : { scoreItems: ScoreItem[] }) => {
	const data = useContext(GameContext);

	const { scoreItemList: sc } = data
	console.log('sc: ', sc)

	return (
		<div className={styles.scoreWrapper}>
			<div className={styles.scoreItemsHolder}>
				<span>Item</span>
				<span>Quantity</span>
				<span>Score</span>
			</div>
			{scoreItems.length > 0 && 
				scoreItems.map(scoreItem => (
					<div key={scoreItem.label} className={styles.scoreItemsHolder}>
						<div className={styles.scoreItemLabel}>{scoreItem.label}</div>
						<div className={styles.scoreItemQuantity}>{scoreItem.quantity}</div>
						<div>{scoreItem.score}</div>
					</div>
				))
			}
		</div>
	)
}

const Bonuses = ({ totalBonus }: { totalBonus: number }) => {
	return (
		<div className={styles.bonuses}>Bonuses: {totalBonus}</div>
	)
}

const TotalScore = ({ totalScore, onClick }: { totalScore: number, onClick: () => void }) => {
	return (
		<div className={styles.totalScore}>
			<div>
				Total <h3> {totalScore} </h3>
			</div>

			<button onClick={onClick}>
				New game
			</button>
		</div>
	)
}

const GameRightPanel = ({title, scoreItems, totalBonus, totalScore, onClick, style}: {title: string, scoreItems: ScoreItem[], totalBonus: number, totalScore: number, onClick: () => void, style?: React.CSSProperties;}) => {
	const data = useContext(GameContext);

	const { totalBonus: tb, totalScore: ts } = data
	console.log('ts: ', ts)

  return (
    <GenericPanel title={title}>
      <div className={styles.rightPanel}>
				<Scores scoreItems={scoreItems} />
				<Bonuses totalBonus={totalBonus} />
				<TotalScore totalScore={totalScore} onClick={onClick} />
      </div>
    </GenericPanel>
  )
}

export default GameRightPanel;