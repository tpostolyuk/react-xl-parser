import * as actions from './constants'

export const setData = payload => ({ type: actions.SET_DATA, payload })
export const setColumns = payload => ({ type: actions.SET_COLUMNS, payload })
export const setFileName = payload => ({ type: actions.SET_FILE_NAME, payload })
export const clearData = () => ({ type: actions.CLEAR_DATA })