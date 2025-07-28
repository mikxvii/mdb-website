export default function PurpAndComm() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Why Choose Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-6">🚀</div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Fast Performance</h3>
          <p className="text-gray-600 leading-relaxed">
            Lightning-fast loading times and optimized performance for the best user experience.
          </p>
        </div>
        
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-6">📱</div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Responsive Design</h3>
          <p className="text-gray-600 leading-relaxed">
            Perfect experience across all devices and screen sizes, from mobile to desktop.
          </p>
        </div>
        
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-6">🔧</div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Modern Technology</h3>
          <p className="text-gray-600 leading-relaxed">
            Built with the latest technologies including React, Next.js, and TypeScript.
          </p>
        </div>
      </div>
    </section>
  )
} 