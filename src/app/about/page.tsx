import AboutUs from '../components/sections/AboutUs'
import AboutCarousel from '../components/sections/AboutCarousel'
import Exec from '../components/sections/Exec'
import ProjectManagers from '../components/sections/ProjectManagers'
import Members from '../components/sections/Members'
import Carousel from '../components/sections/Carousel'

export default function About() {
  return (
    <div className="min-h-screen">
      <AboutUs />
      <AboutCarousel />
      <Carousel />
      <Exec />
      <ProjectManagers />
      <Members />
    </div>
  )
} 