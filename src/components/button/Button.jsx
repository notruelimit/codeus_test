import React from 'react'

import styles from './Button.module.scss'

const Button = ({ clickAction, disabled, children }) => (
  <div className={styles.Button}>
    <button onClick={clickAction} disabled={disabled}>{children}</button>
  </div>
)

export default Button
