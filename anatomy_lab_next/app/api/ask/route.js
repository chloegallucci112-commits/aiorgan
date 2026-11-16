import { NextResponse } from "next/server";

// Curated, teacher-reviewed facts. The tutor is asked to stay within them
// for its anatomy explanations instead of inventing medical details.
const anatomyFacts = {
  "Right atrium": "Upper right chamber. Receives oxygen-poor blood returning from the body through the venae cavae. Blood then passes through the tricuspid valve into the right ventricle.",
  "Right ventricle": "Lower right chamber. Pumps oxygen-poor blood through the pulmonary valve and pulmonary artery toward the lungs for oxygenation.",
  "Left atrium": "Upper left chamber. Receives oxygen-rich blood returning from the lungs through the pulmonary veins. Blood passes through the mitral valve to the left ventricle.",
  "Left ventricle": "Lower left chamber. Pumps oxygen-rich blood through the aortic valve into the aorta and then to the body. Its muscular wall is especially thick because it generates the high pressure needed for systemic circulation.",
  "Aorta": "The largest artery in the body. It distributes oxygen-rich blood pumped from the left ventricle toward body tissues.",
  "Tricuspid valve": "Valve between the right atrium and right ventricle. Helps prevent backward blood flow during the cardiac cycle.",
  "Pericardium": "The protective sac surrounding the heart. Its layers and fluid help reduce friction as the heart moves.",
  "Myocardium": "The thick, muscular middle layer of the heart wall. Heart muscle cells contract to pump blood.",
  "Endocardium": "The smooth inner lining of the heart chambers and valves. It borders blood as it moves through the heart.",
};

export async function POST(request) {
  try {
    const { question, structure, level } = await request.json();
    if (
      typeof question !== "string" ||
      question.trim().length < 3 ||
      question.length > 300 ||
      !Object.hasOwn(anatomyFacts, structure) ||
      !["Explorer", "Pre-med"].includes(level)
    ) {
      return NextResponse.json({ error: "Choose a structure and enter a short anatomy question (up to 300 characters)." }, { status: 400 });
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key || key === "replace_me") {
      return NextResponse.json({ error: "The interactive museum works now. To turn on the AI tutor, add OPENAI_API_KEY to .env.local and restart the server." }, { status: 503 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let upstream;
    try {
      upstream = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-6-luna",
          reasoning: { effort: "none" },
          instructions: `You are an upbeat, careful museum educator teaching heart anatomy to an approximately 12-year-old student. The selected structure is: ${structure}. Verified reference fact: ${anatomyFacts[structure]} Explain in the language level requested. Answer in 70-110 words max. Connect the explanation to what the visitor clicked. If helpful, use a simple analogy without misleading. End with ONE thoughtful scientific observation question, not a quiz or game. Do not invent information beyond established basics. If the user asks about an unrelated structure, explain the connection or say it's outside this exhibit. Do not diagnose symptoms or give personal medical advice. If uncertain, say so.`,
          input: `Level: ${level}. Visitor question: ${question.trim()}`,
          max_output_tokens: 360,
        }),
        signal: controller.signal,
        cache: "no-store",
      });
    } finally {
      clearTimeout(timeout);
    }

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return NextResponse.json({ error: "The AI service isn't available right now. Please check the server configuration and try again." }, { status: 502 });
    }
    const answer = (data.output || []).flatMap(item => item.content || []).filter(part => part.type === "output_text").map(part => part.text).join("\n").trim();
    if (!answer) return NextResponse.json({ error: "The AI didn't return an answer. Try a shorter question." }, { status: 502 });
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: error?.name === "AbortError" ? "The AI request timed out." : "Couldn't process the question." }, { status: 500 });
  }
}
