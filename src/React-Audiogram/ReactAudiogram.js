import React, { useEffect, useRef, useState } from "react"
import "./ReactAudiogram.css"
import AudiogramGrid from "./AudiogramGrid"
import Data from './data.json'
import { RightAir, LeftAir, BoneLeft, Lines } from './Marks'

const frequencyAxis = [null, null, 250, null, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000, null, null,]

const decibelAxis = [
  -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
  90, 95, 100, 105, 110, 115, 120,
]

let matrix = decibelAxis.map((decibelValue, decibelIndex) => {
  return frequencyAxis.map((frequencyValue, frequencyIndex) => {
    return {
      valid: frequencyValue !== null,
      frequency: frequencyValue,
      decibel: decibelValue,
      position: {
        x: 30 + frequencyIndex * 50,
        y: 30 + decibelIndex * 23
      },
      markList: []
    }
  })
})

const ReactAudiogram = ({ options }) => {
  const [marks, setMarks] = useState({})
  const [selectedMode, setSelectedMode] = useState('rightAir')
  const AudiogramData = useRef({})
  const [dummyState, setDummyState] = useState(0)

  useEffect(() => {
    AudiogramData.current = marks
  }, [dummyState])

  const handleMarkCursorClick = (y, x, event) => {
    if (event.shiftKey) {
      const ifColumnAlreadyHas = matrix.filter(e => e[x].markList.includes('leftAir')).length > 0
      if (ifColumnAlreadyHas)
        return

      const tempItem = (matrix[y][x])
      tempItem.markList.push('leftAir')
      matrix[y][x] = tempItem
      setDummyState(dummyState + 1)
    }
    else if (event.altKey) {
      const ifColumnAlreadyHas = matrix.filter(e => e[x].markList.includes('rightAir')).length > 0
      if (ifColumnAlreadyHas)
        return

      const tempItem = (matrix[y][x])
      tempItem.markList.push('rightAir')
      matrix[y][x] = tempItem
      setDummyState(dummyState + 1)
    }
    else if (event.ctrlKey) {
      const ifColumnAlreadyHas = matrix.filter(e => e[x].markList.includes('boneLeft')).length > 0
      if (ifColumnAlreadyHas)
        return

      const tempItem = (matrix[y][x])
      tempItem.markList.push('boneLeft')
      matrix[y][x] = tempItem
      setDummyState(dummyState + 1)
    }
  }

  useEffect(() => {

  }, [])

  const renderMarks = () => {
    return (
      <g id="marks">
        {
          matrix.map(y => {
            return y.map(x => {
              if (x.valid) {
                return x.markList.map(a => {
                  if (a === 'rightAir')
                    return <RightAir x={x.position.x} y={x.position.y} />
                  else if (a === 'leftAir')
                    return <LeftAir x={x.position.x} y={x.position.y} />
                  else if (a === 'boneLeft')
                    return <BoneLeft x={x.position.x} y={x.position.y} />
                  else
                    return null

                })
              }
              else {
                return null
              }
            })
          })
        }
      </g>
    )
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
        <g>
          <Lines
            points={matrix.flat().filter(a => a.markList.includes('rightAir')).sort((a, b) => (a.frequency - b.frequency)).map(e => (e.position.x + ',' + e.position.y)).join(' ')}
            color="#ff0000"
          />
        </g>
      }

{
        <g>
          <Lines
            points={matrix.flat().filter(a => a.markList.includes('leftAir')).sort((a, b) => (a.frequency - b.frequency)).map(e => (e.position.x + ',' + e.position.y)).join(' ')}
            color="#0000ff"
          />
        </g>
      }


      {
        renderMarks()
      }



      <g>
        {frequencyAxis.map((frequency, frequencyIndex) => {
          return decibelAxis.map((decibel, decibelIndex) => {
            if (frequency)
              return (
                <circle
                  onClick={(event) => handleMarkCursorClick(decibelIndex, frequencyIndex, event)}
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


      <g>

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