import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { db } from "@/config/db";
import { sessionChatTable, reportsTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with user.Based on doctor AI agent info and Conversation between AI medical Agent and user,generate a structured report with the following fields:

1.  sessionId: a unique session identifier
2.  agent: the medical specialist name (e.g., "General Physician AI")
3.  user: name of the patient or "Anonymous" if not provided
4.  timestamp: current date and time in ISO format
5.  chiefComplaint: one-sentence summary of the main health concern
6.  summary: a 2-3 sentence summary of the conversation, symptoms, and key findings
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
Only include valid fields. Respond with nothing else.
`;

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetail, messages } = await req.json();
 
  try {
   
    const UserInput =
      "AI Doctor Agent Info:" +
      JSON.stringify(sessionDetail) +
      ",Conversation:" +
      JSON.stringify(messages);

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: REPORT_GEN_PROMPT,
        },
        {
          role: "user",
          content: UserInput,
        },
      ],
    });

     const raw = completion.choices[0].message.content?.trim() ?? "";
    const clean = raw.replace("```json", "").replace("```", "");

    let reportJson;
    try {
      reportJson = JSON.parse(clean);
    } catch (e) {
      console.error("Failed to parse report JSON", e, clean);
      throw e;
    }

    // Sanitize: ensure both values are valid JSON-serializable objects
    const safeReport = typeof reportJson === "object" ? reportJson : {};
    const safeConversation = Array.isArray(messages) ? messages : [];

    // Save to Database
    await db.update(sessionChatTable).set({
      report: safeReport,
      conversation: safeConversation,
    }).where(eq(sessionChatTable.sessionId, sessionId));

    // Also insert into the dedicated reports table
    try {
      // First, get the createdBy from the session to link it correctly
      const sessionInfo = await db.select({ createdBy: sessionChatTable.createdBy }).from(sessionChatTable).where(eq(sessionChatTable.sessionId, sessionId)).limit(1);

      if (sessionInfo.length > 0 && sessionInfo[0].createdBy) {
        await db.insert(reportsTable).values({
          sessionId: sessionId,
          reportData: safeReport,
          specialist: sessionDetail?.specialist || "General Physician",
          chiefComplaint: safeReport.chiefComplaint || "",
          createdBy: sessionInfo[0].createdBy,
          createdOn: new Date().toISOString(),
        });
      }
    } catch (insertError) {
      console.error("Failed to insert into reportsTable:", insertError);
      // We don't throw here to avoid failing the overall report generation
    }

    return NextResponse.json(reportJson);
  } 
  catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ error: (e as Error).message });
  }
}
