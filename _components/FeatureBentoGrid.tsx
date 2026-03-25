import { cn } from "@/lib/utils";
import React from "react";

import {
  IconStethoscope,
  IconHeartbeat,
  IconUserSearch,
  IconReportAnalytics,
  IconCalendarEvent,
  IconMessages,
  IconPhoneCall,
} from "@tabler/icons-react";
import {
  Stethoscope,
  BrainCircuit,
  LocateFixed,
  FileHeart,
  CalendarClock,
  MessageCircleHeart,
  PhoneCall
} from "lucide-react";


import { BentoGrid, BentoGridItem } from "@/Components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-100 dark:from-neutral-900 dark:to-neutral-800 to-blue-50"></div>
);

const items = [
  {
    title: "24/7 Virtual Consultations",
    description: "Connect with licensed doctors anytime through our platform.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop&q=80" 
          alt="Virtual Consultations" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Health Assessments",
    description: "Get quick health checkups powered by our smart AI.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&h=300&fit=crop&q=80" 
          alt="AI Health Assessments" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconHeartbeat className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Specialist Finder",
    description: "Find the best doctors based on your symptoms and needs.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&h=300&fit=crop&q=80" 
          alt="Specialist Finder" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconUserSearch className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Detailed Medical Reports",
    description: "View and download your AI-analyzed health reports instantly.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&q=80" 
          alt="Medical Reports" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconReportAnalytics className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Easy Appointment Scheduling",
    description: "Book appointments with a few clicks, no waiting lines.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&h=300&fit=crop&q=80" 
          alt="Appointment Scheduling" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconCalendarEvent className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat with Care Team",
    description: "Get your queries answered by medical professionals.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop&q=80" 
          alt="Care Team" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconMessages className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Emergency Call Support",
    description: "Instantly connect with healthcare experts during emergencies.",
    header: (
      <div className="w-full h-full min-h-[6rem] overflow-hidden rounded-xl border border-gray-100 relative group">
        <img 
          src="https://images.unsplash.com/photo-1516841273335-e39b37888115?w=500&h=300&fit=crop&q=80" 
          alt="Emergency Support" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    ),
    icon: <IconPhoneCall className="h-4 w-4 text-neutral-500" />,
  },
];
