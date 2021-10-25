import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import fetchMock from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store' // mock store
import thunk from 'redux-thunk'
import 'whatwg-fetch'

import slice, { fetchCountries } from './citiesSlice'

const middlewares = [thunk]
export const mockStore = configureMockStore(middlewares)

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  )
}

describe('ACTION TESTS', () => {
  it('should fetchCountries', () => {
    const expectedActions = [
      {
        type: 'countries/fetchCountries/pending',
      },
      {
        type: 'countries/fetchCountries/fulfilled',
      },
    ]
    const store = mockStore({})
    mockFetch(()=>
      Promise.resolve({
        json: () => Promise.resolve({ obj: { name: 'london' } })
      })
    )
    return store.dispatch(fetchCountries('london')).then(() => {
      expect(
        store.getActions().map((action) => ({
          type: action.type,
        }))
      ).toEqual(expectedActions)
    })
  })
})

describe('cities slice tests', () => {
  it('should set loading status to "loading"', () => {
    const action = { type: fetchCountries.pending }
    // const initialState = conversionSlice(
    //   {
    //     status: 'idle',
    //   },
    //   action
    // )
    const initialState = {
      status: 'idle',
    }
    expect(slice(initialState, action)).toEqual({ status: 'loading' })
  })

  it('should add new city when action is fulfilled', () => {
    const action = {
      type: fetchCountries.fulfilled,
      payload: { id: 1, name: 'london' },
    }
    const initialState = {
      status: 'idle',
      countries: [],
    }

    expect(slice(initialState, action)).toEqual({
      status: 'succeeded',
      countries: [{ id: 1, name: 'london' }],
    })
  })

  it('should set error when action is rejected', () => {
    const action = {
      type: fetchCountries.rejected,
    }
    const initialState = {
      status: 'idle',
      error: '',
    }

    expect(slice(initialState, action)).toEqual({
      status: 'failed',
      error: undefined,
    })
  })
})
