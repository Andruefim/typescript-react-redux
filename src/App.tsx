/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// eslint-disable-next-line import/no-cycle
import SingleCountryPage from './pages/singleCityPage/SingleCityPage'
import CountriesList from './pages/citiesPage/CitiesList'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={CountriesList} />
        <Route path="/countries/:countryId" component={SingleCountryPage} />
      </div>
    </Router>
  )
}

export default App
