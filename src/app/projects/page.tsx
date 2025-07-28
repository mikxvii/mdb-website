export default function Projects() {
  const projects = [
    {
      title: "E-Learning Platform",
      description: "Comprehensive online learning management system with interactive courses and assessments.",
      features: ["Course Management", "Student Progress Tracking", "Interactive Quizzes", "Video Streaming"],
      icon: "🎓"
    },
    {
      title: "Healthcare Portal",
      description: "Secure patient management system with appointment scheduling and medical records.",
      features: ["Patient Records", "Appointment Booking", "Telemedicine", "HIPAA Compliance"],
      icon: "🏥"
    },
    {
      title: "Financial Dashboard",
      description: "Real-time financial analytics and reporting platform for investment tracking.",
      features: ["Portfolio Analysis", "Market Data", "Risk Assessment", "Custom Reports"],
      icon: "📊"
    },
    {
      title: "Social Media App",
      description: "Modern social networking platform with real-time messaging and content sharing.",
      features: ["Real-time Chat", "Media Sharing", "User Profiles", "Content Feed"],
      icon: "📱"
    },
    {
      title: "Task Management Tool",
      description: "Collaborative project management application with team coordination features.",
      features: ["Project Planning", "Team Collaboration", "Time Tracking", "Progress Analytics"],
      icon: "✅"
    },
    {
      title: "AI-Powered Analytics",
      description: "Machine learning platform for data analysis and predictive insights.",
      features: ["Data Visualization", "Predictive Models", "AI Insights", "Custom Algorithms"],
      icon: "🤖"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Our Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore our portfolio of innovative projects showcasing cutting-edge technology and creative solutions.
          Each project demonstrates our expertise in building scalable, user-friendly applications.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="text-4xl mb-4">{project.icon}</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{project.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
            
            <h4 className="font-semibold mb-3 text-gray-800">Key Features:</h4>
            <ul className="space-y-2 mb-6">
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-gray-600 flex items-center">
                  <span className="text-primary-600 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              View Project
            </button>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl">
        <h2 className="text-3xl font-bold mb-6">
          Have a Project in Mind?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Let's collaborate to create innovative solutions that make a real impact.
        </p>
        <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Start a Project
        </button>
      </section>
    </div>
  )
} 