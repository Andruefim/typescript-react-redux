import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import Excerpt from './CityExcerpt'

describe('Excerpt', () => {
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
    },
  })

  jest.spyOn(store, 'dispatch')

  beforeEach(() => {
    store.dispatch.mockClear()
  })

  const obj = {
    id: 43,
    name: 'london',
    temp: 20,
    main: 'clouds',
  }

  it('renders without crashing.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Excerpt countryId={obj} />
        </Router>
      </Provider>
    )

    const countryName = wrapper.find('strong').text()
    expect(countryName).toBe('london')
  })

  it('should be possible to update city.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Excerpt countryId={obj} />
        </Router>
      </Provider>
    )

    wrapper
      .find('button')
      .filter({ 'data-qa': 'update-clicked' })
      .simulate('click')

    expect(store.dispatch).toBeCalledTimes(2)
  })

  it('should be possible to delete city.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Excerpt countryId={obj} />
        </Router>
      </Provider>
    )

    wrapper
      .find('button')
      .filter({ 'data-qa': 'delete-clicked' })
      .simulate('click')

    expect(store.dispatch).toBeCalledTimes(1)
  })
})
