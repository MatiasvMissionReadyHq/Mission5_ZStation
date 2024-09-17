import './App.css'
import Home from './components/Home/Home'
import FindStation from './components/FindStation/FindStation'
import JourneyPlanner from './components/JourneyPlanner/JourneyPlanner'
import StationDetail from './components/StationDetail/StationDetail'
import HeadBar from './components/Common/HeadBar/HeadBar'
import Footer from './components/Common/Footer/Footer'

import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

function App() {  
  const [isClicked, setIsClicked] = useState(false)
  
  function handleIsClicked(childData){
    setIsClicked(childData)
  }

  console.log("App: ", isClicked)
  return (
      <div className='app'>
        <HeadBar sendIsClickedBackToApp={handleIsClicked}/>
        {!isClicked &&
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/findStation" element={<FindStation />} />
              <Route path="/journeyPlanner" element={<JourneyPlanner />} />
              <Route path="/stationDetail/:id" element={<StationDetail />} />
            </Routes>
            <Footer />
          </div>
        }
      </div>
  )
}

export default App
