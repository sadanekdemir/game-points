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
}

function App() {
  const [score, setScore] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);

  const [clickedItems, setClickedItems] = useState<GameItem[]>([]);

  const [groupedItems, setGroupedItems] = useState<GroupedItem>({});

  const handleClick = (item: GameItem) => {
    setClickedItems(current => [...current, item]);
  }

  useEffect(()=>{
    clickedItems.length > 0 && handleClickedItem();
  },[clickedItems])

  const handleClickedItem = useCallback(() => {
    const grouped: GroupedItem = clickedItems.reduce((items: GroupedItem, item: GameItem) => {
      const temp = item['label'];

      const currentGroup = items[temp] ?? [];

      return { ...items, [temp]: [...currentGroup, item]}
    }, {})

    setGroupedItems(grouped);

    let totalItemPoints = 0;
    let totalBonusPoints = totalBonus;

    Object.keys(grouped).map(label => {
      const { unitPoints, bonus} = items.find(item => item.label === label) as GameItem;
      const length = grouped[label].length;

      // check if there's bonus
      const isBonusCondition = bonus && length === bonus.collect;
      
      totalItemPoints += isBonusCondition ? bonus.yield + (length - bonus.collect) * unitPoints : unitPoints * length;
      if (isBonusCondition) totalBonusPoints += bonus.yield - (unitPoints * length);
    })

    setScore(totalItemPoints);
    setTotalBonus(totalBonusPoints);

  }, [clickedItems])

  const handleResetGame = () => {
    setGroupedItems({});
    setClickedItems([]);
    setTotalBonus(0);
    setScore(0);
  }

  console.log('i am rendered')

  return (
    <div className={styles.gameApp}>
      <GameLeftPanel title="Kahoot! POINTS" onClick={(item) => handleClick(item)} />
      <GameRightPanel title="PLAYER ITEMS" onClick={handleResetGame} groupedItems={groupedItems} totalBonus={totalBonus} totalScore={score} />
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

const GameLeftPanel = ({ title, onClick, style }:{ title: React.ReactNode, onClick: (item: GameItem) => void, style?: React.CSSProperties; }) => {
  return (
    <GenericPanel title={title} width={600}>
      <div className={styles.leftPanel}>
        <h4>ITEMS</h4>
        <div className={styles.gameWrapper}>
          {items.map(item => (
            <div key={item.label} className={styles.item} onClick={() => onClick(item)}>{item.label}</div>
          ))}
        </div>
      </div>
    </GenericPanel>
  )
}

const calculateScorePerItem = (item: GameItem, quantity: number) => {
  const { unitPoints, bonus} = item;
  const length = quantity;
  const isBonusCondition = bonus && length >= bonus.collect && unitPoints * length < bonus.yield;
    
  // check if there's bonus
  const score = isBonusCondition ? bonus.yield + (length - bonus.collect) * unitPoints : unitPoints * length;

  return score;
}

const GameRightPanel = ({title, groupedItems, totalBonus, totalScore, onClick, style}: {title: string, totalBonus: number, totalScore: number, onClick: () => void, groupedItems: GroupedItem, style?: React.CSSProperties;}) => {

  console.log('im hit')

  const scoreItems: ScoreItem[] = useMemo(() => {
    return Object.keys(groupedItems).map(label => ( {
      label: label,
      quantity: groupedItems[label].length,
      score: calculateScorePerItem(groupedItems[label][0], groupedItems[label].length),
    }))
  }, [groupedItems]) 

  return (
    <GenericPanel title={title}>
      {/* this will be in a context later and will listen to the bonuses n stuff, for now all in the same component */}
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
