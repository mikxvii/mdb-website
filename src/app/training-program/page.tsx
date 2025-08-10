import TrainingHeader from './components/TrainingHeader'
import TrainingCurriculum from './components/TrainingCurriculum'
import TrainingStaff from './components/TrainingStaff'
import TrainingTools from './components/TrainingTools'

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