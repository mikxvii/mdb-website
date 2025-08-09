import MemberDB from './MemberDB'

interface Member {
  name: string
  title: string
  image: string
}

// Sample members data - you can replace with actual member data
const members: Member[] = [
  {
    name: "Sample Member",
    title: "Developer",
    image: "/logos/mdb_4.svg"
  }
]

export default function Members() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-raleway-bold text-blue-900 mb-4">Members</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
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