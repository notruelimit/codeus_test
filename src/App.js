import React from 'react'
import Header from './components/header/Header'
import Table from './components/table/Table'
import ErrorDialog from './components/error-dialog/ErrorDialog'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Table />
      <ErrorDialog />
    </div>
  )
}

export default App;
