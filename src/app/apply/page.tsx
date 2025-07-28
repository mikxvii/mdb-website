export default function Apply() {
  const steps = [
    {
      number: "01",
      title: "Submit Application", 
      description: "Complete the online application form with your background and goals.",
      icon: "📝"
    },
    {
      number: "02",
      title: "Assessment Test",
      description: "Take our skills assessment to help us understand your current level.",
      icon: "🧠"
    },
    {
      number: "03", 
      title: "Interview",
      description: "One-on-one interview with our admissions team to discuss your fit.",
      icon: "💬"
    },
    {
      number: "04",
      title: "Acceptance",
      description: "Receive your acceptance decision and enrollment information.",
      icon: "🎉"
    }
  ]

  const programs = [
    { name: "Mobile Development Training Program", duration: "12 weeks", price: "$2,499" },
    { name: "Full-Stack Web Development", duration: "12 weeks", price: "$1,299" },
    { name: "UI/UX Design Mastery", duration: "8 weeks", price: "$899" },
    { name: "Data Science & Analytics", duration: "16 weeks", price: "$1,599" },
    { name: "Digital Marketing & SEO", duration: "6 weeks", price: "$699" },
    { name: "Cloud Computing & DevOps", duration: "14 weeks", price: "$1,399" }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Apply Now</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Take the first step towards transforming your career. Our application process is designed 
          to help us understand your goals and find the perfect program for your journey.
        </p>
      </div>

      {/* Application Process */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Application Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Application Form</h2>
            
            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                  Program Selection
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Program *
                    </label>
                    <select
                      id="program"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Choose a program...</option>
                      {programs.map((program, index) => (
                        <option key={index} value={program.name}>
                          {program.name} - {program.duration} ({program.price})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Start Date *
                    </label>
                    <select
                      id="startDate"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select start date...</option>
                      <option value="march-2024">March 2024</option>
                      <option value="april-2024">April 2024</option>
                      <option value="may-2024">May 2024</option>
                      <option value="june-2024">June 2024</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Background & Experience */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                  Background & Experience
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                      Highest Education Level *
                    </label>
                    <select
                      id="education"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select education level...</option>
                      <option value="high-school">High School</option>
                      <option value="associate">Associate Degree</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Professional Experience
                    </label>
                    <select
                      id="experience"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select experience level...</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Background *
                    </label>
                    <textarea
                      id="background"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
                      placeholder="Tell us about your current role, industry, and relevant experience..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Goals & Motivation */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                  Goals & Motivation
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
                      Career Goals *
                    </label>
                    <textarea
                      id="goals"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
                      placeholder="What are your career goals and how will this program help you achieve them?"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                      Why This Program? *
                    </label>
                    <textarea
                      id="motivation"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
                      placeholder="Why are you interested in this specific program? What do you hope to gain?"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-start space-x-3 mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-700 underline">Terms and Conditions</a> and 
                    <a href="#" className="text-primary-600 hover:text-primary-700 underline ml-1">Privacy Policy</a> *
                  </label>
                </div>
                
                <div className="flex items-start space-x-3 mb-8">
                  <input
                    type="checkbox"
                    id="updates"
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="updates" className="text-sm text-gray-600">
                    I would like to receive updates about new programs and opportunities
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Need Help with Your Application?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our admissions team is here to help you through the application process. 
            Contact us with any questions or concerns.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
          </div>
          
          <div>
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600">Available 24/7</p>
            <button className="text-primary-600 hover:text-primary-700 underline text-sm">
              Start Chat
            </button>
          </div>
          
          <div>
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600">admissions@mdbwebsite.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>
        </div>
      </section>
    </div>
  )
} 