import MemberSection from '../../components/sections/MemberSection'
import { execMembers } from '../../constants/exec'

export default function Exec() {
  return (
    <MemberSection
      title="Leadership"
      members={execMembers}
      gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      gradientDirection="up"
    />
  )
} 