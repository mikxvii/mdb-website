import MemberDB from './MemberDB'

interface Member {
  name: string
  title: string
  image: string
}

// Sample members data - you can replace with actual member data
const members: Member[] = [
  {
    name: "Noah Yin",
    title: "President",
    image: "/images/noah-goat.jpeg"
  },
  {
    name: "Jeffrey Yum",
    title: "VP of Internal Affairs",
    image: "/images/jefflineage5.jpg"
  },
  {
    name: "Hailee Yun",
    title: "VP of Marketing",
    image: "/images/mdb5 2.jpg"
  },
  {
    name: "Kevin Lin",
    title: "VP of Internal Affairs",
    image: "/images/car2.jpeg"
  },
  {
    name: "Bonnie Wang",
    title: "VP of Operations",
    image: "/images/mdb-ride.jpg"
  },
  {
    name: "Aldrin Ong",
    title: "VP of Projects",
    image: "/images/table1.jpeg"
  },
  {
    name: "Amol Budhiraja",
    title: "VP of Education",
    image: "/images/mdb-goats.jpeg"
  },
  {
    name: "Edan Goat",
    title: "Project Manager",
    image: "/images/edan-goat.jpeg"
  },
  {
    name: "Sarah Chen",
    title: "Developer",
    image: "/images/mdb-hawaii.jpg"
  },
  {
    name: "Mike Johnson",
    title: "Designer",
    image: "/images/car3.jpeg"
  },
  {
    name: "Emma Davis",
    title: "Developer",
    image: "/images/table2.jpeg"
  },
  {
    name: "Alex Kim",
    title: "Project Manager",
    image: "/images/table3.jpeg"
  },
  {
    name: "Rachel Lee",
    title: "Developer",
    image: "/images/mdb-newnite.jpg"
  },
  {
    name: "David Park",
    title: "Designer",
    image: "/images/circuit7.jpg"
  },
  {
    name: "Lisa Wang",
    title: "Developer",
    image: "/images/sur7.jpg"
  },
  {
    name: "Tom Chen",
    title: "Project Manager",
    image: "/images/tp-over.jpg"
  },
  {
    name: "Anna Rodriguez",
    title: "Developer",
    image: "/images/soccer-w.jpg"
  },
  {
    name: "Chris Thompson",
    title: "Designer",
    image: "/images/wbn1.jpeg"
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
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  )
} 