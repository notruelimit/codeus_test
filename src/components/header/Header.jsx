import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../store/actions'
import IndexField from '../index-field/IndexField'
import Button from '../button/Button'

import styles from './Header.module.scss'

class Header extends React.Component {
  state = {
    fromIndex: null,
    toIndex: null,
    fromError: '',
    toError: ''
  }

  componentDidMount () {
    this.props.fetchData(1, 20, '')
  }

  setIndex = event => {
    let { name, value } = event.target
    value = +value
    let fromIndex = +this.state.fromIndex
    let toIndex = +this.state.toIndex

    if (value < 1 || value > 1000) {
      this.setState({ [`${name}Error`]: 'Index must be between 1 and 1000' })
    } else {
      this.setState({ [`${name}Error`]: '' })
    }

    if (name === 'from' && toIndex) {
      if (value >= toIndex) {
        this.setState({ fromError: 'The from index must be smaller than the to index' })
      } else {
        if (value > 1 && value < 1000) {
          this.setState({ fromError: '' })
        }
      }
    }

    if (name === 'to' && fromIndex) {
      if (value <= fromIndex) {
        this.setState({ fromError: 'The from index must be smaller than the to index' })
      } else {
        if (value > 1 && value < 1000) {
          this.setState({ fromError: '' })
        }
      }
    }

    this.setState({ [`${name}Index`]: value })
  }

  submitForm = event => {
    event.preventDefault()

    const { fetchData, token } = this.props
    const { fromIndex, toIndex, fromError, toError } = this.state

    if (!fromError && !toError) {
      fetchData(fromIndex, toIndex, token)
    }
  }

  render () {
    const { fromError, toError, fromIndex, toIndex } = this.state
    let isDisabled = true
    if (fromIndex && toIndex && !fromError && !toError) {
      isDisabled = false
    }

    return (
      <form className={styles.Header}>
        <IndexField
          name="from"
          placeholder={'From'}
          setIndex={event => this.setIndex(event)}
          error={fromError}
        />
        <IndexField
          name="to"
          placeholder={'To'}
          setIndex={event => this.setIndex(event)}
          error={toError}
        />
        <Button clickAction={this.submitForm} disabled={isDisabled}>Get data</Button>
      </form>
    )
  }
}

const mapStateToProps = ({ token }) => ({ token })

const mapDispatchToProps = dispatch => ({
  fetchData: (from, to, token) => dispatch(fetchData(from, to, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
