import TrainingHeader from './components/TrainingHeader'
import TrainingCurriculum from './components/TrainingCurriculum'
import TrainingStaff from './components/TrainingStaff'
import TrainingTools from './components/TrainingTools'

import Link from 'next/link'

export default function TrainingProgram() {
  return (
    <div className="min-h-screen">
      <TrainingHeader />
      <TrainingTools />
      <TrainingCurriculum />
      {/* <TrainingStaff /> */}
      <div className="text-center my-12">
        <Link
          href="/contact"
          className="inline-block bg-white border-2 border-mdb-blue text-mdb-blue px-8 md:px-12 py-4 md:py-5 rounded-xl font-raleway-semibold text-lg md:text-xl hover:bg-mdb-blue hover:text-white hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
        >
          Questions? Contact Us
          <span className="ml-2 text-xl">→</span>
        </Link>
      </div>
    </div>
  )
}