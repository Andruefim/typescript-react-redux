import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import SinglePage from './SingleCityPage'

describe('SinglePage', () => {
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

  const expectedProps = {
    match: {
      params: {
        countryId: '43',
      },
      isExact: true,
      path: '',
      url: '',
    },
    history: undefined,
    location: undefined,
  }

  it('should call a SingleCityPage with correct props.', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Router>
          <SinglePage
            match={{
              params: { countryId: '43' },
              isExact: true,
              path: '',
              url: '',
            }}
            history={undefined}
            location={undefined}
          />
        </Router>
      </Provider>
    )

    expect(wrapper.find('SingleCityPage').props()).toEqual(expectedProps)
  })

  it('includes link to homepage.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
        <SinglePage
            match={{
              params: { countryId: '43' },
              isExact: true,
              path: '',
              url: '',
            }}
            history={undefined}
            location={undefined}
          />
        </Router>
      </Provider>
    )

    expect(wrapper.find('Link').prop('to')).toEqual('/')
  })
})
