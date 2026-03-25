import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequestHint } from "next/dist/server/web/adapter";

export async function POST(req:NextRequest) {
    const{notes}=await req.json();
    try{
    const completion = await openai.chat.completions.create({
    model: 'google/gemini-2.0-flash-001',
    messages: [
          {
        role: 'system',
        content:JSON.stringify(AIDoctorAgents)
      },
      {
        role: 'user',
        content: 'User Notes/Symptoms: ' + notes + ". Based on the user symptoms, please suggest the most relevant doctors from the provided list. Return the complete objects for each suggested doctor (including id, specialist, description, image, agentPrompt, voiceId) as a JSON array.",
      },
    ],
  });
  const rawResp=completion.choices[0].message;
  //@ts-ignore
  const Resp=rawResp.content.trim().replace('```json','').replace('```','');
  let JSONResp;
  try {
    JSONResp = JSON.parse(Resp);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to parse JSON response", details: error.message });
  }
  // Validate JSONResp structure
  if (Array.isArray(JSONResp)) {
    return NextResponse.json(JSONResp);
  } else if (JSONResp && typeof JSONResp === 'object' && Array.isArray(JSONResp.doctors)) {
    return NextResponse.json(JSONResp.doctors);
  } else {
    console.error("Unexpected AI response structure:", JSONResp);
    return NextResponse.json([]);
  }
  //@ts-ignore
  } catch(e){
    return NextResponse.json(e);
  }
}
