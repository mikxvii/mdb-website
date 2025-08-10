import MemberSection from '../../components/sections/MemberSection'
import { projectManagers } from '../../constants/projectManagers'

export default function ProjectManagers() {
  return (
    <MemberSection
      title="Project Managers"
      members={projectManagers}
      gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      gradientDirection="down"
    />
  )
} 