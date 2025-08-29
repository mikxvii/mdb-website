import Flyer from './components/Flyer'
import Calendly from './components/Calendly'

export default function Apply() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mdb-light-blue to-white">
      <Flyer />
      <div className="w-full px-4 py-8 relative z-10 bg-gradient-to-t from-mdb-light-blue to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-raleway-bold text-mdb-blue mb-4">
              Sign up for a Coffee Chat!
            </h2>
            {/* <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              
            </p> */}
          </div>
          
          <div className="mdb-glass rounded-2xl shadow-2xl overflow-hidden">
            <iframe 
              className="airtable-embed" 
              src="https://airtable.com/embed/appq3RmOWy9QA681J/shrUKa4jqpHS5BruB" 
              frameBorder="0" 
              width="100%" 
              height="1100" 
              style={{ background: 'transparent', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 