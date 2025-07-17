"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/Components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { Loader2Icon } from 'lucide-react' 
import { Badge } from '@/Components/ui/badge';
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

 export type doctorAgent={
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string,
    voiceId?:string,
    subscriptionRequired:boolean

}
type props={
   doctorAgent:doctorAgent 
}
function DoctorAgentCard({doctorAgent}:props) {
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  const {has} =useAuth();
  //@ts-ignore
  const paidUser=has && has({plan:'pro'})
  console.log(paidUser);

  
  const onStartConsultation = async () => {
      setLoading(true);
      const cleanDoctor = JSON.parse(JSON.stringify(doctorAgent));
      // Save All Info To Database
      const result = await axios.post("/api/session-chat", {
        notes: 'New Query',
        selectedDoctor: cleanDoctor,
      });
  
      console.log(result.data);
      if (result.data?.sessionId) {
        console.log(result.data.sessionId);
        router.push("/dashboard/medical-agent/" + result.data.sessionId);
      }
  
      setLoading(false);
    }; 
    

    return (
    <div className='relative'>
      {doctorAgent.subscriptionRequired &&<Badge className='absolute m-2 right-0'>
        Premium
      </Badge>}
      

      <Image 
      src={doctorAgent.image}
      alt={doctorAgent.specialist}
      width={200} height={300}
      className='w-full h-[250px] object-cover rounded-xl'/>
    <h2 className='font-bold mt-2'>{doctorAgent.specialist}</h2>
    <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
    <Button className='w-full mt-2' 
    onClick={onStartConsultation}
    disabled={!paidUser&&doctorAgent.subscriptionRequired}>
      Start Consultation{loading?<Loader2Icon className='animate-spin'/>:<IconArrowRight/>}</Button>
    </div> 
  )
}

export default DoctorAgentCard
