import TrainingHeader from '../components/sections/TrainingHeader'
import TrainingCurriculum from '../components/sections/TrainingCurriculum'
import TrainingStaff from '../components/sections/TrainingStaff'
import TrainingTools from '../components/sections/TrainingTools'

export default function TrainingProgram() {
  return (
    <div className="min-h-screen">
      <TrainingHeader />
      <TrainingTools />
      <TrainingCurriculum />
      <TrainingStaff />
    </div>
  )
} 