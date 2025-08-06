import Image from 'next/image'

export default function AboutUs() {
  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-[#D1DFF2] to-white flex items-center -mt-20 relative mb-0 py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D1DFF2] to-white z-0"></div>
      <div className="w-full px-4 py-8 pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className="container mx-auto">
          {/* Hero Image */}
          <div className="relative mb-12 animate-fade-in-up flex justify-center" style={{ animationDelay: '0.2s' }}>
            <div className="w-full max-w-4xl mx-auto h-72 md:h-80 lg:h-96 relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-110 hover:translate-x-1 hover:drop-shadow-xl origin-center group">
              {/* First image (default) */}
              <Image
                src="/images/mdb2 2.jpg"
                alt="MDB Member"
                fill
                className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
              {/* Second image (on hover) */}
              <Image
                src="/images/mdb5 2.jpg"
                alt="MDB Member Hover"
                fill
                className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          </div>

          {/* About Us Content */}
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-raleway-bold text-blue-900 mb-8">About Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Mobile Developers of Berkeley is a dynamic tech club at UC Berkeley, founded in 2015, 
              dedicated to mobile/full-stack development and fostering a vibrant community. We bring together 
              passionate developers, designers, and innovators to create impactful projects for startups and learn 
              from each other through club hackshops, training programs, and collaborative events.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to provide hands-on experience in mobile and web development while building 
              lasting friendships and professional connections. Whether you&apos;re a seasoned developer or 
              just starting your coding journey, MDB offers a supportive environment to grow your skills 
              and make meaningful contributions to real-world projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 