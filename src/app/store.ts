import { configureStore } from '@reduxjs/toolkit'
import citiesReducer from '../redux/citiesSlice/citiesSlice'

export const store = configureStore({
  reducer: {
    countries: citiesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >
