"use client";

import { useState } from "react";

// TEACHER TIP: Let your student edit these facts and questions first.
// Visual shapes and button interactions below are ordinary JavaScript,
// while /api/ask sends visitor questions to a REAL AI model.
const structures = {
  "Right atrium": {
    group: "chambers", number: "01", type: "RECEIVING CHAMBER", oxygen: "Oxygen-poor",
    summary: "Receives blood returning from the body before it enters the right ventricle.",
    connection: "From body → right atrium → tricuspid valve",
    question: "Why does blood return to the right atrium first?",
  },
  "Right ventricle": {
    group: "chambers", number: "02", type: "PUMPING CHAMBER", oxygen: "Oxygen-poor",
    summary: "Pumps blood to the lungs so it can receive fresh oxygen.",
    connection: "Right atrium → right ventricle → lungs",
    question: "Why does the right ventricle pump to the lungs instead of the body?",
  },
  "Left atrium": {
    group: "chambers", number: "03", type: "RECEIVING CHAMBER", oxygen: "Oxygen-rich",
    summary: "Receives freshly oxygenated blood returning from the lungs.",
    connection: "Lungs → left atrium → mitral valve",
    question: "Why do the pulmonary veins carry oxygen-rich blood?",
  },
  "Left ventricle": {
    group: "chambers", number: "04", type: "PUMPING CHAMBER", oxygen: "Oxygen-rich",
    summary: "Pushes oxygen-rich blood through the aorta to the rest of the body.",
    connection: "Left atrium → left ventricle → aorta → body",
    question: "Why is the left ventricle's muscular wall thicker?",
  },
  "Aorta": {
    group: "chambers", number: "05", type: "MAJOR ARTERY", oxygen: "Oxygen-rich",
    summary: "The largest artery. It carries blood from the left ventricle to the body.",
    connection: "Left ventricle → aorta → body",
    question: "What makes the aorta different from a vein?",
  },
  "Tricuspid valve": {
    group: "chambers", number: "06", type: "ONE-WAY VALVE", oxygen: "Oxygen-poor",
    summary: "A one-way gate between the right atrium and right ventricle.",
    connection: "Right atrium → tricuspid valve → right ventricle",
    question: "How do heart valves stop blood from flowing backward?",
  },
  "Pericardium": {
    group: "layers", number: "01", type: "PROTECTIVE SAC", oxygen: "Outer covering",
    summary: "A fluid-cushioned protective sac around the heart that reduces friction.",
    connection: "Outside the heart's muscular wall",
    question: "Why does the beating heart need a protective sac?",
  },
  "Myocardium": {
    group: "layers", number: "02", type: "CARDIAC MUSCLE", oxygen: "Middle heart-wall layer",
    summary: "The muscular part of the heart wall. Its cells contract to create a heartbeat.",
    connection: "Between the outer heart surface and the endocardium",
    question: "How is heart muscle different from the muscles in our arms?",
  },
  "Endocardium": {
    group: "layers", number: "03", type: "SMOOTH INNER LINING", oxygen: "Inner heart-wall layer",
    summary: "The smooth lining inside the heart chambers and covering the valves.",
    connection: "At the boundary between the heart wall and blood",
    question: "Why is a smooth lining helpful inside the heart?",
  },
};

const routes = [
  ["Body", "Blood returns with less oxygen"],
  ["Right atrium", "The heart receives it"],
  ["Right ventricle", "The heart sends it to the lungs"],
  ["Lungs", "Oxygen enters the blood"],
  ["Left atrium", "Oxygen-rich blood returns"],
  ["Left ventricle", "The heart pumps it to the body"],
  ["Aorta", "Blood leaves for the body"],
];

function HeartSVG({ selected, setSelected }) {
  const selectedClass = (part) => selected === part ? "anatomy-part active" : "anatomy-part";
  return (
    <svg className="heart-svg" viewBox="0 0 520 530" role="img" aria-label="Simplified clickable cross-sectional schematic of the heart. The anatomical right side is on the left of the illustration.">
      <defs>
        <linearGradient id="wall" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#e8a98d"/><stop offset=".56" stopColor="#cf806d"/><stop offset="1" stopColor="#a85d60"/></linearGradient>
        <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fa8f88"/><stop offset="1" stopColor="#c94b68"/></linearGradient>
        <linearGradient id="cool" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#86bfd7"/><stop offset="1" stopColor="#376fa4"/></linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="11" stdDeviation="12" floodColor="#9e5d5d" floodOpacity=".15"/></filter>
      </defs>
      <g opacity=".3" stroke="#d2c9c0" strokeWidth="1"><path d="M50 95H470M50 205H470M50 315H470M50 425H470"/><path d="M120 40V475M260 40V475M400 40V475"/></g>
      <text x="26" y="44" className="side-label">ANATOMICAL RIGHT</text><text x="348" y="44" className="side-label">ANATOMICAL LEFT</text>
      {/* Main organ silhouette and schematic chambers. Shapes are educational, NOT to scale. */}
      <path filter="url(#shadow)" d="M253 143 C172 58 69 132 87 257 C97 369 186 435 261 493 C347 438 435 351 443 248 C449 137 348 61 253 143Z" fill="url(#wall)" stroke="#a55b5b" strokeWidth="5"/>
      {/* vena cava */}
      <path d="M150 90V186" fill="none" stroke="#4d8fbb" strokeWidth="34" strokeLinecap="round"/>
      {/* pulmonary veins entering the left atrium */}
      <path d="M456 175H373" fill="none" stroke="#d95d6f" strokeWidth="26" strokeLinecap="round"/>
      {/* aorta */}
      <g role="button" tabIndex="0" className={selectedClass("Aorta")} onClick={() => setSelected("Aorta")} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected("Aorta")} aria-label="Select aorta">
        <path d="M315 171V71C315 40 349 37 362 59Q378 75 398 66" fill="none" stroke="#bd4357" strokeWidth="43" strokeLinecap="round"/>
        <path d="M315 171V71C315 40 349 37 362 59Q378 75 398 66" fill="none" stroke="#ec8891" strokeWidth="31" strokeLinecap="round"/>
        <text x="380" y="42" className="tiny-label">AORTA</text>
      </g>
      {/* chamber positions appear mirrored from patients point of view */}
      <g role="button" tabIndex="0" className={selectedClass("Right atrium")} onClick={() => setSelected("Right atrium")} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected("Right atrium")} aria-label="Select right atrium">
        <path d="M119 165Q164 126 231 166L229 267Q165 288 116 256Z" fill="url(#cool)" stroke="#e7cdbe" strokeWidth="7"/>
        <text x="174" y="216" textAnchor="middle" className="chamber-label">RA</text>
      </g>
      <g role="button" tabIndex="0" className={selectedClass("Right ventricle")} onClick={() => setSelected("Right ventricle")} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected("Right ventricle")} aria-label="Select right ventricle">
        <path d="M125 283Q168 267 224 282L232 428Q142 377 125 283Z" fill="url(#cool)" stroke="#e7cdbe" strokeWidth="7"/>
        <text x="179" y="329" textAnchor="middle" className="chamber-label">RV</text>
      </g>
      <g role="button" tabIndex="0" className={selectedClass("Left atrium")} onClick={() => setSelected("Left atrium")} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected("Left atrium")} aria-label="Select left atrium">
        <path d="M279 168Q344 120 399 174L390 265Q344 285 278 256Z" fill="url(#warm)" stroke="#f1c1b1" strokeWidth="7"/>
        <text x="339" y="213" textAnchor="middle" className="chamber-label">LA</text>
      </g>
      <g role="button" tabIndex="0" className={selectedClass("Left ventricle")} onClick={() => setSelected("Left ventricle")} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected("Left ventricle")} aria-label="Select left ventricle">
        <path d="M278 276Q354 258 402 283Q399 381 265 465Z" fill="url(#warm)" stroke="#f3c4b4" strokeWidth="16"/>
        <text x="333" y="335" textAnchor="middle" className="chamber-label">LV</text>
      </g>
      <path d="M252 165L257 445" stroke="#8d4650" strokeWidth="13" fill="none" strokeLinecap="round" pointerEvents="none"/>
      <g role="button" tabIndex="0" className={selectedClass("Tricuspid valve")} onClick={() => setSelected("Tricuspid valve")} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected("Tricuspid valve")} aria-label="Select tricuspid valve">
        <rect x="115" y="258" width="124" height="29" rx="10" fill="transparent"/>
        <path d="M139 273L169 289L199 270L226 282" fill="none" stroke="#f6eccf" strokeWidth="9" strokeLinecap="round"/>
      </g>
      <g className="axis-note"><text x="28" y="493">SCHEMATIC · NOT TO SCALE</text><text x="450" y="493" textAnchor="end">RA / RV / LA / LV</text></g>
    </svg>
  );
}

