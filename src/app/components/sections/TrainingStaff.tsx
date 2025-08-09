import MemberDB from './MemberDB'

interface TrainingStaffMember {
  name: string
  title: string
  image: string
}

const trainingStaff: TrainingStaffMember[] = [
  { name: "Amol Budhiraja", title: "VP of Education", image: "/images/amol.jpg" },
  { name: "Satvik Muddana", title: "Mentor", image: "/images/satvik.jpg" },
  { name: "Mohammed Zeidan", title: "Mentor", image: "/images/mohammed.jpg" }
]

export default function TrainingStaff() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Training Program Staff</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingStaff.map((member, index) => (
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
      </div>
    </section>
  )
} 