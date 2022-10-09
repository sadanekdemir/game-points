import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles.module.scss'

const GenericPanel = ({ title, children, width, className } : { title: string | React.ReactNode, children: React.ReactNode, width?: number, className?: string }) => {

	const [cl, setCl] = useState([styles.panel]);
	const [innerClassName, setInnerClassName] = useState('')

	useEffect(() => {
		if (className) {
			setCl(cl => [...cl, className])
		}
		const tempAsString = cl.join(' ');
		setInnerClassName(tempAsString);
	}, [className])

  return (
    <div className={innerClassName}>
      <div className={styles.title}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default GenericPanel;