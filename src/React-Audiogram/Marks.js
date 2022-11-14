export const RightAir = ({ x, y }) => {
  return (
    <circle
      cx={x}
      cy={y}
      r="9"
      strokeWidth="2"
      stroke="red"
      fill="white"
    />
  )
}

export const LeftAir = ({ x, y }) => {
  return (
    <path
      strokeWidth="2"
      stroke="blue"
      d={`m${x - 10},${y - 10} 20,20 m0,-20 -20,20`}
      fill="white"
    />
  )
}

export const BoneLeft = ({ x, y }) => {
  return (
    <path
      stroke="blue"
      strokeWidth="2"
      d={`m${x - 12},${y - 10} ${-10},${10} ${10},${10}`} />
  )
}

export const Lines = ({ points, color }) => {
  return (
    <polyline 
    points={points} 
    strokeWidth="2" 
    stroke={color} 
    
    />
  )
}