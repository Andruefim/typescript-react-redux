import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import countriesReducer from './redux/citiesSlice/citiesSlice'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  countries: countriesReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
