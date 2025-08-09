import Image from 'next/image'

export default function TrainingHeader() {
  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-[#D1DFF2] to-white flex items-center -mt-20 relative mb-0 py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D1DFF2] to-white z-0"></div>

      <div className="w-full px-4 py-8 pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-patua-one text-blue-900 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            EDUCATION
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Master mobile app development from the ground up. Learn React Native, iOS, and Android development 
            in our comprehensive 12-week program designed for beginners and career changers.
          </p>
        </div>
      </div>
    </section>
  )
} 