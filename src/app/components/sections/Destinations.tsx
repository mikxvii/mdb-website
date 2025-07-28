export default function Destinations() {
  const destinations = [
    {
      title: "Training Program",
      description: "Start your mobile development journey",
      icon: "🎓",
      link: "/training-program",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "View Projects", 
      description: "Explore our portfolio of innovative solutions",
      icon: "💼",
      link: "/projects",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Apply Now",
      description: "Join our next cohort and transform your career",
      icon: "🚀",
      link: "/apply",
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Ready to Get Started?
      </h2>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Explore our services and discover how we can help bring your vision to life.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {destinations.map((destination, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${destination.color} text-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
          >
            <div className="text-5xl mb-6 text-center">{destination.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-center">{destination.title}</h3>
            <p className="text-lg opacity-90 text-center mb-6">{destination.description}</p>
            <div className="text-center">
              <a 
                href={destination.link}
                className="inline-block bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold backdrop-blur-sm transition-all"
              >
                Learn More →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Additional CTA */}
      <div className="text-center bg-gray-100 rounded-xl p-12">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">
          Have Questions?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Our team is here to help you choose the right path for your goals.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
            Schedule Call
          </button>
        </div>
      </div>
    </section>
  )
} 