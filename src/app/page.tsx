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
      <div className="w-full bg-gray-50 relative z-20 border-t border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <Destinations />
        </div>
      </div>
    </div>
  )
} 