import React from "react"
import "./ReactAudiogram.css"
import AudiogramGrid from "./AudiogramGrid"

const frequencyAxis = [
  null,
  null,
  250,
  null,
  500,
  750,
  1000,
  1500,
  2000,
  3000,
  4000,
  6000,
  8000,
  null,
  null,
]

const decibelAxis = [
  -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
  90, 95, 100, 105, 110, 115, 120,
]

const ReactAudiogram = ({
  showLetters,
  showInterFQ,
  showBanana,
  showLabels,
}) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 735 635'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid '
    >
      <AudiogramGrid
        showBanana={showBanana}
        showLetters={showLetters}
        showLabels={showLabels}
        showInterFQ={showInterFQ}
      />
      <g>
        {frequencyAxis.map((frequency, frequencyIndex) => {
          return decibelAxis.map((decibel, decibelIndex) => {
            if (frequency)
              return (
                <circle
                  data-deniz={frequency + "," + decibel}
                  key={frequency + "," + decibel}
                  className='mark-cursor'
                  cx={30 + frequencyIndex * 49.98}
                  cy={30 + decibelIndex * 23}
                  r={11}
                />
              )
            return null
          })
        })}
      </g>
    </svg>
  )
}

export default ReactAudiogram
