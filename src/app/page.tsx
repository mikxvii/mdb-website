import TitleSection from './components/sections/TitleSection'
import PurpAndComm from './components/sections/PurpAndComm'
import Carousel from './components/sections/Carousel'
import Destinations from './components/sections/Destinations'

export default function Home() {
  return (
    <div>
      <TitleSection />
      <PurpAndComm />
      <Carousel />
      <Destinations />
    </div>
  )
} 