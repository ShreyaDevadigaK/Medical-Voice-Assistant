import { AIDoctorAgents } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

function DoctorsAgentList() {
  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-gray-900">AI Specialist Doctors</h2>
        <p className="text-sm text-gray-500 mt-1">Choose a specialist and start a voice consultation instantly.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {AIDoctorAgents.map((doctor, index) => (
          <DoctorAgentCard key={index} doctorAgent={doctor} />
        ))}
      </div>
    </div>
  )
}

export default DoctorsAgentList
