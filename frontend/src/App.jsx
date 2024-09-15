import './App.css'
import Home from './components/Home/Home'
import FindStation from './components/FindStation/FindStation'
import JourneyPlanner from './components/JourneyPlanner/JourneyPlanner'
import StationDetail from './components/StationDetail/StationDetail'
import HeadBar from './components/Common/HeadBar/HeadBar'
import Footer from './components/Common/Footer/Footer'

import { Route, Routes } from 'react-router-dom'

function App() {


  return (
      <div>
        <HeadBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findStation" element={<FindStation />} />
            <Route path="/journeyPlanner" element={<JourneyPlanner />} />
            <Route path="/stationDetail/:id" element={<StationDetail />} />
          </Routes>
        <Footer />
      </div>
  )
}

export default App
