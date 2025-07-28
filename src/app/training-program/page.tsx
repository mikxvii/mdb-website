export default function TrainingProgram() {
  const modules = [
    {
      week: "Weeks 1-2",
      title: "Mobile Development Fundamentals",
      topics: [
        "Introduction to Mobile Ecosystems (iOS & Android)",
        "Mobile UI/UX Design Principles",
        "Development Environment Setup",
        "Basic App Architecture Patterns"
      ],
      icon: "📱"
    },
    {
      week: "Weeks 3-4", 
      title: "React Native Basics",
      topics: [
        "React Native Components & Navigation",
        "State Management & Props",
        "Styling & Layout Systems",
        "Building Your First Mobile App"
      ],
      icon: "⚛️"
    },
    {
      week: "Weeks 5-6",
      title: "Advanced Mobile Features",
      topics: [
        "API Integration & Data Management",
        "Camera, Location & Device Features",
        "Push Notifications & Local Storage",
        "Performance Optimization"
      ],
      icon: "🚀"
    },
    {
      week: "Weeks 7-8",
      title: "Native Development Essentials", 
      topics: [
        "iOS Development with Swift Basics",
        "Android Development with Kotlin Basics",
        "Platform-Specific Features",
        "Cross-Platform vs Native Considerations"
      ],
      icon: "🔧"
    },
    {
      week: "Weeks 9-10",
      title: "App Deployment & Distribution",
      topics: [
        "App Store Submission Process (iOS)",
        "Google Play Store Publishing (Android)",
        "App Testing & Quality Assurance",
        "App Store Optimization (ASO)"
      ],
      icon: "🏪"
    },
    {
      week: "Weeks 11-12",
      title: "Capstone Project & Career Prep",
      topics: [
        "Building a Complete Mobile App",
        "Code Review & Best Practices",
        "Portfolio Development",
        "Job Interview Preparation"
      ],
      icon: "🎓"
    }
  ]

  const features = [
    {
      title: "Hands-on Learning",
      description: "Build real mobile apps from day one with practical projects and exercises.",
      icon: "🛠️"
    },
    {
      title: "Industry Mentorship",
      description: "Get guidance from experienced mobile developers working at top companies.",
      icon: "👨‍🏫"
    },
    {
      title: "Career Support",
      description: "Job placement assistance, resume review, and interview preparation.",
      icon: "💼"
    },
    {
      title: "Flexible Schedule",
      description: "Evening and weekend classes designed for working professionals.",
      icon: "⏰"
    }
  ]

  const tools = [
    { name: "React Native", logo: "⚛️" },
    { name: "Expo", logo: "📲" },
    { name: "Xcode", logo: "🍎" },
    { name: "Android Studio", logo: "🤖" },
    { name: "Firebase", logo: "🔥" },
    { name: "Git & GitHub", logo: "🐙" }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Mobile Development Training Program</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Master mobile app development from the ground up. Learn React Native, iOS, and Android development 
          in our comprehensive 12-week program designed for beginners and career changers.
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">12</div>
            <div className="text-sm text-gray-600">Weeks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">6</div>
            <div className="text-sm text-gray-600">Mobile Apps</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">90%</div>
            <div className="text-sm text-gray-600">Job Placement</div>
          </div>
        </div>
      </div>

      {/* Featured Program */}
      <section className="mb-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">🌟 Complete Mobile Developer Path</h2>
            <p className="text-lg mb-6 opacity-90">
              Transform from beginner to job-ready mobile developer in just 12 weeks. Learn both 
              cross-platform and native development with personalized mentorship and career support.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-yellow-300 mr-2">✓</span>
                React Native & Expo Framework
              </li>
              <li className="flex items-center">
                <span className="text-yellow-300 mr-2">✓</span>
                iOS Development with Swift
              </li>
              <li className="flex items-center">
                <span className="text-yellow-300 mr-2">✓</span>
                Android Development with Kotlin
              </li>
              <li className="flex items-center">
                <span className="text-yellow-300 mr-2">✓</span>
                App Store Publishing & Deployment
              </li>
            </ul>
            <div className="flex space-x-4">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Enroll Now - $2,499
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Free Info Session
              </button>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl mb-4">📱</div>
              <div className="text-xl font-semibold mb-2">Next Cohort Starts</div>
              <div className="text-2xl font-bold mb-4">March 15, 2024</div>
              <div className="text-sm opacity-80">Limited to 15 students</div>
              <div className="text-lg font-semibold mt-4 text-yellow-300">8 spots remaining</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Modules */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">12-Week Curriculum</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{module.icon}</div>
                <div>
                  <div className="text-sm text-primary-600 font-semibold">{module.week}</div>
                  <h3 className="text-xl font-semibold text-gray-800">{module.title}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="text-gray-600 flex items-start">
                    <span className="text-primary-600 mr-2 mt-1 text-sm">•</span>
                    <span className="text-sm">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="mb-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Tools & Technologies You'll Master</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">{tool.logo}</div>
              <div className="font-semibold text-gray-800 text-sm">{tool.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Program Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Success */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Student Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                AM
              </div>
              <div className="ml-4">
                <div className="font-semibold">Alex Martinez</div>
                <div className="text-sm text-gray-500">iOS Developer at Spotify</div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Went from zero coding experience to landing my dream job at Spotify in just 4 months after graduation. The hands-on projects were incredible!"
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div className="ml-4">
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-gray-500">Mobile Lead at Airbnb</div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The program gave me the confidence to build complex mobile apps. Now I'm leading a team of 8 mobile developers!"
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                MJ
              </div>
              <div className="ml-4">
                <div className="font-semibold">Marcus Johnson</div>
                <div className="text-sm text-gray-500">Freelance App Developer</div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Built my own app agency after the program. Made $150K in my first year building apps for local businesses!"
            </p>
          </div>
        </div>
      </section>

      {/* Schedule & Pricing */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Schedule & Investment</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Class Schedule</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Duration:</span>
                <span>12 weeks (Part-time)</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Evening Classes:</span>
                <span>Tue & Thu, 7:00 PM - 9:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Weekend Workshop:</span>
                <span>Saturday, 10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Format:</span>
                <span>Hybrid (In-person + Online)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Class Size:</span>
                <span>Maximum 15 students</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Program Investment</h3>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-lg mb-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">$2,499</div>
              <div className="text-gray-600 mb-4">Complete 12-week program</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-primary-600 mr-2">✓</span>
                  All course materials included
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-2">✓</span>
                  1-on-1 mentorship sessions
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-2">✓</span>
                  Job placement assistance
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-2">✓</span>
                  Lifetime access to materials
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-4">Payment plans available</div>
              <div className="text-sm text-gray-600">💰 $499/month for 5 months</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Mobile Development Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join our next cohort starting March 15th. Limited to 15 students for personalized attention.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Enroll Now
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors">
            Free Info Session
          </button>
        </div>
        <div className="mt-6 text-sm opacity-80">
          Questions? Call us at (555) 123-4567 or email info@mdbwebsite.com
        </div>
      </section>
    </div>
  )
} 