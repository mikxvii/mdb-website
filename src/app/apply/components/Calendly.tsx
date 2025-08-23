'use client'
import MemberDB from '../../components/MemberDB'

interface CoffeeChatMember {
  name: string
  title: string
  image: string
  calendly: string
  major: string
  interests: string[]
  email: string
  funFacts: string[]
}

export default function Calendly() {
  // Array of members for coffee chats with additional information
  const members: CoffeeChatMember[] = [
    {
      name: "Mike Guerrero",
      title: "President",
      image: "/exec/mike.jpeg",
      calendly: "https://calendly.com/mikxvii",
      major: "Computer Science & Business Administration",
      interests: ["Mobile Development", "Startups", "Leadership", "Coffee"],
      email: "mike@mdb.berkeley.edu",
      funFacts: [
        "Started coding in high school",
        "Loves trying new coffee shops",
        "Has built 3 mobile apps from scratch"
      ]
    },
    {
      name: "MDB Member",
      title: "VP of Projects",
      image: "/logos/mdb.png",
      calendly: "https://calendly.com/mdb-member/30min",
      major: "Computer Science",
      interests: ["Project Management", "Software Development", "Team Leadership", "Innovation"],
      email: "member@mdb.berkeley.edu",
      funFacts: [
        "Passionate about building impactful solutions",
        "Enjoys mentoring new developers",
        "Always excited to share knowledge"
      ]
    },
    {
      name: "MDB Member",
      title: "VP of Education",
      image: "/logos/mdb.png",
      calendly: "https://calendly.com/mdb-education/30min",
      major: "Engineering",
      interests: ["Teaching", "Technology", "Problem Solving", "Collaboration"],
      email: "education@mdb.berkeley.edu",
      funFacts: [
        "Loves helping others learn and grow",
        "Believes in the power of education",
        "Enthusiastic about sharing tech knowledge"
      ]
    },
    {
      name: "MDB Member",
      title: "VP of Operations",
      image: "/logos/mdb.png",
      calendly: "https://calendly.com/mdb-operations/30min",
      major: "Data Science",
      interests: ["Process Optimization", "Data Analysis", "Team Building", "Efficiency"],
      email: "operations@mdb.berkeley.edu",
      funFacts: [
        "Focused on making things work better",
        "Enjoys analyzing and improving processes",
        "Passionate about building strong teams"
      ]
    },
    {
      name: "MDB Member",
      title: "VP of Finance",
      image: "/logos/mdb.png",
      calendly: "https://calendly.com/mdb-finance/30min",
      major: "Business Administration",
      interests: ["Financial Planning", "Strategic Thinking", "Growth", "Innovation"],
      email: "finance@mdb.berkeley.edu",
      funFacts: [
        "Strategic thinker with a growth mindset",
        "Passionate about sustainable business practices",
        "Always looking for new opportunities"
      ]
    },
    {
      name: "MDB Member",
      title: "VP of Marketing",
      image: "/logos/mdb.png",
      calendly: "https://calendly.com/mdb-marketing/30min",
      major: "Marketing & Communications",
      interests: ["Brand Strategy", "Digital Marketing", "Storytelling", "Growth"],
      email: "marketing@mdb.berkeley.edu",
      funFacts: [
        "Creative problem solver and storyteller",
        "Passionate about building strong brands",
        "Loves connecting with people through stories"
      ]
    }
  ];

  return (
    <section id="application-form" className="w-screen bg-gradient-to-b from-white to-mdb-light-blue py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-raleway-bold text-mdb-blue mb-6">
            Coffee Chats
          </h2>
          <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Schedule a coffee chat with our team to learn more about MDB and ask any questions 
            about the application process. We&apos;d love to get to know you!
          </p>
        </div>

        {/* Members with Calendly Links */}
        <div className="mb-8">
          <h4 className="text-lg font-raleway-semibold text-mdb-blue mb-2">Meet a Member</h4>
          <p className="text-sm text-gray-600 mb-4">Hover/Click over a member to learn more about them!</p>
          <div className="grid gap-x-6 gap-y-32 sm:gap-y-32 md:gap-y-40 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-0">
            {members.map((member) => (
              <MemberDB
                key={member.name}
                name={member.name}
                title={member.title}
                image={member.image}
                size="large"
                calendly={member.calendly}
                major={member.major}
                interests={member.interests}
                email={member.email}
                funFacts={member.funFacts}
              />
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-48 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl mb-3">⏰</div>
            <h4 className="font-raleway-semibold text-mdb-blue mb-2">Duration</h4>
            <p className="text-gray-700 text-sm">15-30 minute conversations</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-3">💬</div>
            <h4 className="font-raleway-semibold text-mdb-blue mb-2">Format</h4>
            <p className="text-gray-700 text-sm">Virtual or in-person meetings</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-3">🎯</div>
            <h4 className="font-raleway-semibold text-mdb-blue mb-2">Purpose</h4>
            <p className="text-gray-700 text-sm">Learn about MDB and ask questions</p>
          </div>
        </div>
      </div>
    </section>
  )
}