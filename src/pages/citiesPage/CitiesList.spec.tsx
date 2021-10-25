import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import CitiesList from './CitiesList'

describe('CitiesList', () => {
  const mockStore = configureStore([])
  const store = mockStore({
    countries: {
      countries: [
        {
          id: 43,
          name: 'london',
          temp: 20,
          main: 'clouds',
        },
      ],
      status: 'idle',
    },
  })

  jest.spyOn(store, 'dispatch')

  beforeEach(() => {
    store.dispatch.mockClear()
  })

  it('renders without crashing.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <CitiesList />
        </Router>
      </Provider>
    )

    const countryName = wrapper.find('strong').text()
    expect(countryName).toBe('london')
  })

  it('should be possible to add city.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <CitiesList />
        </Router>
      </Provider>
    )

    wrapper.find('button').filter({ 'data-qa': 'add-city' }).simulate('click')

    expect(store.dispatch).toBeCalledTimes(1)
  })

  it('refreshes search input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <CitiesList />
        </Router>
      </Provider>
    )

    wrapper
      .find('button')
      .filter({ 'data-qa': 'refresh-search' })
      .simulate('click')

    const currentSearch = wrapper
      .find('input')
      .filter({ 'data-qa': 'input-search' })
      .find('value')

    expect(currentSearch).toEqual({})
  })
})
