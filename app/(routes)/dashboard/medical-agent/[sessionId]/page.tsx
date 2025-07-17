"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AIDoctorAgents } from "@/shared/list";
import { Circle, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { PhoneCall } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: (typeof AIDoctorAgents)[0];
  createdOn: string;

};

 type messages = {
  role: string;
  text: string;
};
function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
   const [vapi, setVapi] = useState<Vapi | null>(null);
  const [currentRoll, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLivetranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    console.log("selectedDoctor from API:", result.data.selectedDoctor);
    let fullDoctor = null;
    if (
      typeof result.data.selectedDoctor === "object" &&
      result.data.selectedDoctor !== null
    ) {
      fullDoctor = AIDoctorAgents.find(
        (doc) => doc.id === result.data.selectedDoctor.id
      );
    } else {
      fullDoctor = AIDoctorAgents.find(
        (doc) => doc.id === result.data.selectedDoctor
      );
    }
    setSessionDetail({
      ...result.data,
      selectedDoctor: fullDoctor || null,
    });
  };

  // Declare event handler functions outside to store references for removal
  let onCallStart: () => void;
  let onCallEnd: () => void;
  let onMessage: (message: any) => void;
  let onSpeechStart: () => void;
  let onSpeechEnd: () => void;

  const StartCall = async () => {
    setLoading(true);
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapi(vapiInstance);
    // Corrected transcriber and voice config according to expected types
    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    };

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("🎤 Microphone access granted");
    } catch (err) {
      console.error("🚫 Microphone access error", err);
    }

    vapiInstance.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    //@ts-ignore
    //vapiInstance.start({VapiAgentConfig});

    console.log("Starting call with config:", VapiAgentConfig);
    console.log("voiceId:", sessionDetail?.selectedDoctor?.voiceId);
    console.log("agentPrompt:", sessionDetail?.selectedDoctor?.agentPrompt);

    // Setup listeners with stored handler functions
    onCallStart = () => {
      setLoading(false);
      console.log("Call started");
      setCallStarted(true);
    };
    vapiInstance.on("call-start", onCallStart);

    onCallEnd = () => {
      setCallStarted(false);
      console.log("Call ended");
    };
    vapiInstance.on("call-end", onCallEnd);

    onMessage = (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == "partial") {
          setLivetranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType == "final") {
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLivetranscript("");
          setCurrentRole(null);
        }
      }
    };
    vapiInstance.on("message", onMessage);

    onSpeechStart = () => {
      console.log("Assistant started speaking");
      setCurrentRole("assistant");
    };
    vapiInstance.on("speech-start", onSpeechStart);

    onSpeechEnd = () => {
      console.log("Assistant stopped speaking");
      setCurrentRole("user");
    };
    vapiInstance.on("speech-end", onSpeechEnd);
  };

  const endCall = async () => {
    setLoading(true);
    if (vapi) {
      vapi.stop();
      if (onCallStart) vapi.off("call-start", onCallStart);
      if (onCallEnd) vapi.off("call-end", onCallEnd);
      if (onMessage) vapi.off("message", onMessage);
      if (onSpeechStart) vapi.off("speech-start", onSpeechStart);
      if (onSpeechEnd) vapi.off("speech-end", onSpeechEnd);
    }

    try {
      const result = await GenerateReport();
      toast.success("Your report is generated!");
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report.");
    }

    setCallStarted(false);
    setVapi(null);
    setLoading(false);
  };

  const GenerateReport = async () => {
    console.log("Generating report with messages:", messages);
    console.log("Session detail:", sessionDetail);
    console.log("Session ID:", sessionId);

    try {
      const result = await axios.post("/api/medical-report", {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId,
      });

      console.log("Report generation response:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    }
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>

        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          {sessionDetail?.selectedDoctor?.image ? (
            <Image
              src={
                sessionDetail.selectedDoctor.image.startsWith("/")
                  ? sessionDetail.selectedDoctor.image
                  : "/" + sessionDetail.selectedDoctor.image
              }
              alt={sessionDetail.selectedDoctor.specialist ?? ""}
              width={120}
              height={120}
              className="h-[100px] w-[100px] object-cover rounded-full"
            />
          ) : null}
          <h2 className="mt-2 text-lg">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 className="text-gray-400 p-2" key={index}>
                {msg.role}:{msg.text}
              </h2>
            ))}

            {liveTranscript && (
              <h2 className="text-lg">
                {currentRoll}:{liveTranscript}
              </h2>
            )}
          </div>
          {!callStarted ? (
            <Button className="mt-20" onClick={StartCall} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <PhoneCall />}
              Start Call
            </Button>
          ) : (
            <Button variant="destructive" onClick={endCall} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
