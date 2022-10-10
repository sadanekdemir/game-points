import React, { useContext } from 'react'
import styles from '../styles/styles.module.scss'
import { GameItem } from '../types';
import { GameContext } from './Game';
import GenericEmptyPanel from './shared/GenericEmptyPanel';
import GenericPanel from './shared/GenericPanel';

const GameLeftPanel = ({ title, onClick, style }:{ title: React.ReactNode, onClick: (item: GameItem) => void, style?: React.CSSProperties; }) => {
  const data = useContext(GameContext);

	const { gameItems } = data;

  const GameTiles = ({ gameItems }: {gameItems: GameItem[]}) => {
    return (
      <div className={styles.gameWrapper}>
        {gameItems.map(item => (
          <GameTile item={item} />
        ))}
      </div>
    )
  }

  const GameTile = ({ item } : {item: GameItem}) => {
    return (
      <div key={item.label} role='gameItem' className={styles.item} onClick={() => onClick(item)}>{item.label}</div>
    )
  }
  
  return (
    <GenericPanel title={title} width={600}>
      <div className={styles.leftPanel}>
        <h4>ITEMS</h4>
        {gameItems && gameItems?.length > 0 ? (
          <GameTiles gameItems={gameItems} />
        ) : (
          <GenericEmptyPanel message="Something seems to be off.." />
        )
        }
      </div>
    </GenericPanel>
  )
}

export default GameLeftPanel;