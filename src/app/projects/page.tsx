import ProjectHeader from './components/ProjectHeader'
import ProjectCarousel from './components/ProjectCarousel'
import ProjectClients from './components/ProjectClients'

export default function Projects() {
  return (
    <div className="min-h-screen">
      <ProjectHeader />
      <ProjectCarousel />
      <ProjectClients />
    </div>
  )
} 