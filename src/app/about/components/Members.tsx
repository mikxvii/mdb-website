import MemberSection from '../../components/sections/MemberSection'
import { members } from '../../constants/members'

export default function Members() {
  return (
    <MemberSection
      title="Members"
      members={members}
      gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      gradientDirection="up"
    />
  )
} 