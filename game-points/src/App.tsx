import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './App.module.scss'

interface Bonus {
  collect: number,
  yield: number
}

type GameItem = {
  label: string,
  unitPoints: number,
  bonus?: Bonus,
}

type BonusItem = Omit<GameItem, 'unitPoints'>;

type GroupedItem = {
  [label: string] : GameItem[]
}

const items: GameItem[] = [
  {label: 'A', unitPoints: 50, bonus: { collect: 3, yield: 200 } },
  {label: 'B', unitPoints: 30, bonus: { collect: 2, yield: 90 } },
  {label: 'C', unitPoints: 20 },
  {label: 'D', unitPoints: 15 },
  {label: 'E', unitPoints: 10 },
]

interface ScoreItem {
  label: string,
  quantity: number,
  score: number
  unitPoints?: number,
}

const useGetGameData = (items: GameItem[]): {
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

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);
  const [scoreItemList, setScoreItemList] = useState<ScoreItem[]>([]);

  const { gameItems, bonusItems } = useGetGameData(items);

  const handleClickedItem = (item: GameItem) => {
    // check if label exists, if so, increase quantity, or else add a new member
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

  const handleResetGame = () => {
    setScoreItemList([])
    setTotalBonus(0);
    setTotalScore(0);
  }

  const calculateScorePerItem = (scoreItem: ScoreItem) => {
    // get properties
    const { label, quantity, unitPoints = 0, score = 0 } = scoreItem;

    // check if there's bonus
    const bonus = bonusItems.find(item => item.label === label)?.bonus;

    // check if there's bonus condition 
    const isBonusCondition = bonus && quantity === bonus?.collect;
    const bonusAmount = isBonusCondition ? bonus.yield - quantity  * unitPoints : 0

    const addition = unitPoints + (isBonusCondition ? bonusAmount : 0);

    const newScore = score + addition

    // add this new score to total score
    setTotalScore(current => current + addition);
    // add this bonus to total bonus
    setTotalBonus(current => current + bonusAmount);

    return newScore;
  }

  return (
    <div className={styles.main}>
      <div className={styles.gameApp}>
        <GameLeftPanel title="Kahoot! POINTS" gameItems={gameItems} onClick={(item) => handleClickedItem(item)} />
        <GameRightPanel title="PLAYER ITEMS" onClick={handleResetGame} scoreItems={scoreItemList} totalBonus={totalBonus} totalScore={totalScore} />
      </div>
    </div>
  )
}

const GenericPanel = ({ title, children, width} : { title: string | React.ReactNode, children: React.ReactNode, width?: number }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        {title}
      </div>
      {children}
    </div>
  )
}

const GameLeftPanel = ({ title, gameItems, onClick, style }:{ title: React.ReactNode, gameItems: GameItem[], onClick: (item: GameItem) => void, style?: React.CSSProperties; }) => {
  return (
    <GenericPanel title={title} width={600}>
      <div className={styles.leftPanel}>
        <h4>ITEMS</h4>
        <div className={styles.gameWrapper}>
          {gameItems.map(item => (
            <div key={item.label} className={styles.item} onClick={() => onClick(item)}>{item.label}</div>
          ))}
        </div>
      </div>
    </GenericPanel>
  )
}

const GameRightPanel = ({title, scoreItems, totalBonus, totalScore, onClick, style}: {title: string, scoreItems: ScoreItem[], totalBonus: number, totalScore: number, onClick: () => void, style?: React.CSSProperties;}) => {
  

  return (
    <GenericPanel title={title}>
      <div className={styles.rightPanel}>
        <div className={styles.scoreWrapper}>
          <div className={styles.scoreItemsHolder}>
            <div>Item</div>
            <div>Quantity</div>
            <div>Score</div>
          </div>
          {scoreItems.length > 0 && 
            scoreItems.map(scoreItem => (
              <div key={scoreItem.label} className={styles.scoreItemsHolder}>
                <div className={styles.scoreItemLabel}>{scoreItem.label}</div>
                <div className={styles.scoreItemQuantity}>{scoreItem.quantity}</div>
                <div className={styles.scoreItemScore}>{scoreItem.score}</div>
              </div>
            ))
          }
        </div>
        <div>
          <div className={styles.bonuses}>Bonuses: {totalBonus}</div>
          <div className={styles.totalScore}>
            <div>
              Total <h3> {totalScore} </h3>
            </div>

            <button onClick={onClick}>
              New game
            </button>
          </div>
        </div>
      </div>
    </GenericPanel>
  )
}

export default App
