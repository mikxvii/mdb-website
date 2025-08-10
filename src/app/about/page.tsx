import AboutUs from './components/AboutUs'
import AboutCarousel from './components/AboutCarousel'
import Exec from './components/Exec'
import ProjectManagers from './components/ProjectManagers'
import Members from './components/Members'
import Carousel from '../components/Carousel'

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