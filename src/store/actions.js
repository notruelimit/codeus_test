import { FETCHING_DATA, FETCHED_DATA, FETCHED_DATA_ERROR, HIDE_ERROR } from './action-types'
import axios from 'axios'

export const fetchData = (from, to, token) => async dispatch => {
  dispatch({ type: FETCHING_DATA })
  try {
    const { data } = await axios.get(`https://f-test-02.glitch.me/data?from=${from}&to=${to}${token ? '&token=' + token : ''}`)
    dispatch({ type: FETCHED_DATA, payload: { from, to, ...data } })
  } catch (error) {
    dispatch({
      type: FETCHED_DATA_ERROR,
      payload: { errorMessage: error.response.data ? error.response.data.error.message : 'An internal error has occurred.', code: Math.floor(error.response.status / 100) }
    })
  }
}

export const hideError = () => ({
  type: HIDE_ERROR
})
