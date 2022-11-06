import React, { useEffect, useRef, useState } from "react"
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

const ReactAudiogram = ({ options }) => {
  const [marks, setMarks] = useState({})
  const [selectedMode, setSelectedMode] = useState('rightAir')
  const AudiogramData = useRef({})
  const [dummyState, setDummyState] = useState(0)

  useEffect(() => {
    AudiogramData.current = marks
  }, [dummyState])

  useEffect(() => {
    window.addEventListener('keydown', e => { handleKeypressEvent(e) })
  }, [])

  const handleKeypressEvent = (event) => {
    //console.log(event)
    //return
    if (event.code === 'Space') {
      setSelectedMode('leftAir')
    }
    else if (event.code === 'MetaLeft') {
      setSelectedMode('rightAir')
    }

  }

  const handleMarkCursorClick = (key, x_pos, y_pos) => {
    let obj = AudiogramData.current
    console.log(selectedMode)
    //console.log('handleMarkCursorClick', key.split(',')[0])

    const result = Object.keys(AudiogramData.current).filter(a => a.split(',')[0] === key.split(',')[0])
    if (result.length > 0) {
      const keyToDelete = result.pop()
      delete obj[keyToDelete]
    }

    if (obj.hasOwnProperty(key)) {
      obj[key][selectedMode] = true
      obj[key]['position'] = {
        x: x_pos,
        y: y_pos
      }
    } else {
      obj[key] = {}
      obj[key][selectedMode] = true
      obj[key]['position'] = {
        x: x_pos,
        y: y_pos
      }
    }

    obj[key][selectedMode] = true
    obj[key]['position'] = {
      x: x_pos,
      y: y_pos
    }
    setDummyState(dummyState + 1)
    setMarks(obj)

    console.log(marks)
  }

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
        showBanana={options.showBanana}
        showLetters={options.showLetters}
        showLabels={options.showLabels}
        showInterFQ={options.showInterFQ}
      />

      {
        Object.keys(marks).map((e, i) => {
          if (marks[e].leftAir) {
            return (
              <g className="left-air" x="40" y="50" stroke="blue" key={e}>
                <path
                  className="air-marks"
                  strokeWidth="3"
                  d={`m${marks[e].position.x - 10},${marks[e].position.y - 10} 20,20 m0,-20 -20,20`}

                />
              </g>
            )
          }
        })
      }
      {
        Object.keys(marks).map((e, i) => {
          if (marks[e].rightAir) {
            return (
              <g className="air-marks" x="40" y="50" stroke="red" key={e}>
                <circle cx={marks[e].position.x} cy={marks[e].position.y} r="10" strokeWidth={3} />
              </g>
            )
          }

        })
      }

      <g>
        {frequencyAxis.map((frequency, frequencyIndex) => {
          return decibelAxis.map((decibel, decibelIndex) => {
            if (frequency)
              return (
                <circle
                  onClick={() => handleMarkCursorClick(frequency + ',' + decibel, 30 + frequencyIndex * 50, 30 + decibelIndex * 23)}
                  key={frequency + "," + decibel}
                  className='mark-cursor'
                  cx={30 + frequencyIndex * 50}
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

// {
//   rightAir: true,
//   rightBone: false,
//   rightAirMasked: false,
//   rightBoneMasked: false,
//   rightUCL: false,
//   leftAir: false,
//   leftBone: false,
//   leftAirMasked: false,
//   leftBoneMasked: false,
//   leftUCL: false,
// }