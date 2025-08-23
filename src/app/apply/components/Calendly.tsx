'use client'
import MemberDB from '../../components/MemberDB'

export default function Calendly() {
  // Array of members for coffee chats
  const members = [
    {
      name: "Mike Guerrero",
      title: "President",
      image: "/exec/mike.jpeg",
      calendly: "https://calendly.com/mikxvii-berkeley/30min"
    },
    // Add more members here as needed
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {members.map((member) => (
              <MemberDB
                key={member.name}
                name={member.name}
                title={member.title}
                image={member.image}
                calendly={member.calendly}
              />
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
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