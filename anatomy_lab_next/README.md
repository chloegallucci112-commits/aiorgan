# Anatomy Lab — 1-hour classroom project

A clickable heart anatomy museum plus a **real** context-aware AI tutor. This is a Next.js/React app. The heart diagram is a simple, intentionally schematic SVG—not a medically precise illustration.

## Start the site

You need Node.js 20.9+ (Node 22 recommended), npm, and a code editor.

```bash
npm install
npm run dev
```

Visit http://localhost:3000. All of the museum features work without any AI key: click the four chambers and vessels, toggle anatomical wall layers, trace blood circulation, and edit the scientific descriptions.

## Turn on the AI tutor (teacher setup)

1. Create an OpenAI API key in your OWN OpenAI API account with billing enabled. This is separate from a ChatGPT subscription.
2. Make a file named `.env.local` in the root of this project (copy `.env.local.example`). Put the key there: `OPENAI_API_KEY=...`.
3. Restart `npm run dev`. The AI tutor now uses the Responses API on the server, with the selected structure, age level, and verified anatomical context in the prompt.
4. You can deploy this to Vercel. Add `OPENAI_API_KEY` in Vercel Project Settings > Environment Variables. **Never** add it to `page.jsx`, commit it, share it with a student, or expose it via `NEXT_PUBLIC_`.

The default model is `gpt-6-luna` (set `OPENAI_MODEL` to a different available model if needed). AI API usage may incur charges. For any publicly shared version, add authentication and rate limits to protect your API costs, or remove the AI feature after class.

## 60-minute lesson plan

- 0–10: Student explores chambers and asks: why does the heart have four?
- 10–20: Discuss how `useState` powers clicking the selected structure. Student customizes the exhibit colors and heading.
- 20–35: Student researches one structure, updates `structures` in `app/page.jsx`, and cross-checks the reference.
- 35–45: Inspect `app/api/ask/route.js`. Explain how AI gets a question plus the selected structure and explanation level. Test a real question, compare Explorer with Pre-med.
- 45–60: Student writes a hypothesis, tests the AI response against the American Heart Association, changes the tutor's instructions to improve it, and presents the website.

## Easy extension ideas

Change the organ to lungs (create a new SVG and `structures` data), add a student-written citations section, build an interactive flow animation, or have the AI generate an analogy but then require the visitor to evaluate its scientific accuracy.

## Files

- `app/page.jsx` — visual layout, heart SVG, parts, facts, buttons, blood flow steps, input form
- `app/globals.css` — visual design and responsive layout
- `app/api/ask/route.js` — SERVER-SIDE AI call (secret API key remains on the server)
- `.env.local.example` — teacher-only setup

## Scientific source

American Heart Association, [How the Healthy Heart Works](https://www.heart.org/en/health-topics/congenital-heart-defects/about-congenital-heart-defects/how-the-healthy-heart-works). Students should verify explanations against an anatomy reference. This is an educational demonstration, not a diagnostic tool.
