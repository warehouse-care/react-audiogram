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
          options={
            {
              showBanana: true,
              showLetters: true,
              showLabels: true,
              showInterFQ: false,
              editable: true
            }
          }
          onAudiogramChange
        />
      </div>
    </div>
  )
}

export default App
