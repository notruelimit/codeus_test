import React from 'react'
import { connect } from 'react-redux'
import Loader from '../loader/Loader'

import styles from './Table.module.scss'

const Table = ({ data, loading }) => (
  <div className={styles.Table}>
    {
      loading ?
        <Loader />
        :
        <table>
          <thead>
          <tr>
            <th>Index</th>
            <th>Slot</th>
            <th>City</th>
            <th>Velocity</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item, i) => (
            <tr key={i + 'tr'}>
              {Object.keys(item).map((key, i) => (
                <td key={i + 'td'}>{item[key]}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
    }
  </div>
)

const mapStateToProps = ({ data, loading }) => ({
  data,
  loading
})

export default connect(mapStateToProps)(Table)
