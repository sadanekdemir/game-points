import React from 'react'
import styles from '../styles/styles.module.scss'
import { GameItem } from '../types';
import GenericPanel from './shared/GenericPanel';

const GameLeftPanel = ({ title, gameItems, onClick, style }:{ title: React.ReactNode, gameItems: GameItem[], onClick: (item: GameItem) => void, style?: React.CSSProperties; }) => {
  return (
    <GenericPanel title={title} width={600}>
      <div className={styles.leftPanel}>
        <h4>ITEMS</h4>
        <div className={styles.gameWrapper}>
          {gameItems.map(item => (
            <div key={item.label} role='gameItem' className={styles.item} onClick={() => onClick(item)}>{item.label}</div>
          ))}
        </div>
      </div>
    </GenericPanel>
  )
}

export default GameLeftPanel;