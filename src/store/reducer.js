import { FETCHING_DATA, FETCHED_DATA, FETCHED_DATA_ERROR, HIDE_ERROR } from './action-types'

const INITIAL_STATE = {
  data: [],
  token: '',
  loading: false,
  errorMessage: ''
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        loading: true
      }
    case FETCHED_DATA:
      let { from, to, data, token } = action.payload

      let nextIndex = data[0].index + 1
      const missingItems = []
      data = data.map((item, i) => {
        if (data.length > i + 1 && data[i + 1].index !== nextIndex) {
          for (let j = nextIndex; j < data[i + 1].index; j++) {
            missingItems.push({ index: j, slot: 0, city: 'None', velocity: '0.00' })
          }
        }
        if (!item.slot) {
          item.slot = 0
        }
        if (!item.city) {
          item.city = 'None'
        }
        if (!item.velocity) {
          item.velocity = '0.00'
        }
        nextIndex = data.length > i + 1 ? data[i + 1].index + 1 : to
        return item
      })

      if (+from !== data[0].index) {
        for (let i = +from; i < data[0].index; i++) {
          missingItems.push({ index: i, slot: 0, city: 'None', velocity: '0.00' })
        }
      }

      if (+to !== data[data.length - 1].index) {
        for (let i = data[data.length - 1].index + 1; i <= +to; i++) {
          missingItems.push({ index: i, slot: 0, city: 'None', velocity: '0.00' })
        }
      }

      data = data.concat(missingItems)
      data.sort((a, b) => a.index - b.index)

      return {
        data,
        token,
        loading: false
      }
    case FETCHED_DATA_ERROR:
      const { errorMessage, code } = action.payload
      return {
        ...state,
        errorMessage,
        token: code === 5 ? '' : state.token,
        loading: false
      }
    case HIDE_ERROR:
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state
  }
}

export default reducer
