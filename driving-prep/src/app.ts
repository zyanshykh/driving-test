// ---------- Config ----------
const TEST_DATE = new Date("2026-11-17T00:00:00+05:00");
const STORE_KEY = "driving-prep-v2";
const LANG_KEY = "driving-prep-lang";
const THEME_KEY = "driving-prep-theme";

interface Store {
  attempts: number;
  correct: number;
  wrong: string[];
  best: number;
  checks: Record<string, boolean>;
  planDone: Record<string, boolean>;
}
const defaultStore = (): Store => ({ attempts: 0, correct: 0, wrong: [], best: 0, checks: {}, planDone: {} });

function lsGet(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string): void { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

function load(): Store {
  try { const raw = lsGet(STORE_KEY); return raw ? { ...defaultStore(), ...JSON.parse(raw) } : defaultStore(); }
  catch { return defaultStore(); }
}
let store: Store = load();
const save = (): void => lsSet(STORE_KEY, JSON.stringify(store));

// ---------- Language ----------
let lang = 0; // 0 = English, 1 = Urdu
const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

function tx(key: string, vars: Record<string, string | number> = {}): string {
  let s = UI[key][lang];
  for (const k of Object.keys(vars)) s = s.split(`{${k}}`).join(String(vars[k]));
  return s;
}
function fmt(n: number): string {
  return lang === 1 ? n.toLocaleString("ur-PK", { useGrouping: false }) : String(n);
}
const pct = (n: number): string => (lang === 1 ? `${fmt(n)}٪` : `${n}%`);
const LETTERS: string[][] = [["A", "B", "C", "D"], ["الف", "ب", "ج", "د"]];

function applyLang(): void {
  const html = document.documentElement;
  html.lang = lang === 1 ? "ur" : "en";
  html.dir = lang === 1 ? "rtl" : "ltr";
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(el => {
    el.textContent = UI[el.dataset.i18n as string][lang];
  });
  $("theme").setAttribute("aria-label", tx("themeBtn"));
  document.title = tx("title");
}

function toggleLang(): void {
  lang = lang === 0 ? 1 : 0;
  lsSet(LANG_KEY, String(lang));
  applyLang();
  renderAll();
}

// ---------- Theme ----------
function applyTheme(t: string): void { document.documentElement.dataset.theme = t; }
function toggleTheme(): void {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  lsSet(THEME_KEY, next);
}

// ---------- Countdown ----------
function renderCountdown(): void {
  const days = Math.ceil((TEST_DATE.getTime() - Date.now()) / 86_400_000);
  if (days > 0) { $("cd-num").textContent = fmt(days); $("cd-label").textContent = tx("daysLeft"); }
  else { $("cd-num").textContent = "✓"; $("cd-label").textContent = days === 0 ? tx("testToday") : tx("testDone"); }
}

// ---------- Tabs ----------
let currentTab = "quiz";
function showTab(name: string): void {
  currentTab = name;
  document.querySelectorAll<HTMLElement>(".panel").forEach(p => (p.hidden = p.id !== `tab-${name}`));
  document.querySelectorAll<HTMLButtonElement>(".tabs button").forEach(b =>
    b.setAttribute("aria-selected", String(b.dataset.tab === name)));
  if (name === "progress") renderProgress();
}

// ---------- Quiz ----------
interface RunQ { q: Question; order: number[]; } // order[pos] = original option index
type View = "idle" | "question" | "result" | "noweak";

let view: View = "idle";
let run: RunQ[] = [];
let pos = 0;
let score = 0;
let picked: number | null = null; // position the user picked
let runWrong = 0;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz(): void {
  const cat = $<HTMLSelectElement>("cat").value;
  const count = Number($<HTMLSelectElement>("count").value);
  let pool = QUESTIONS;
  if (cat === "Weak") pool = QUESTIONS.filter(q => store.wrong.includes(q.id));
  else if (cat !== "All") pool = QUESTIONS.filter(q => q.cat === cat);
  if (pool.length === 0) { view = "noweak"; renderQuiz(); return; }
  run = shuffle(pool).slice(0, count).map(q => ({ q, order: shuffle(q.options.map((_, i) => i)) }));
  pos = 0; score = 0; runWrong = 0; picked = null;
  view = "question";
  renderQuiz();
}

function renderQuiz(): void {
  const area = $("quiz-area");
  if (view === "idle") { area.innerHTML = `<p class="note">${tx("hint")}</p>`; return; }
  if (view === "noweak") { area.innerHTML = `<p class="note">${tx("noWeak")}</p>`; return; }
  if (view === "result") { renderResult(); return; }

  const { q, order } = run[pos];
  const correctPos = order.indexOf(q.answer);
  const opts = order.map((orig, i) => {
    let cls = "opt";
    if (picked !== null) {
      if (i === correctPos) cls += " right";
      else if (i === picked) cls += " wrong";
    }
    return `<button class="${cls}" data-i="${i}" ${picked !== null ? "disabled" : ""}>
      <span class="letter">${LETTERS[lang][i]}</span><span>${q.options[orig][lang]}</span></button>`;
  }).join("");

  const feedback = picked === null ? "" :
    `<div class="why ${picked === correctPos ? "ok" : "bad"}"><strong>${picked === correctPos ? tx("correct") : tx("incorrect")}</strong> ${q.why[lang]}</div>
     <button id="next" class="primary block">${pos === run.length - 1 ? tx("seeResult") : tx("next")}</button>`;

  area.innerHTML = `
    <div class="meta"><span>${tx("question", { a: fmt(pos + 1), b: fmt(run.length) })}</span><span class="tag">${UI[q.cat][lang]}</span></div>
    <div class="bar"><div style="width:${((pos + (picked !== null ? 1 : 0)) / run.length) * 100}%"></div></div>
    <div class="qwrap${q.sign ? " has-sign" : ""}">
      ${q.sign ? `<div class="sign">${q.sign}</div>` : ""}
      <div><h2 class="q">${q.q[lang]}</h2><div class="opts">${opts}</div></div>
    </div>
    ${feedback}`;

  document.querySelectorAll<HTMLButtonElement>(".opt").forEach(b =>
    b.addEventListener("click", () => pickAnswer(Number(b.dataset.i))));
  const next = document.getElementById("next");
  if (next) next.addEventListener("click", () => {
    picked = null; pos++;
    if (pos < run.length) renderQuiz(); else { view = "result"; renderQuiz(); }
  });
}

function pickAnswer(i: number): void {
  if (picked !== null) return;
  picked = i;
  const { q, order } = run[pos];
  const ok = i === order.indexOf(q.answer);
  store.attempts++;
  if (ok) { score++; store.correct++; store.wrong = store.wrong.filter(id => id !== q.id); }
  else { runWrong++; if (!store.wrong.includes(q.id)) store.wrong.push(q.id); }
  save();
  renderQuiz();
}

function renderResult(): void {
  const p = Math.round((score / run.length) * 100);
  if (p > store.best) { store.best = p; save(); }
  const msg = p >= 80 ? tx("msgHigh") : p >= 60 ? tx("msgMid") : tx("msgLow");
  $("quiz-area").innerHTML = `
    <div class="result">
      <div class="ring" style="--p:${p}"><span>${pct(p)}</span></div>
      <p class="score">${tx("score", { a: fmt(score), b: fmt(run.length) })}</p>
      <p>${msg}</p>
      ${runWrong ? `<p class="note">${tx("weakSaved", { n: fmt(runWrong) })}</p>` : ""}
      <button id="again" class="primary">${tx("again")}</button>
    </div>`;
  $("again").addEventListener("click", startQuiz);
}

// ---------- Practical checklist ----------
function renderPractical(): void {
  $("practical-area").innerHTML = PRACTICAL.map((g, gi) => {
    const done = g.items.filter((_, ii) => store.checks[`${gi}-${ii}`]).length;
    return `<section class="card">
      <div class="card-head"><h3>${g.title[lang]}</h3><span class="chip">${fmt(done)}/${fmt(g.items.length)}</span></div>
      ${g.items.map((it, ii) => {
        const key = `${gi}-${ii}`;
        return `<label class="check"><input type="checkbox" data-key="${key}" ${store.checks[key] ? "checked" : ""}/><span>${it[lang]}</span></label>`;
      }).join("")}
    </section>`;
  }).join("");
  document.querySelectorAll<HTMLInputElement>("#practical-area input").forEach(c =>
    c.addEventListener("change", () => { store.checks[c.dataset.key as string] = c.checked; save(); renderPractical(); }));
}

// ---------- Plan ----------
function renderPlan(): void {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });
  const months = lang === 1 ? "نومبر" : "Nov";
  $("plan-area").innerHTML = PLAN.map((p, i) => {
    const title = i === PLAN.length - 1 ? tx("testDay") : tx("day", { n: fmt(i + 1) });
    const dd = Number(p.date.slice(8));
    return `<label class="check plan ${p.date === today ? "today" : ""}">
      <input type="checkbox" data-date="${p.date}" ${store.planDone[p.date] ? "checked" : ""}/>
      <span><strong>${title}</strong> <small>${fmt(dd)} ${months}</small><br/>${p.task[lang]}</span>
    </label>`;
  }).join("");
  document.querySelectorAll<HTMLInputElement>("#plan-area input").forEach(c =>
    c.addEventListener("change", () => { store.planDone[c.dataset.date as string] = c.checked; save(); }));
}

