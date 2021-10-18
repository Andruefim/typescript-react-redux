// /* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../app/hooks'

import {
  fetchCountries,
  AllCountries,
  countriesStatusSelector,
} from '../../redux/citiesSlice/citiesSlice'

import CountryItem from '../../components/cityExcerpt/CityExcerpt'

import logo from '../../images/logo.png'
import searchImg from '../../images/search.png'

type CityName = string[]

interface Types {
  id: number
  name: string
  temp: number
  main: string
}

const CountriesList: React.FC = () => {
  const countriesStatus = useAppSelector(countriesStatusSelector)
  const countries = useAppSelector(AllCountries)

  const dispatch = useDispatch()

  const [search, setSearch] = useState({ value: '' })

  const onSearchChanged = (e: React.ChangeEvent<{ value: string }>) =>
    setSearch({ value: e.currentTarget.value })

  const onSearchClicked = () => {
    if (search) {
      dispatch(fetchCountries(search.value))
      const allCities = countries.map((city: { name: string }) => city.name)
      const fullCities = [...allCities, search.value]
      const serializedSearch = JSON.stringify(fullCities)
      localStorage.setItem('cities', serializedSearch)
    } else {
      console.log('no entries')
    }
  }
  const onLogoClicked = () => {
    setSearch({ value: '' })
  }

  useEffect(() => {
    const serializedSearch = localStorage.getItem('cities')
    const initialCities: CityName = JSON.parse(serializedSearch!)
    // console.log(initialCities)
    if (countriesStatus === 'idle') {
      initialCities.forEach((city: string) => dispatch(fetchCountries(city)))
    }
  }, [countriesStatus, dispatch])

  const renderedCountries = countries.map((country: Types) => (
    <CountryItem key={country.id} countryId={country} />
  ))

  return (
    <>
      <section className="countries-list">
        <div className="header row">
          <button
            onClick={onLogoClicked}
            type="button"
            className="logo-container btn-dark shadow-none h-100 d-flex col-5 col-md-4"
          >
            <div className="logo">
              <img className="logo-img" src={logo} alt="logo" />
            </div>
            <div className="statistic d-flex align-items-stretch mt-2 mx-3">
              <h1>Weather</h1>
            </div>
          </button>
          <div className="search-container col-5 col-md-4 col-lg-3">
            <input
              className="searchInput"
              style={{ border: 'none', outline: 'none' }}
              type="text"
              id="searchValue"
              name="searchValue"
              placeholder="Add city..."
              value={search.value}
              onChange={onSearchChanged}
            />
            <button
              style={{ backgroundColor: 'white', border: 'none' }}
              type="button"
              onClick={onSearchClicked}
            >
              <img className="search-Img" alt="search" src={searchImg} />
            </button>
          </div>
        </div>
        <article className="d-flex mb-4 align-items-center bg-primary py-2 px-5 rounded-3">
          <div className="link-excerpt text-white">
            <div>
              <h3>Your cities</h3>
            </div>
          </div>
        </article>
        <div className="row justify-content-center">{renderedCountries}</div>
      </section>
    </>
  )
}

export default CountriesList
