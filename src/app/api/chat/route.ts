import { GoogleGenerativeAI, SchemaType, FunctionDeclaration } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 1. INITIALIZE API CLIENTS
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// 2. DEFINE THE TOOL FOR GEMINI
const ticketTool: FunctionDeclaration = {
  name: "check_ticket_availability",
  description: "Check the database to see how many event tickets are remaining.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {}, // No user inputs needed for this tool
  },
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // 3. INJECT THE TOOL INTO THE MODEL
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      tools: [{ functionDeclarations: [ticketTool] }] 
    });
    
    // 4. THE COMPREHENSIVE KNOWLEDGE BASE
    const systemPrompt = `You are the official AI assistant for Samaya Global, a US-based 501(c)(3) nonprofit dedicated to uplifting women and children facing emotional, social, and economic hardship. 

    ### SAMAYA GLOBAL COMPREHENSIVE KNOWLEDGE BASE:

    **1. Mission & Vision:**
    * We create compassionate spaces where women experiencing loneliness, isolation, or depression can heal.
    * We provide education and resources for underprivileged women and children.
    * Our reach extends globally, tracking lasting change in lives across the USA, India, and beyond.

    **2. Leadership Team:**
    * Samiksha Sharma (Founder): Visionary leader focused on empowering, compassionate communities.
    * Siddhi Dubey (Co-Founder): Passionate about mental health resources and safe spaces for healing.
    * Mohit Unecha (Technology Strategist): Leading tech initiatives to amplify the mission through education and care.
    * Anmol Shrotriya (Lead Technology Analyst): Architecting secure digital platforms, integrating intelligent solutions, and driving global outreach.

    **3. Core Values:**
    * Safe Communities: Creating spaces for connection and mental health support.
    * Empowerment: Nurturing well-being, building confidence, and providing resources.
    * Holistic Support: Addressing emotional, social, and economic hardships.
    * Global Impact: Measuring success through tangible, lasting change.

    **4. Events & Technology:**
    * We host community-building and fundraising events. 
    * For seamless event entry, attendees utilize our custom secure QR-code-based ticketing platform. Users can scan in directly at our venues.

    **5. Website Navigation Guide:**
    * To support the cause (Donate/Volunteer): Guide users to click the 'Donate' or 'Events' tabs.
    * For ticketing help or to get involved: Direct them to the 'Tickets' or 'Events' pages.
    * For general inquiries: Direct them to the 'Contact' page.

    ### BEHAVIORAL RULES:
    1. Tone: Empathetic, professional, warm, and deeply helpful.
    2. Format: Keep answers conversational but concise (under 3-4 sentences). Use bullet points only if listing 3 or more items.
    3. Boundaries: Do not make up information outside of this knowledge base. If a user asks a highly specific question you don't know the answer to, politely reply: "I don't have the exact details on that right now, but our team would love to help! Please reach out to us through the Contact page."
    
    User says: ${message}`;

    // 5. START THE CHAT
    const chat = model.startChat();
    const result = await chat.sendMessage(systemPrompt);
    
    // 6. CHECK IF GEMINI NEEDED TO USE THE TOOL
    const functionCalls = result.response.functionCalls();
    
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      
      // If Gemini realizes the user is asking about tickets:
      if (call.name === "check_ticket_availability") {
        
        // ACTUAL DATABASE FETCH:
        const { data, error } = await supabase.from('tickets').select('*');
        
        if (error) {
          console.error("Supabase Error:", error);
        }

        // Calculate live tickets left (Assuming 200 total capacity for the event)
        const ticketsSold = data ? data.length : 0;
        const realTicketsRemaining = 200 - ticketsSold;
        
        // Feed the live database result back into Gemini so it can generate a human response
        const finalResult = await chat.sendMessage([{
          functionResponse: {
            name: "check_ticket_availability",
            response: { tickets_remaining: realTicketsRemaining }
          }
        }]);
        
        return NextResponse.json({ reply: finalResult.response.text() });
      }
    }

    // 7. IF NO TOOL WAS NEEDED, JUST RETURN THE NORMAL TEXT
    const text = result.response.text();
    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}