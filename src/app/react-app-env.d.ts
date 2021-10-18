declare module 'Types' {
  import { StateType } from 'typesafe-actions'

  export type RootState = StateType<
    typeof import('src/features/citiesSlice/countriesSlice/countriesReducer').default
  >
}
