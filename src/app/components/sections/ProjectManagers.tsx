import MemberDB from './MemberDB'

interface ProjectManager {
  name: string
  title: string
  image: string
}

const projectManagers: ProjectManager[] = [
  {
    name: "Sample Project Manager",
    title: "Project Manager",
    image: "/logos/mdb_4.svg"
  }
]

export default function ProjectManagers() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#D1DFF2] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-raleway-bold text-blue-900 mb-4">Project Managers</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {projectManagers.map((member, index) => (
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