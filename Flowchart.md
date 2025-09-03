
### **Application Flow**

1. **User Visits Web App**

   * Entry point.

2. **Authentication**

   * User submits credentials.
   * Decision: **Authentication Success?**

     * ✅ Yes → Proceed
     * ❌ No → Authentication Failed

### **Patient Information Entry**

3. **Enter Basic Information**

   * If user declines → **Session Not Started**

4. **Enter Name**

5. **Enter Symptoms**

6. **Enter Additional Details**

### **AI & Doctor Selection**

7. **AI Suggests Specialist**

8. **Choose Doctor Specialist**

### **Consultation**

9. **Start Voice Agent Conversation**

10. **Two-Way Conversation**

### **Post-Consultation**

11. **Call Details Generated**

* Duration, participants, etc.

12. **Report Generated**

* Summary of symptoms, doctor’s notes, suggested treatment.

---

So the final flow is:

**User Visits Web App → Authentication → Patient Info → AI Suggests Specialist → Doctor Selection → Voice Conversation → Call Details → Report Generated**


Perfect 👍 you want to keep the **VAPI flow** as a separate diagram. The screenshot you shared already outlines it well. Here’s a clean description of this **VAPI Flow**:

---

### **VAPI.ai Flow (Voice Agent Processing)**

1. **Speech-to-Text**

   * Converts user’s spoken input into text.

2. **LLM Model**

   * Processes the transcribed text.
   * Generates a meaningful response.

3. **Text-to-Speech**

   * Converts LLM response back into voice output.

4. **Speech-to-Text (Live Streaming)** *(Assembly.AI)*

   * Captures ongoing conversation in real-time for monitoring/transcription.

5. **AI Medical Voice Agent**

   * Handles the interaction loop between patient and doctor.
   * Ensures medical context is preserved.

