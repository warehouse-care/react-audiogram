import "./App.css"
import ReactAudiogram from "./React-Audiogram/ReactAudiogram"

// const AUDIOGRAMDATA = {
//   right: {
//     air: [500, 1000, 1500],
//     maskedAir: [],
//     bone: [],
//     maskedBone: [],
//   },
//   left: {
//     air: [],
//     maskedAir: [],
//     bone: [],
//     maskedBone: [],
//   },
// }

function App() {
  return (
    <div className='App'>
      <div className='audiogram-container'>
        <ReactAudiogram
          showBanana={false}
          showLetters={false}
          showLabels={true}
          showInterFQ={true}
        />
      </div>
    </div>
  )
}

export default App