// ---------- Progress ----------
function renderProgress(): void {
  const acc = store.attempts ? Math.round((store.correct / store.attempts) * 100) : 0;
  const items = Object.values(store.checks).filter(Boolean).length;
  const total = PRACTICAL.reduce((n, g) => n + g.items.length, 0);
  const stat = (v: string, k: string): string => `<div class="stat"><b>${v}</b><span>${tx(k)}</span></div>`;
  $("progress-area").innerHTML = `
    <div class="stats">
      ${stat(fmt(store.attempts), "solved")}
      ${stat(pct(acc), "accuracy")}
      ${stat(pct(store.best), "best")}
      ${stat(`${fmt(items)}/${fmt(total)}`, "checklist")}
      ${stat(fmt(store.wrong.length), "weakCount")}
    </div>
    <button id="reset" class="ghost">${tx("reset")}</button>`;
  $("reset").addEventListener("click", () => {
    if (confirm(tx("resetConfirm"))) { store = defaultStore(); save(); view = "idle"; renderAll(); }
  });
}

// ---------- Init ----------
function renderAll(): void {
  renderCountdown();
  renderQuiz();
  renderPractical();
  renderPlan();
  if (currentTab === "progress") renderProgress();
}

function init(): void {
  lang = lsGet(LANG_KEY) === "1" ? 1 : 0;
  const saved = lsGet(THEME_KEY);
  applyTheme(saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  document.querySelectorAll<HTMLButtonElement>(".tabs button").forEach(b =>
    b.addEventListener("click", () => showTab(b.dataset.tab as string)));
  $("start").addEventListener("click", startQuiz);
  $("lang").addEventListener("click", toggleLang);
  $("theme").addEventListener("click", toggleTheme);
  applyLang();
  renderAll();
  setInterval(renderCountdown, 60_000);
  showTab("quiz");
}
document.addEventListener("DOMContentLoaded", init);
