import React from 'react'

import styles from './IndexField.module.scss'

const IndexField = ({ placeholder, setIndex, name, error }) => (
  <div className={styles.InputField}>
    <input
      type="number"
      placeholder={placeholder}
      min="1"
      max="1000"
      onChange={setIndex}
      name={name}
    />
    {error ? <span className={styles.InputField__error}>{error}</span> : null}
  </div>
)

export default IndexField
