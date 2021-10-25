/* eslint-disable react/prop-types */
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

import { selectCountryById } from '../../redux/citiesSlice/citiesSlice'

import '../../App'

type SingleProps = {
  countryId: string
}

const SingleCityPage = ({ match }: RouteComponentProps<SingleProps>) => {
  const { countryId } = match.params
  const country = useAppSelector((state) => selectCountryById(state, countryId))

  if (!country) {
    return (
      <section>
        <h2>Country not found!</h2>
      </section>
    )
  }

  return (
    <section className="singlecountry-container">
      <article className="userSingle d-flex flex-column align-items-center">
        <h1 className="mt-4">
          <strong>{country.name}</strong>
        </h1>
        <div className="d-flex">
          <h1>{`${country.temp}°C`}</h1>
        </div>
        <div className="d-flex">
          <h4>{country.description}</h4>
        </div>
        <div className="d-flex">
          <h4 className="mx-4">{`Min: ${country.temp_min}°C`}</h4>
          <h4>{`Max: ${country.temp_max}°C`}</h4>
        </div>
        <div className="d-flex">
          <h4>Visibility</h4>
          <h4>{`: ${country.visibility}km`}</h4>
        </div>
      </article>
      <div className="button-okContainer row">
        <Link to="/" className="btn btn-primary col-4">
          OK
        </Link>
      </div>
    </section>
  )
}

export default SingleCityPage
