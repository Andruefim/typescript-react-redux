/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'Types'

export interface CitiesState {
  countries: string[]
  status: 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState = {
  countries: [] as any[],
  status: 'idle',
  error: '',
}

interface FetchAction {
  name?: string
  main?: string
  description?: string
  temp?: number
  temp_max?: number
  temp_min?: number
  id?: string
  visibility?: number
}

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (countryName: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=4dfb0c4c9d27781de183190eadde96b8`
    )
    const result = await response.text()
    const obj = JSON.parse(result)
    const readyObj = {
      name: obj.name,
      main: obj.weather[0].main,
      description: obj.weather[0].description,
      temp: Math.floor(obj.main.temp - 273),
      temp_max: Math.floor(obj.main.temp_max - 273),
      temp_min: Math.floor(obj.main.temp_min - 273),
      id: obj.id,
      visibility: Math.floor(obj.visibility / 1000),
    }
    console.log(obj)
    return readyObj
  }
)

const citiesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    deleted(state, action) {
      const { deleteById } = action.payload
      state.countries = state.countries.filter(
        (country: { id: string }) => country.id !== deleteById
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchCountries.fulfilled,
        (state, action: PayloadAction<FetchAction>) => {
          state.status = 'succeeded'
          state.countries = state.countries.concat(action.payload)
        }
      )
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message!
      })
  },
})

export const { deleted } = citiesSlice.actions

export const AllCountries = (state: RootState) => state.countries.countries
export const selectCountryById = (state: RootState, countryId: string) =>
  state.countries.countries.find(
    // eslint-disable-next-line eqeqeq
    (country: { id: string }) => country.id == countryId
  )
export const countriesStatusSelector = (state: RootState) =>
  state.countries.status

export default citiesSlice.reducer