function LayerSVG({ selected, setSelected }) {
  const layers = [
    { name: "Pericardium", r: 163, color: "#f7c5a6" },
    { name: "Myocardium", r: 133, color: "#b95362" },
    { name: "Endocardium", r: 77, color: "#ffc8b4" },
  ];
  return (
    <svg className="heart-svg" viewBox="0 0 520 530" role="img" aria-label="Simplified diagram showing a heart wall in layers">
      <g opacity=".3" stroke="#d2c9c0"><path d="M45 110H475M45 260H475M45 410H475"/><path d="M110 50V460M260 50V460M410 50V460"/></g>
      <text x="35" y="46" className="side-label">HEART WALL · CROSS SECTION</text>
      {layers.map(({ name, r, color }) => (
        <g key={name} className={selected === name ? "anatomy-part active" : "anatomy-part"} role="button" tabIndex="0" onClick={() => setSelected(name)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected(name)} aria-label={`Select ${name}`}>
          <circle cx="260" cy="262" r={r} fill={color} stroke="#fff3ea" strokeWidth={selected === name ? 12 : 5}/>
        </g>
      ))}
      <circle cx="260" cy="262" r="48" fill="#7c344d" pointerEvents="none"/>
      <text x="260" y="266" textAnchor="middle" fill="white" fontSize="11" letterSpacing="2" fontWeight="700" pointerEvents="none">BLOOD</text>
      <g className="axis-note"><text x="35" y="488">CONCEPTUAL SECTION · NOT TO SCALE</text></g>
    </svg>
  );
}

