import { analyzeMessage } from "./rules.js";
import { warningMessage, safeSteps } from "./templates.js";

const $ = (id) => document.getElementById(id);

const sample = `Your parcel is on hold. Pay RM2.99 to release delivery immediately:
http://short-link-example.com

Failure to pay today will return the package.`;

$("loadExample").addEventListener("click", () => {
  $("messageInput").value = sample;
  runAnalysis();
});

$("clearAll").addEventListener("click", () => {
  $("messageInput").value = "";
  renderEmpty();
});

$("analyzeBtn").addEventListener("click", runAnalysis);
$("copyFamilyMessage").addEventListener("click", () => copyText($("familyMessage").innerText));
$("copyShareCard").addEventListener("click", () => copyText($("shareCard").innerText));

function runAnalysis() {
  const text = $("messageInput").value.trim();
  const lang = $("language").value;

  if (!text) {
    renderEmpty("Paste a suspicious message first.");
    return;
  }

  const result = analyzeMessage(text);
  const steps = safeSteps(result);
  const family = warningMessage(result, lang);
  const card = buildShareCard(result, steps, family);

  $("riskLabel").textContent = `${result.level} risk`;
  $("scoreCircle").textContent = result.score;
  $("scoreCircle").className = `score-circle ${scoreClass(result.score)}`;

  $("summary").innerHTML = result.summary;
  renderList("redFlags", result.flags);
  renderList("nextSteps", steps, true);

  $("familyMessage").textContent = family;
  $("shareCard").textContent = card;
}

function renderEmpty(message = "Paste a message and click Check risk.") {
  $("riskLabel").textContent = "Not checked";
  $("scoreCircle").textContent = "--";
  $("scoreCircle").className = "score-circle";
  $("summary").textContent = message;
  $("redFlags").innerHTML = "";
  $("nextSteps").innerHTML = "";
  $("familyMessage").textContent = "A warning message will appear here.";
  $("shareCard").textContent = "Result card will appear here.";
}

function renderList(id, items) {
  const el = $(id);
  el.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

function scoreClass(score) {
  if (score >= 80) return "score-critical";
  if (score >= 60) return "score-high";
  if (score >= 35) return "score-medium";
  return "score-low";
}

function buildShareCard(result, steps, family) {
  return `Family Scam Shield Result

Risk: ${result.level.toUpperCase()} — ${result.score}/100

Why:
${result.flags.map((f) => `- ${f}`).join("\n")}

Do this:
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Message to family:
${family}

Educational tool only. Verify through official channels.`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied.");
  } catch {
    alert("Copy failed. Select the text manually.");
  }
}
