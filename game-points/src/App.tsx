import { useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'

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

function App() {
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  const [clickedItems, setClickedItems] = useState<GameItem[]>([]);

  const handleClick = (item: GameItem) => {
    console.log('unitPoints: ', item.unitPoints)
    setClickedItems(current => [...current, item]);
  }

  const calculateScore = useCallback(() => {
    // this is the shit
    if (clickedItems.length === 0) return;

    console.log('clicked items: ', clickedItems)

    const grouped: GroupedItem = clickedItems.reduce((items: GroupedItem, item: GameItem) => {
      const temp = item['label'];

      const currentGroup = items[temp] ?? [];

      return { ...items, [temp]: [...currentGroup, item]}
    }, {})

    console.log('grouped: ', grouped)

    let totalItemPoints = 0;

    Object.keys(grouped).map(label => {
      // get item
      const { unitPoints, bonus} = items.find(item => item.label === label) as GameItem;
      const length = grouped[label].length;

      const isBonusCondition = bonus && length >= bonus.collect;
      
      // check if there's bonus
      totalItemPoints += isBonusCondition ? bonus.yield + (length - bonus.collect) * unitPoints : unitPoints * length;
    })

    setScore(totalItemPoints);


  }, [clickedItems])

  useEffect(()=>{
    clickedItems.length > 0 && calculateScore();
  },[clickedItems])

  return (
    <div className={styles.gameApp}>
      <div className={styles.wrapper}>
        {items.map(item => (
          <div key={item.label} className={styles.item} onClick={() => handleClick(item)}>{item.label}</div>
        ))}
      </div>
      <div>
        <div>Score: {score}</div>
        <div></div>
      </div>
    </div>
  )
}

export default App
