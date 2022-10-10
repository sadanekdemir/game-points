import React from 'react';
import styles from '../../styles/styles.module.scss'

const GenericEmptyPanel = ({ message }: { message: string }) => {
  return (
    <div className={styles.emptyPanel}>{message}</div>
  )
}

export default GenericEmptyPanel;