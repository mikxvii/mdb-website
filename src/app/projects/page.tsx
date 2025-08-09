import ProjectHeader from '../components/sections/ProjectHeader'
import ProjectCarousel from '../components/sections/ProjectCarousel'
import ProjectClients from '../components/sections/ProjectClients'

export default function Projects() {
  return (
    <div className="min-h-screen">
      <ProjectHeader />
      <ProjectCarousel />
      <ProjectClients />
    </div>
  )
} 