import React from 'react'
import {LoadScript} from '@react-google-maps/api'
import Map from './Map'
const libraries=['places']
const GoogelMap = () => {

  return (
<LoadScript googleMapsApiKey='AIzaSyBZq5ejEeybo_1qhiWHIJlC66CZ3mrUrUI' libraries={libraries}>
<Map/>
</LoadScript>
  )
}

export default GoogelMap