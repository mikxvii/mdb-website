import MemberDB from '../MemberDB'
import { BaseMember } from '../../types/members'

interface MemberSectionProps {
  title: string
  members: BaseMember[]
  gridCols?: string
  gradientDirection?: 'up' | 'down'
  className?: string
}

export default function MemberSection({ 
  title, 
  members, 
  gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4", 
  gradientDirection = 'up',
  className = ''
}: MemberSectionProps) {
  const gradientClass = gradientDirection === 'up' 
    ? 'bg-gradient-to-b from-white to-[#D1DFF2]' 
    : 'bg-gradient-to-b from-[#D1DFF2] to-white'

  return (
    <section className={`py-16 ${gradientClass} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-raleway-bold text-blue-900 mb-4">{title}</h2>
        </div>
        
        <div className={`grid ${gridCols} gap-8 max-w-6xl mx-auto`}>
          {members.map((member, index) => (
            <MemberDB
              key={index}
              name={member.name}
              title={member.title}
              image={member.image}
              size="large"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
