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
      <div className="flex items-center justify-center h-full">
        <Stethoscope className="h-10 w-10 text-blue-600" />
      </div>
    ),
    icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Health Assessments",
    description: "Get quick health checkups powered by our smart AI.",
    header: (
      <div className="flex items-center justify-center h-full">
        <BrainCircuit className="h-10 w-10 text-emerald-600" />
      </div>
    ),
    icon: <IconHeartbeat className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Specialist Finder",
    description: "Find the best doctors based on your symptoms and needs.",
    header: (
      <div className="flex items-center justify-center h-full">
        <LocateFixed className="h-10 w-10 text-indigo-600" />
      </div>
    ),
    icon: <IconUserSearch className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Detailed Medical Reports",
    description:
      "View and download your AI-analyzed health reports instantly.",
    header: (
      <div className="flex items-center justify-center h-full">
        <FileHeart className="h-10 w-10 text-rose-600" />
      </div>
    ),
    icon: <IconReportAnalytics className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Easy Appointment Scheduling",
    description: "Book appointments with a few clicks, no waiting lines.",
    header: (
      <div className="flex items-center justify-center h-full">
        <CalendarClock className="h-10 w-10 text-yellow-600" />
      </div>
    ),
    icon: <IconCalendarEvent className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat with Care Team",
    description: "Get your queries answered by medical professionals.",
    header: (
      <div className="flex items-center justify-center h-full">
        <MessageCircleHeart className="h-10 w-10 text-fuchsia-600" />
      </div>
    ),
    icon: <IconMessages className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Emergency Call Support",
    description: "Instantly connect with healthcare experts during emergencies.",
    header: (
      <div className="flex items-center justify-center h-full">
        <PhoneCall className="h-10 w-10 text-red-600" />
      </div>
    ),
    icon: <IconPhoneCall className="h-4 w-4 text-neutral-500" />,
  },
];
