import React from 'react'
import { connect } from 'react-redux'
import { hideError } from '../../store/actions'
import Button from '../button/Button'

import styles from './ErrorDialog.module.scss'

const ErrorDialog = ({ errorMessage, hideError }) => (
  <div className={`${styles.ErrorDialog} ${errorMessage ? '' : styles['ErrorDialog--hidden']}`}>
    <div className={styles.ErrorDialog__header}>An error has occurred!</div>
    <div className={styles.ErrorDialog__body}>
      <span>{errorMessage}</span>
      <Button clickAction={hideError}>Ok</Button>
    </div>
  </div>
)

const mapStateToProps = ({ errorMessage }) => ({
  errorMessage
})

const mapDispatchToProps = dispatch => ({
  hideError: () => dispatch(hideError())
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog)
