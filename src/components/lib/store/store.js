import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import { logger } from '../utils/logger'
import { dataReducer } from '../../common/reducer'

const rootReducer = combineReducers({
  data: dataReducer
})

export const store = createStore(rootReducer, applyMiddleware(logger))
