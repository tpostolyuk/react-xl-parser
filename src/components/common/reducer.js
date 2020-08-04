import * as actions from './constants'

const initialState = {
  parsedData: [],
  cols: [],
  fileName: ''
}

export const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_DATA:
      return {
        ...state,
        parsedData: action.payload
      }
    case actions.SET_COLUMNS:
      return {
        ...state,
        cols: action.payload
      }
    case actions.CLEAR_DATA:
      return {
        ...state
      }
    case actions.SET_FILE_NAME:
      return {
        ...state,
        fileName: action.payload
      }
    default:
      return {
        ...state
      }
  }
}