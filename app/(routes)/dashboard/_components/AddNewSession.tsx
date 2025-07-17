"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";


import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { useRouter } from "next/navigation";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

import { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useAuth } from "@clerk/nextjs";

function AddNewSession() {
  
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]); 


  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const { has } = useAuth();


  const paidUser = has && has({ plan: "pro" });

  useEffect(() => {
    GetHistoryList();
  }, []); 

  const GetHistoryList = async () => {
    try {
     
      const result = await axios.get<SessionDetail[]>(
        "/api/session-chat?sessionId=all"
      );
      console.log(result.data);
      setHistoryList(result.data);
    } catch (error) {
      console.error("Failed to fetch history list:", error);
      
    }
  };

  const OnClickNext = async () => {
    setLoading(true);
    try {

      const result = await axios.post("/api/suggest-doctor", {
        notes: note,
      });
      console.log("Full API response:", result);
      console.log("Response data:", result.data, "setSuggestedDoctors");
      
      if (Array.isArray(result.data)) {
        setSuggestedDoctors(result.data);
      } else if (result.data && typeof result.data === "object" && Object.keys(result.data).length > 0) {
   
        if (Array.isArray(result.data.doctors)) {
          setSuggestedDoctors(result.data.doctors);
        } else {
          setSuggestedDoctors([]);
          console.error("Unexpected response structure for suggested doctors:", result.data);
        }
      } else {
        setSuggestedDoctors([]);
        console.error("Unexpected or empty response for suggested doctors:", result.data);
      }
    } catch (error) {
      console.error("Failed to suggest doctor:", error);
  
    } finally {
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
  setLoading(true);
  try {
    if (!selectedDoctor) {
      console.error("No doctor selected for consultation.");
      setLoading(false);
      return;
    }

    console.log("Starting consultation with selectedDoctor:", selectedDoctor);

    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });

    console.log(result.data);
    console.log("Consultation start response:", result.data);
    if (result.data && typeof result.data === "object" && "sessionId" in result.data) {
      console.log(result.data.sessionId);
      router.push("/dashboard/medical-agent/" + result.data.sessionId);
    }
  } 
  catch (error: any) {
  console.log("Error starting consultation");
  setLoading(false);
}
};

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mt-3"
            disabled={!paidUser && historyList?.length >= 1}
          >
            Start a Consultation
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription asChild>
              {suggestedDoctors.length === 0 ? (
                <div>
                  <h2>Add Symptoms or any Other Details</h2>
                  <Textarea
                    placeholder="Add Detail here..."
                    className="h-[200px] mt-1"
                    onChange={(e) => setNote(e.target.value)}
                    value={note} 
                  />
                </div>
              ) : (
                <div>
                  <h2>Select the doctor</h2>
                  <div className="grid grid-cols-3 gap-5">
                    
                    {suggestedDoctors.map((doctor, index) => (
                      <SuggestedDoctorCard
                        doctorAgent={doctor}
                        key={index}
                        setSelectedDoctor={setSelectedDoctor} // Pass the setter function
                        selectedDoctor={selectedDoctor}
                      />
                    ))}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

              {suggestedDoctors.length === 0 ? (
              <Button disabled={note.trim().length === 0  || loading} onClick={OnClickNext}>
                Next{" "}
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            ) : (
              <Button
                disabled={loading || !selectedDoctor}
                onClick={onStartConsultation}
              >
                Start Consultation
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewSession;
