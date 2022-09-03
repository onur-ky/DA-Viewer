import React from 'react'
import './Spinner.css'

function Spinner(): JSX.Element {
  return (
    <div className="spinner-container">
        <div className='spinner'></div>
        <div className="spinner-text">LOADING...</div>
    </div>
  )
}

export default Spinner