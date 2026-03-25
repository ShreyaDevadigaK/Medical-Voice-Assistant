"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/Components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Badge } from '@/Components/ui/badge';
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export type doctorAgent = {
  id: number,
  specialist: string,
  description: string,
  image: string,
  agentPrompt: string,
  voiceId?: string,
  subscriptionRequired: boolean
}

type props = {
  doctorAgent: doctorAgent
}

function DoctorAgentCard({ doctorAgent }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: 'pro' })

  const onStartConsultation = async () => {
    setLoading(true);
    const cleanDoctor = JSON.parse(JSON.stringify(doctorAgent));
    const result = await axios.post("/api/session-chat", {
      notes: 'New Query',
      selectedDoctor: cleanDoctor,
    });
    if (result.data?.sessionId) {
      router.push("/dashboard/medical-agent/" + result.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Premium Badge */}
      {doctorAgent.subscriptionRequired && (
        <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-md text-xs">
          Premium
        </Badge>
      )}

      {/* Doctor Image */}
      <div className="overflow-hidden">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          width={300}
          height={300}
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h2 className="font-bold text-base text-gray-900 leading-tight">{doctorAgent.specialist}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1 leading-relaxed">{doctorAgent.description}</p>

        <Button
          className="w-full mt-3 gap-2 group/btn"
          onClick={onStartConsultation}
          disabled={(!paidUser && doctorAgent.subscriptionRequired) || loading}
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Starting...</>
          ) : (
            <><span>Start Consultation</span><ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></>
          )}
        </Button>
      </div>
    </div>
  )
}

export default DoctorAgentCard