export default function HomePage() {
  const [view, setView] = useState("chambers");
  const [selected, setSelected] = useState("Left ventricle");
  const [level, setLevel] = useState("Explorer");
  const [question, setQuestion] = useState(structures["Left ventricle"].question);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [step, setStep] = useState(0);
  const part = structures[selected];

  function choose(name) {
    setSelected(name);
    setQuestion(structures[name].question);
    setAnswer(""); setError("");
  }
  function chooseView(next) {
    setView(next);
    choose(next === "chambers" ? "Left ventricle" : "Myocardium");
    setShowFlow(false);
  }
  async function askAI(event) {
    event.preventDefault(); setLoading(true); setError(""); setAnswer("");
    try {
      const response = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, structure: selected, level }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Couldn't reach the tutor.");
      setAnswer(data.answer);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  function nextFlow() {
    const next = (step + 1) % routes.length; setStep(next);
    if (structures[routes[next][0]]) choose(routes[next][0]);
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="logo"><span className="logo-sign">✳</span> ANATOMY<span className="logo-muted">LAB</span></div>
        <div className="header-right"><span className="micro">EXHIBIT NO. 001</span><span className="header-tag">HUMAN BIOLOGY / AI</span></div>
      </header>

      <section className="intro">
        <div className="intro-copy"><div className="eyebrow">A SMALL MUSEUM OF BIG QUESTIONS <span>—</span> 2026</div><h1>The human heart<span className="dot">.</span></h1><p>Explore the architecture of a beating organ. Discover the science inside each structure, then ask an AI research guide what you want to know next.</p></div>
        <div className="intro-right"><span className="orbit">↗</span><span>INTERACTIVE<br/>ANATOMY ATLAS</span></div>
      </section>

      <main className="main-grid">
        <aside className="left-panel">
          <div className="label">01 / YOUR EXHIBIT</div>
          <div className="organ-list"><button className="organ-active"><span>♥</span> Heart <small>OPEN</small></button><div className="organ-disabled"><span>◒</span> Lungs <small>NEXT</small></div><div className="organ-disabled"><span>◉</span> Brain <small>NEXT</small></div></div>
          <div className="rule"/>
          <div className="label">02 / STUDY MODE</div>
          <button className={view === "chambers" ? "mode selected" : "mode"} onClick={() => chooseView("chambers")}>Chambers & vessels <span>↗</span></button>
          <button className={view === "layers" ? "mode selected" : "mode"} onClick={() => chooseView("layers")}>Peel back the layers <span>↗</span></button>
          <div className="sidebar-bottom"><div className="sidebar-spark">✦</div><strong>Think like a researcher.</strong><p>Every click is a new observation. Your questions drive the investigation.</p></div>
        </aside>

        <section className="viz-panel">
          <div className="viz-head"><div><div className="label">ANATOMICAL SPECIMEN / 001</div><strong>{view === "chambers" ? "Inside the four-chambered heart" : "The protective layers"}</strong></div><span className="specimen">◉ LIVE EXHIBIT</span></div>
          <div className="visual"><div className="visual-caption">SELECT A PART OF THE ILLUSTRATION</div>{view === "chambers" ? <HeartSVG selected={selected} setSelected={choose} /> : <LayerSVG selected={selected} setSelected={choose} />}</div>
          <div className="anatomy-tags">{Object.entries(structures).filter(([, value]) => value.group === view).map(([name]) => <button key={name} className={selected === name ? "tag active" : "tag"} onClick={() => choose(name)}>{name}</button>)}</div>
          {view === "chambers" && <div className="flow-box"><div className="flow-top"><div><div className="label">TRACE THE FLOW</div><strong>Follow a drop of blood</strong></div><button onClick={() => { setShowFlow(!showFlow); setStep(0); }}>{showFlow ? "Close trail −" : "Explore trail →"}</button></div>{showFlow && <div className="flow-current"><span>{String(step + 1).padStart(2,"0")} / 07</span><div><strong>{routes[step][0]}</strong><p>{routes[step][1]}</p></div><button onClick={nextFlow}>Next →</button></div>}</div>}
        </section>

        <aside className="inspector">
          <div className="inspector-header"><div className="label">03 / ANATOMY INSPECTOR</div><span className="inspector-number">{part.number}</span></div>
          <div className="inspector-body"><div className="type">{part.type}</div><h2>{selected}<span className="dot">.</span></h2><div className="oxygen"><span className={part.oxygen === "Oxygen-poor" ? "blue-dot" : "red-dot"}/> {part.oxygen}</div><p>{part.summary}</p><div className="relationship"><span>CONNECTION</span><strong>{part.connection}</strong></div></div>
          <div className="ai-panel"><div className="ai-heading"><div><span className="sparkle">✳</span> ASK THE AI RESEARCH GUIDE</div><span>AI</span></div><p className="ai-help">A research companion that uses the structure you're viewing to explain the science.</p><form onSubmit={askAI}><div className="level-toggle" role="group" aria-label="Explanation level"><button type="button" className={level === "Explorer" ? "level active" : "level"} onClick={() => setLevel("Explorer")}>Explorer</button><button type="button" className={level === "Pre-med" ? "level active" : "level"} onClick={() => setLevel("Pre-med")}>Pre-med</button></div><label htmlFor="question" className="question-label">MY RESEARCH QUESTION</label><textarea id="question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={300} rows={3} placeholder="Ask anything about this structure..."/><button disabled={loading || !question.trim()} className="ask-button" type="submit">{loading ? "Thinking…" : "Ask the AI →"}</button></form>{answer && <div className="ai-answer"><strong>AI RESEARCH NOTE</strong><p>{answer}</p></div>}{error && <div role="status" className="ai-error">{error}</div>}<div className="fineprint">AI can make mistakes. Check anatomy facts against a reliable medical source. For learning, not diagnosis.</div></div>
        </aside>
      </main>
      <footer><span>ANATOMY LAB · BUILT WITH REACT & AI</span><a href="https://www.heart.org/en/health-topics/congenital-heart-defects/about-congenital-heart-defects/how-the-healthy-heart-works" target="_blank" rel="noreferrer">SOURCE: AMERICAN HEART ASSOCIATION ↗</a><span>YOUR CURIOSITY IS THE EXPERIMENT.</span></footer>
    </div>
  );
}
