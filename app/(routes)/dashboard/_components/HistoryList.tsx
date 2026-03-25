"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/Components/ui/button';
import AddNewSession from "./AddNewSession";
import axios from 'axios';
import HistoryTable from './HistoryTable';
import { SessionDetail } from '../medical-agent/[sessionId]/page';

function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [activeTab, setActiveTab] = useState<'consultations' | 'reports'>('consultations');

  useEffect(() => {
    GetHistoryList();
  }, [])

  const GetHistoryList = async () => {
    const result = await axios.get('/api/session-chat?sessionId=all')
    console.log(result.data);
    setHistoryList(result.data);
  }

  return (
    <div className='mt-10'>
      <div className='flex gap-5 border-b mb-5'>
        <button
          className={`pb-2 px-2 transition-all ${activeTab === 'consultations' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('consultations')}
        >
          Consultations
        </button>
        <button
          className={`pb-2 px-2 transition-all ${activeTab === 'reports' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('reports')}
        >
          Medical Reports
        </button>
      </div>

      {historyList.length == 0 ?
        <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'>
          <Image src={'/medicalassist.png'} alt='empty' width={150} height={150} />
          <h2 className='font-bold text-xl mt-2'> No {activeTab === 'consultations' ? 'Recent Consultations' : 'Medical Reports'}</h2>
          <p>It looks like you haven't consulted with any doctors yet.</p>
          <AddNewSession />
        </div>
        : <div>
          <HistoryTable historyList={historyList} viewType={activeTab} />
        </div>
      }
    </div>
  )
}

export default HistoryList
