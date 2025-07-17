import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/config/db";
import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();

  let user;
  try {
    user = await currentUser();
  } catch (err) {
    console.error("currentUser failed:", err);
    return NextResponse.json({ error: "Failed to get current user" }, { status: 500 });
  }

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessionId = uuidv4();

   
    const doctorId = selectedDoctor ? selectedDoctor : null;

    console.log("Inserting doctorId:", doctorId);

    const result = await db.insert(sessionChatTable).values({
      sessionId,
      createdBy: user.primaryEmailAddress.emailAddress,
      notes,
      selectedDoctor: doctorId,
      conversation: [],                    
      report: "", 
      createdOn: new Date().toISOString(),
    }).returning(); // <-- changed

    return NextResponse.json(result[0]);
  } catch (e: any) {
    console.error("Insert error:", e);
    return NextResponse.json({ error: "Internal server error", message: e.message, stack: e.stack }, { status: 500 });
  }
}






export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url);
    const sessionId=searchParams.get('sessionId');
    const user=await currentUser();

    if(sessionId=='all')
    {
      const result=await db.select().from(sessionChatTable)
    //@ts-ignore
    .where(eq(sessionChatTable.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(sessionChatTable.id)); 
 
    return NextResponse.json(result);
    }
    else{
      const result=await db.select().from(sessionChatTable)
    //@ts-ignore
    .where(eq(sessionChatTable.sessionId,sessionId));

    return NextResponse.json(result[0]);
    }

    

}