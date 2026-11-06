"use strict";
// ---------- Config ----------
const TEST_DATE = new Date("2026-11-17T00:00:00+05:00");
const STORE_KEY = "driving-prep-v1";
const defaultStore = () => ({ attempts: 0, correct: 0, wrong: [], best: 0, checks: {}, planDone: {} });
function load() {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        return raw ? { ...defaultStore(), ...JSON.parse(raw) } : defaultStore();
    }
    catch {
        return defaultStore();
    }
}
let store = load();
function save() {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(store));
    }
    catch { /* private mode */ }
}
const $ = (id) => document.getElementById(id);
// ---------- Countdown ----------
function renderCountdown() {
    const ms = TEST_DATE.getTime() - Date.now();
    const days = Math.ceil(ms / 86400000);
    $("countdown").textContent = days > 0 ? `${days} din baaki` : days === 0 ? "Aaj test hai! Best of luck" : "Test ho chuka";
}
// ---------- Tabs ----------
function showTab(name) {
    document.querySelectorAll(".panel").forEach(p => (p.hidden = p.id !== `tab-${name}`));
    document.querySelectorAll("nav button").forEach(b => {
        b.setAttribute("aria-selected", String(b.dataset.tab === name));
    });
    if (name === "progress")
        renderProgress();
}
let run = [];
let pos = 0;
let score = 0;
let answered = false;
let runWrong = [];
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function startQuiz() {
    const cat = $("cat").value;
    const count = Number($("count").value);
    let pool = QUESTIONS;
    if (cat === "Weak")
        pool = QUESTIONS.filter(q => store.wrong.includes(q.id));
    else if (cat !== "All")
        pool = QUESTIONS.filter(q => q.cat === cat);
    if (pool.length === 0) {
        $("quiz-area").innerHTML = `<p class="note">Abhi koi weak question nahi hai. Pehle ek quiz do!</p>`;
        return;
    }
    run = shuffle(pool).slice(0, count).map(q => {
        const correctText = q.options[q.answer];
        const shuffled = shuffle(q.options);
        return { ...q, shuffled, correctIdx: shuffled.indexOf(correctText) };
    });
    pos = 0;
    score = 0;
    runWrong = [];
    renderQuestion();
}
function renderQuestion() {
    const q = run[pos];
    answered = false;
    const opts = q.shuffled
        .map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`)
        .join("");
    $("quiz-area").innerHTML = `
    <div class="meta"><span>Question ${pos + 1} / ${run.length}</span><span class="tag">${q.cat}</span></div>
    <div class="bar"><div style="width:${(pos / run.length) * 100}%"></div></div>
    ${q.sign ? `<div class="sign">${q.sign}</div>` : ""}
    <h2 class="q">${q.q}</h2>
    <div class="opts">${opts}</div>
    <div id="why" class="why" hidden></div>
    <button id="next" class="primary" hidden>${pos === run.length - 1 ? "Result dekho" : "Agla sawal"}</button>`;
    document.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => pick(Number(b.dataset.i))));
    $("next").addEventListener("click", () => { pos++; pos < run.length ? renderQuestion() : renderResult(); });
}
function pick(i) {
    if (answered)
        return;
    answered = true;
    const q = run[pos];
    const ok = i === q.correctIdx;
    document.querySelectorAll(".opt").forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.correctIdx)
            b.classList.add("right");
        else if (idx === i)
            b.classList.add("wrong");
    });
    if (ok) {
        score++;
        store.wrong = store.wrong.filter(id => id !== q.id);
    }
    else {
        runWrong.push(q.id);
        if (!store.wrong.includes(q.id))
            store.wrong.push(q.id);
    }
    store.attempts++;
    if (ok)
        store.correct++;
    save();
    const why = $("why");
    why.hidden = false;
    why.innerHTML = `<strong>${ok ? "Sahi!" : "Galat."}</strong> ${q.why}`;
    $("next").hidden = false;
}
function renderResult() {
    const pct = Math.round((score / run.length) * 100);
    if (pct > store.best) {
        store.best = pct;
        save();
    }
    const msg = pct >= 80 ? "Zabardast! Test ke liye tayyar." : pct >= 60 ? "Theek hai, thori aur practice." : "Notes dobara parho aur phir koshish karo.";
    $("quiz-area").innerHTML = `
    <div class="result">
      <div class="big">${pct}%</div>
      <p>${score} / ${run.length} sahi. ${msg}</p>
      ${runWrong.length ? `<p class="note">${runWrong.length} galat sawal "Weak questions" mein save ho gaye.</p>` : ""}
      <button id="again" class="primary">Dobara quiz</button>
    </div>`;
    $("again").addEventListener("click", startQuiz);
}
// ---------- Practical checklist ----------
function renderPractical() {
    $("practical-area").innerHTML = PRACTICAL.map((g, gi) => `
    <section class="card">
      <h3>${g.title}</h3>
      ${g.items.map((it, ii) => {
        const key = `${gi}-${ii}`;
        return `<label class="check"><input type="checkbox" data-key="${key}" ${store.checks[key] ? "checked" : ""}/><span>${it}</span></label>`;
    }).join("")}
    </section>`).join("");
    document.querySelectorAll("#practical-area input").forEach(c => c.addEventListener("change", () => { store.checks[c.dataset.key] = c.checked; save(); }));
}
// ---------- Day-by-day plan ----------
const PLAN = [
    { date: "2026-11-06", title: "Day 1", task: "Signs quiz (shape + colour rules) + gaari mein cockpit check practice" },
    { date: "2026-11-07", title: "Day 2", task: "Rules quiz + left side lane discipline practice" },
    { date: "2026-11-08", title: "Day 3", task: "Safety quiz + moving off / smooth clutch control" },
    { date: "2026-11-09", title: "Day 4", task: "Situations quiz + roundabout / junction practice" },
    { date: "2026-11-10", title: "Day 5", task: "Weak questions dobara + reverse parking" },
    { date: "2026-11-11", title: "Day 6", task: "Full quiz (all) + parallel parking" },
    { date: "2026-11-12", title: "Day 7", task: "Hill start + emergency stop practice" },
    { date: "2026-11-13", title: "Day 8", task: "Full quiz, target 80%+ + 3-point turn" },
    { date: "2026-11-14", title: "Day 9", task: "Weak questions + full mock drive (examiner jaisa)" },
    { date: "2026-11-15", title: "Day 10", task: "Halka revision + documents ready karo" },
    { date: "2026-11-16", title: "Day 11", task: "Sirf aram + short quiz. Jaldi so jao" },
    { date: "2026-11-17", title: "Test Day", task: "Documents, jaldi pohancho, ghabrana nahi" },
];
function renderPlan() {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });
    $("plan-area").innerHTML = PLAN.map(p => `
    <label class="check plan ${p.date === today ? "today" : ""}">
      <input type="checkbox" data-date="${p.date}" ${store.planDone[p.date] ? "checked" : ""}/>
      <span><strong>${p.title}</strong> <small>${p.date.slice(5)}</small><br/>${p.task}</span>
    </label>`).join("");
    document.querySelectorAll("#plan-area input").forEach(c => c.addEventListener("change", () => { store.planDone[c.dataset.date] = c.checked; save(); }));
}
// ---------- Progress ----------
function renderProgress() {
    const acc = store.attempts ? Math.round((store.correct / store.attempts) * 100) : 0;
    const items = Object.values(store.checks).filter(Boolean).length;
    const total = PRACTICAL.reduce((n, g) => n + g.items.length, 0);
    $("progress-area").innerHTML = `
    <div class="stats">
      <div class="stat"><b>${store.attempts}</b><span>Sawal solve</span></div>
      <div class="stat"><b>${acc}%</b><span>Accuracy</span></div>
      <div class="stat"><b>${store.best}%</b><span>Best quiz</span></div>
      <div class="stat"><b>${items}/${total}</b><span>Practical checklist</span></div>
      <div class="stat"><b>${store.wrong.length}</b><span>Weak questions</span></div>
    </div>
    <button id="reset" class="ghost">Progress reset karo</button>`;
    $("reset").addEventListener("click", () => {
        if (confirm("Sara progress delete ho jayega. Pakka?")) {
            store = defaultStore();
            save();
            renderPractical();
            renderPlan();
            renderProgress();
        }
    });
}
// ---------- Init ----------
function init() {
    document.querySelectorAll("nav button").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
    $("start").addEventListener("click", startQuiz);
    renderCountdown();
    setInterval(renderCountdown, 60000);
    renderPractical();
    renderPlan();
    showTab("quiz");
}
document.addEventListener("DOMContentLoaded", init);
