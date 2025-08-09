import Image from 'next/image'

export default function ProjectHeader() {
  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-[#D1DFF2] to-white flex items-center -mt-20 relative mb-0 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D1DFF2] to-white z-0"></div>
      <div className="w-full px-3 sm:px-4 py-4 sm:py-6 md:py-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-patua-one text-blue-900 mb-4 sm:mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            PROJECTS
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Discover innovative mobile applications built by our talented developers. From ideation to deployment, 
            our projects showcase real-world problem-solving and cutting-edge mobile development technologies.
          </p>
        </div>
      </div>
    </section>
  )
} 