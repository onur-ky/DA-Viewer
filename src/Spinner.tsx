import React from 'react'
import './Spinner.css'

type spinnerProps = {
    text?: string;
    width: number;
    height: number;
};

function Spinner(props: spinnerProps): JSX.Element {
  return (
    <div className="spinner-container">
        <div className='spinner' style={{
            width: props.width, 
            height: props.height
        }}></div>
        <div className="spinner-text" style={{width: props.width, height: props.height}}>{props.text}</div>
    </div>
  )
}

export default Spinner