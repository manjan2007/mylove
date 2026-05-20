import { useState } from "react";

const PINK = "#f472b6";
const PURPLE = "#a78bfa";
const LIGHT_PINK = "#fce7f3";
const LIGHT_PURPLE = "#ede9fe";

const questions = [
  {
    type: "quiz",
    question: "Where did we go on our very first date? 🌸",
    options: ["A cozy cafe", "The beach", "A movie theatre", "A park"],
    answer: 0,
    hint: "Warm drinks, soft lights, and a lot of nervous energy..."
  },
  {
    type: "whoSaidIt",
    question: "Who said it first? 💬",
    quote: "\"I think I might actually like you... like, a lot.\"",
    options: ["You did 💅", "He did 🥺"],
    answer: 0,
    hint: "It was brave. Very brave. 👀"
  },
  {
    type: "quiz",
    question: "What's my go-to order when we get food? 🥤",
    options: ["Biryani, always", "Pasta pesto", "I'll just have soft drink", "Whatever you're having"],
    answer: 2,
    hint: "Surprisingly not that hungry... every single time."
  },
  {
    type: "guessDate",
    question: "When did we start texting? 📱",
    answer: "1",
    hint: "The beginning of everything 🥹",
    options: ["1st March", "5th March", "10th March", "15th March"]
  },
  {
    type: "guessDate",
    question: "When did we have our first kiss? 💋",
    answer: "1",
    hint: "A day you should definitely remember. No pressure. 😭",
    options: ["14th May", "17th May", "19th May", "21st May"]
  },
  {
    type: "whoSaidIt",
    question: "Who said it? 💬",
    quote: "\"You should pay me rent for living in my head 24/7.\"",
    options: ["You did 💅", "He did 🥺"],
    answer: 0,
    hint: "Someone was feeling very poetic that day..."
  },
  {
    type: "quiz",
    question: "What's the first thing I notice when I see you? 🥺",
    options: ["Your eyes", "Your nails", "Your ears", "All of the above... everything 😭"],
    answer: 3,
    hint: "It's genuinely all of it. Every single time."
  },
  {
    type: "quiz",
    question: "What's our future? 🔮",
    options: ["Temporary relationship", "Friends with benefits", "Nothing lol", "Manjan isn't cool enough", "Husband & wife 💍"],
    answer: 4,
    hint: "The only correct answer. Obviously. 😌"
  },
  {
    type: "quiz",
    question: "What do I always do that annoys you (but you secretly love)? 😈",
    options: ["Tease you", "Listen to you yap", "Flirt with you nonstop", "All of the above, honestly"],
    answer: 3,
    hint: "...it's definitely all of the above. Be honest."
  },
  {
    type: "quiz",
    question: "If we were a movie, what genre would it be? 🎬",
    options: ["Romcom chaos", "Slow burn drama", "Action (you're always yelling)", "A documentary about love"],
    answer: 2,
    hint: "Chaotic, funny, somehow always working out."
  }
];

const MILESTONES = [
  { score: 3, title: "Rookie Pookie 🏅", letter: "Okay okay, you showed up. I'll admit — getting 3 right means you at least remember some things. Here's a little secret: I think about you literally all the time. Like, embarrassingly all the time. Don't tell anyone. 🤫" },
  { score: 7, title: "Certified Pookie 🏆", letter: "Seven out of ten? Okay you actually know me. That's kind of terrifying. In a good way. So here's the truth: you make ordinary days feel like something worth remembering. Every single one of them. 🌸" },
  { score: 10, title: "Professional Yap Listener 👂 + Ultimate Pookie 🌟", letter: "PERFECT SCORE?! You absolute menace. You know me better than I know myself sometimes. So here it is, no jokes: I'm really, really glad you're mine. Every late night, every random memory, every dumb fight and soft moment — I'd choose all of it again. Always. 💖" }
];

const ACHIEVEMENTS = [
  { trigger: 1, label: "First Try Energy 💪", desc: "Getting things right from the start. That's a vibe." },
  { trigger: 3, label: "Rookie Pookie 🏅", desc: "You remembered the basics. Impressive... barely." },
  { trigger: 5, label: "Halfway There 🎯", desc: "5/10 — mathematically mediocre, emotionally valid." },
  { trigger: 7, label: "Certified Pookie 🏆", desc: "You actually paid attention. Respect." },
  { trigger: 9, label: "Almost Perfect (Like Me) 💅", desc: "9/10? Overachiever. I'm lowkey impressed." },
  { trigger: 10, label: "Professional Yap Listener 👂", desc: "You listened to every single rant. You deserve this." }
];

const funnyWrongLines = [
  "Bestie... no. 💀", "I— okay. Moving on. 😭", "Are we even dating? 👀",
  "Wrong but I still love you. Kinda.", "That's... that's not it, pookie. 😭",
];
const funnyRightLines = [
  "YESSS! You know me! 🥹", "Okay okay, points for you! ✨",
  "You actually listened omg 🤯", "That's my pookie! 💖", "Correct! You're allowed to be proud 🌸",
];

