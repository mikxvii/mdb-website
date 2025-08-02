'use client'

export default function Calendly() {
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
            about the application process. We'd love to get to know you!
          </p>
        </div>

        {/* Calendly Integration Placeholder */}
        <div className="mdb-glass-lg p-8">
          <div className="text-center">
            <div className="text-4xl mb-6">☕</div>
            <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-4">
              Schedule Your Coffee Chat
            </h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Choose a time that works for you and meet with our team members. 
              Each field below can hold multiple Calendly links for different team members.
            </p>
            
            {/* Airtable Extension Placeholder */}
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-2xl mb-4">📅</div>
                <h4 className="text-lg font-raleway-semibold text-gray-700 mb-2">
                  Airtable Extension Integration
                </h4>
                <p className="text-gray-600 text-sm">
                  This section will be populated with Calendly links from your Airtable extension.
                  <br />
                  Each field can contain multiple scheduling options for different team members.
                </p>
              </div>
            </div>
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