function FloatingHeart({ style }) {
  return <span aria-hidden style={{ position: "absolute", fontSize: 18, animation: "floatUp 1.2s ease-out forwards", pointerEvents: "none", ...style }}>💗</span>;
}

export default function PookieQuiz() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [unlockedLetters, setUnlockedLetters] = useState([]);
  const [openLetter, setOpenLetter] = useState(null);
  const [heartKey, setHeartKey] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);

  const q = questions[current];

  const spawnHearts = () => {
    const h = Array.from({ length: 5 }, (_, i) => ({ id: heartKey + i, left: `${20 + Math.random() * 60}%`, delay: `${i * 0.15}s` }));
    setHeartKey(k => k + 5);
    setHearts(h);
    setTimeout(() => setHearts([]), 1400);
  };

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    setFeedback(correct ? funnyRightLines[Math.floor(Math.random() * funnyRightLines.length)] : funnyWrongLines[Math.floor(Math.random() * funnyWrongLines.length)]);
    const newScore = correct ? score + 1 : score;
    setAllAnswers(a => [...a, { question: q.question, chosen: q.options[idx], correct: q.options[q.answer], isCorrect: correct }]);
    if (correct) {
      setScore(newScore);
      spawnHearts();
      const newAch = ACHIEVEMENTS.filter(a => a.trigger === newScore && !unlockedAchievements.find(u => u.trigger === a.trigger));
      if (newAch.length) {
        setTimeout(() => { setShowAchievement(newAch[0]); setUnlockedAchievements(u => [...u, newAch[0]]); setTimeout(() => setShowAchievement(null), 3000); }, 800);
      }
      const newLetters = MILESTONES.filter(m => m.score <= newScore && !unlockedLetters.find(l => l.score === m.score));
      if (newLetters.length) setUnlockedLetters(l => [...l, ...newLetters]);
    }
  };

  const next = () => {
    if (current + 1 < questions.length) { setCurrent(c => c + 1); setSelected(null); setFeedback(null); setShowHint(false); }
    else setScreen("result");
  };

  const restart = () => {
    setCurrent(0); setScore(0); setSelected(null); setFeedback(null);
    setShowHint(false); setUnlockedAchievements([]); setUnlockedLetters([]);
    setOpenLetter(null); setAllAnswers([]); setScreen("intro");
  };

  const finalMilestone = MILESTONES.slice().reverse().find(m => score >= m.score);

  const s = {
    card: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: "1.5rem", marginBottom: "1rem", position: "relative", overflow: "hidden" },
    btn: { display: "block", width: "100%", padding: "0.75rem 1rem", marginBottom: "0.6rem", borderRadius: 10, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 15, cursor: "pointer", textAlign: "left" },
    hintBtn: { background: "none", border: "none", color: PURPLE, fontSize: 13, cursor: "pointer", padding: "0.25rem 0", marginTop: "0.5rem" },
    progressDot: (i) => ({ width: 8, height: 8, borderRadius: "50%", background: i < current ? PINK : i === current ? PURPLE : "var(--color-border-tertiary)" }),
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1.5rem 1rem", maxWidth: 560, margin: "0 auto", position: "relative" }}>
      <style>{`@keyframes floatUp{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-80px)}} .opt-btn:hover{background:var(--color-background-secondary)!important}`}</style>
      <h2 className="sr-only">How Well Do You Know Us? — Relationship Quiz Game</h2>

      {hearts.map(h => <FloatingHeart key={h.id} style={{ left: h.left, bottom: "40%", animationDelay: h.delay }} />)}

      {showAchievement && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "var(--color-background-primary)", border: `1.5px solid ${PINK}`, borderRadius: 12, padding: "0.75rem 1.25rem", zIndex: 99, minWidth: 240, textAlign: "center" }}>
          <div style={{ fontWeight: 500, color: "var(--color-text-primary)", fontSize: 15 }}>{showAchievement.label}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>{showAchievement.desc}</div>
        </div>
      )}

      {openLetter && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setOpenLetter(null)}>
          <div style={{ background: "var(--color-background-primary)", borderRadius: 16, padding: "2rem", maxWidth: 420, width: "100%", border: `1.5px solid ${PINK}` }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "1rem" }}>{openLetter.title}</div>
            <div style={{ fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{openLetter.letter}</div>
            <button style={{ marginTop: "1.25rem", ...s.btn, textAlign: "center", color: PINK, borderColor: PINK }} onClick={() => setOpenLetter(null)}>Close 💌</button>
          </div>
        </div>
      )}

      {screen === "intro" && (
        <div style={s.card}>
          <div style={{ fontSize: 36, marginBottom: "0.5rem" }}>💖</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 0.25rem" }}>How well do you know us?</div>
          <div style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: "0 0 1.5rem" }}>10 questions. Zero lying allowed. Unlock hidden love letters as you go. 💌</div>
          <div style={{ background: LIGHT_PURPLE, borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: 13, color: PURPLE, fontWeight: 500 }}>Achievements to unlock</div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>Certified Pookie • Professional Yap Listener • and more...</div>
          </div>
          <button style={{ ...s.btn, background: PINK, color: "#fff", border: "none", textAlign: "center", fontWeight: 500, fontSize: 16 }} onClick={() => setScreen("quiz")}>Start the quiz 💅</button>
        </div>
      )}

      {screen === "quiz" && (
        <>
          <div style={{ display: "flex", gap: 4, marginBottom: "1rem" }}>{questions.map((_, i) => <div key={i} style={s.progressDot(i)} />)}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "0.75rem" }}>Question {current + 1} of {questions.length} · Score: {score}</div>

          <div style={s.card}>
            <div style={{ fontSize: 13, color: PURPLE, fontWeight: 500, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {q.type === "whoSaidIt" ? "Who said it?" : q.type === "guessDate" ? "Guess the date" : "Question"}
            </div>
            <div style={{ fontSize: 17, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "1rem", lineHeight: 1.5 }}>{q.question}</div>
            {q.quote && <div style={{ background: LIGHT_PINK, borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: 15, color: "var(--color-text-secondary)", fontStyle: "italic" }}>{q.quote}</div>}

            {q.options.map((opt, i) => {
              let bg = "var(--color-background-primary)", border = "0.5px solid var(--color-border-secondary)", color = "var(--color-text-primary)";
              if (selected !== null) {
                if (i === q.answer) { bg = "#dcfce7"; border = "1px solid #86efac"; color = "#166534"; }
                else if (i === selected && i !== q.answer) { bg = "#fee2e2"; border = "1px solid #fca5a5"; color = "#991b1b"; }
              }
              return <button key={i} className="opt-btn" style={{ ...s.btn, background: bg, border, color }} onClick={() => handleAnswer(i)}>{opt}</button>;
            })}

            {selected === null && <button style={s.hintBtn} onClick={() => setShowHint(h => !h)}>{showHint ? "Hide hint" : "Need a hint? 👀"}</button>}
            {showHint && selected === null && <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4, fontStyle: "italic" }}>{q.hint}</div>}
            {feedback && <div style={{ marginTop: "0.75rem", fontSize: 14, fontWeight: 500, color: selected === q.answer ? "#166534" : "#991b1b" }}>{feedback}</div>}
            {selected !== null && (
              <button style={{ ...s.btn, marginTop: "1rem", background: PURPLE, color: "#fff", border: "none", textAlign: "center", fontWeight: 500 }} onClick={next}>
                {current + 1 < questions.length ? "Next →" : "See results 🎉"}
              </button>
            )}
          </div>

          {unlockedLetters.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>Unlocked love letters 💌</div>
              {unlockedLetters.map((l, i) => (
                <div key={i} style={{ background: LIGHT_PINK, border: `1px solid ${PINK}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "0.75rem", cursor: "pointer" }} onClick={() => setOpenLetter(l)}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#9d174d" }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: "#be185d", marginTop: 2 }}>Tap to read 💌</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {screen === "result" && (
        <div style={s.card}>
          <div style={{ fontSize: 36, marginBottom: "0.5rem" }}>🎉</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 0.25rem" }}>You scored {score}/{questions.length}</div>
          <div style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: "0 0 1.5rem" }}>{finalMilestone ? finalMilestone.title : "Rookie level. But I still love you."}</div>

          {finalMilestone && (
            <div style={{ background: LIGHT_PINK, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#9d174d", marginBottom: "0.5rem" }}>Love letter unlocked 💌</div>
              <div style={{ fontSize: 14, color: "#be185d", lineHeight: 1.7 }}>{finalMilestone.letter}</div>
            </div>
          )}

          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "0.75rem" }}>Your answers 📋</div>
            {allAnswers.map((a, i) => (
              <div key={i} style={{ borderRadius: 8, padding: "0.6rem 0.75rem", marginBottom: "0.5rem", background: a.isCorrect ? "#dcfce7" : "#fee2e2", border: `0.5px solid ${a.isCorrect ? "#86efac" : "#fca5a5"}` }}>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 2 }}>Q{i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: a.isCorrect ? "#166534" : "#991b1b" }}>You chose: {a.chosen}</div>
                {!a.isCorrect && <div style={{ fontSize: 12, color: "#166534", marginTop: 2 }}>Correct: {a.correct}</div>}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>Achievements earned 🏆</div>
            {unlockedAchievements.length === 0 && <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>None this time... 😭</div>}
            {unlockedAchievements.map((a, i) => (
              <div key={i} style={{ background: LIGHT_PURPLE, borderRadius: 8, padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: PURPLE }}>{a.label}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{a.desc}</div>
              </div>
            ))}
          </div>

          <button style={{ ...s.btn, background: PINK, color: "#fff", border: "none", textAlign: "center", fontWeight: 500 }} onClick={restart}>Play again 💖</button>
        </div>
      )}
    </div>
  );
}
