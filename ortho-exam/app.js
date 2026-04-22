'use strict';

const SUBSPECIALTIES = [
  "Trauma", "Spine", "Sports Medicine", "Pediatric",
  "Foot & Ankle", "Hand", "Tumor", "Arthroplasty",
  "Metabolic Bone Disease", "Basic Science"
];

const State = {
  questions: [],
  currentIndex: 0,
  answers: {},
  submitted: false,
  showUnanswered: false,
  screen: "welcome"
};

// ── Persistence ──────────────────────────────────────────────────────────────

function persist() {
  try { sessionStorage.setItem("orthoExam", JSON.stringify(State)); } catch(e) {}
}

function restore() {
  try {
    const raw = sessionStorage.getItem("orthoExam");
    if (!raw) return false;
    Object.assign(State, JSON.parse(raw));
    return true;
  } catch(e) { return false; }
}

// ── Shuffle ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Screen controller ────────────────────────────────────────────────────────

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  State.screen = name;
  window.scrollTo(0, 0);
  persist();
}

// ── Image zoom ───────────────────────────────────────────────────────────────

function setupZoom() {
  const overlay = document.getElementById('image-overlay');
  overlay.addEventListener('click', closeZoom);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZoom(); });
}

function openZoom(src, alt) {
  const overlay = document.getElementById('image-overlay');
  overlay.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt || '';
  overlay.appendChild(img);
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeZoom() {
  document.getElementById('image-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function attachZoom(imgEl) {
  imgEl.addEventListener('click', () => openZoom(imgEl.src, imgEl.alt));
}

// ── Welcome Screen ───────────────────────────────────────────────────────────

function renderWelcome() {
  const el = document.getElementById('screen-welcome');
  el.innerHTML = `
    <div class="welcome-card">
      <span class="welcome-badge">Board Exam Prep</span>
      <h1 class="welcome-title">Orthopedic Surgery<br>Board Exam</h1>
      <p class="welcome-subtitle">Phramongkutklao College of Medicine — Formative Evaluation</p>
      <div class="welcome-info">
        <span class="info-chip">30 Questions</span>
        <span class="info-chip">10 Subspecialties</span>
        <span class="info-chip">Single Best Answer</span>
        <span class="info-chip">No Time Limit</span>
      </div>
      <div class="subspecialty-grid">
        ${SUBSPECIALTIES.map(s => `<div class="sub-item">${s}</div>`).join('')}
      </div>
      <button class="btn-primary" id="btn-start">Start Exam</button>
    </div>
  `;
  document.getElementById('btn-start').addEventListener('click', startExam);
}

// ── Exam Start ───────────────────────────────────────────────────────────────

function startExam() {
  State.questions = shuffle(window.QUESTIONS);
  State.currentIndex = 0;
  State.answers = {};
  State.submitted = false;
  State.showUnanswered = false;
  renderExam(0);
  showScreen('exam');
}

// ── Exam Screen ──────────────────────────────────────────────────────────────

function renderExam(index) {
  State.currentIndex = index;
  const q = State.questions[index];
  const el = document.getElementById('screen-exam');
  const total = State.questions.length;
  const answered = Object.keys(State.answers).length;

  el.innerHTML = `
    <div class="exam-header">
      <span class="badge badge-sub">${q.subspecialty}</span>
      <span class="badge badge-type">${q.questionType}</span>
      <span class="badge-num">Q ${index + 1} / ${total}</span>
    </div>
    <div class="progress-track" id="progress-track"></div>
    <div class="question-card">
      <p class="question-stem">${escHtml(q.stem)}</p>
      ${q.imageFile ? `
        <div class="question-image-wrap">
          <img class="question-image" src="images/${escHtml(q.imageFile)}"
               alt="${escHtml(q.imageCaption || q.imageFile)}"
               title="Tap to enlarge">
          ${q.imageCaption ? `<p class="image-caption">${escHtml(q.imageCaption)}</p>` : ''}
        </div>
      ` : ''}
      <div class="choices-list" id="choices-list"></div>
    </div>
    <div class="exam-nav" id="exam-nav"></div>
  `;

  renderProgress();
  renderChoices(q);
  renderNav(index, total, answered);

  if (q.imageFile) {
    const img = el.querySelector('.question-image');
    if (img) attachZoom(img);
  }
}

function renderProgress() {
  const track = document.getElementById('progress-track');
  if (!track) return;
  track.innerHTML = State.questions.map((q, i) => {
    let cls = 'progress-dot';
    if (i === State.currentIndex) cls += ' current';
    else if (State.answers[q.id] !== undefined) cls += ' answered';
    else if (State.showUnanswered) cls += ' unanswered';
    return `<div class="${cls}" data-idx="${i}" title="Q${i+1}"></div>`;
  }).join('');

  track.querySelectorAll('.progress-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      renderExam(parseInt(dot.dataset.idx));
    });
  });
}

function renderChoices(q) {
  const list = document.getElementById('choices-list');
  if (!list) return;
  const letters = ['A', 'B', 'C', 'D', 'E'];
  list.innerHTML = letters.map(letter => {
    const selected = State.answers[q.id] === letter;
    return `
      <button class="choice-btn${selected ? ' selected' : ''}" data-letter="${letter}">
        <span class="choice-letter">${letter}</span>
        <span>${escHtml(q.choices[letter])}</span>
      </button>
    `;
  }).join('');

  list.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectAnswer(q.id, btn.dataset.letter);
    });
  });
}

function renderNav(index, total, answered) {
  const nav = document.getElementById('exam-nav');
  if (!nav) return;
  const allAnswered = answered >= total;
  nav.innerHTML = `
    <button class="nav-btn" id="btn-prev" ${index === 0 ? 'disabled' : ''}>◀ Prev</button>
    <span class="nav-counter">${answered} / ${total} answered</span>
    <button class="nav-btn" id="btn-next" ${index === total - 1 ? 'disabled' : ''}>Next ▶</button>
    ${allAnswered ? `<button class="btn-submit" id="btn-submit">Submit</button>` : ''}
  `;

  document.getElementById('btn-prev')?.addEventListener('click', () => {
    if (State.currentIndex > 0) renderExam(State.currentIndex - 1);
  });
  document.getElementById('btn-next')?.addEventListener('click', () => {
    if (State.currentIndex < total - 1) renderExam(State.currentIndex + 1);
  });
  document.getElementById('btn-submit')?.addEventListener('click', () => {
    renderConfirm();
    showScreen('confirm');
  });
}

function selectAnswer(questionId, letter) {
  State.answers[questionId] = letter;
  persist();
  const q = State.questions[State.currentIndex];
  renderChoices(q);
  renderProgress();
  renderNav(State.currentIndex, State.questions.length, Object.keys(State.answers).length);
}

// ── Confirm Screen ───────────────────────────────────────────────────────────

function renderConfirm() {
  const total = State.questions.length;
  const answered = Object.keys(State.answers).length;
  const unanswered = total - answered;

  const missing = State.questions
    .map((q, i) => State.answers[q.id] === undefined ? `Q${i + 1}` : null)
    .filter(Boolean);

  const el = document.getElementById('screen-confirm');
  el.innerHTML = `
    <div class="confirm-card">
      <h2 class="confirm-title">Submit Your Exam?</h2>
      <div class="confirm-info">
        <div class="score-big">${answered} / ${total}</div>
        <div>questions answered</div>
        ${unanswered > 0 ? `
          <div class="confirm-warn">⚠ ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}</div>
          <div class="confirm-missing">${missing.join(', ')}</div>
        ` : '<div style="color:var(--correct);font-weight:600;margin-top:6px">✓ All questions answered</div>'}
      </div>
      ${unanswered > 0 ? `<p class="confirm-note">Unanswered questions will be marked incorrect.</p>` : ''}
      <button class="btn-danger" id="btn-confirm-submit">Submit Exam</button>
      <button class="btn-secondary" id="btn-go-back">Go Back to Review</button>
    </div>
  `;

  document.getElementById('btn-confirm-submit').addEventListener('click', submitExam);
  document.getElementById('btn-go-back').addEventListener('click', () => {
    State.showUnanswered = Object.keys(State.answers).length < State.questions.length;
    renderExam(State.currentIndex);
    showScreen('exam');
  });
}

// ── Submit & Results ─────────────────────────────────────────────────────────

function submitExam() {
  State.submitted = true;
  persist();
  renderResults();
  showScreen('results');
}

function calcResults() {
  const bySubspecialty = {};
  SUBSPECIALTIES.forEach(s => { bySubspecialty[s] = { correct: 0, total: 0 }; });
  let total = 0;

  State.questions.forEach(q => {
    bySubspecialty[q.subspecialty].total++;
    if (State.answers[q.id] === q.correct) {
      bySubspecialty[q.subspecialty].correct++;
      total++;
    }
  });

  return { bySubspecialty, total, max: State.questions.length };
}

function getGrade(score, max) {
  const pct = score / max;
  if (pct >= 0.90) return { label: 'Excellent', cls: 'grade-excellent' };
  if (pct >= 0.70) return { label: 'Pass',      cls: 'grade-pass' };
  return              { label: 'Needs Review', cls: 'grade-review' };
}

function renderResults() {
  const { bySubspecialty, total, max } = calcResults();
  const grade = getGrade(total, max);
  const pct = Math.round((total / max) * 100);

  const el = document.getElementById('screen-results');
  el.innerHTML = `
    <div class="results-header">
      <div class="results-title">Exam Results</div>
      <div class="results-score">${total}<span> / ${max}</span></div>
      <div><span class="grade-chip ${grade.cls}">${grade.label}</span></div>
      <div class="results-pct">${pct}%</div>
    </div>
    <div class="results-body">
      <div class="section-title">Section Breakdown</div>
      <table class="breakdown-table">
        <tbody>
          ${SUBSPECIALTIES.map(s => {
            const { correct, totalQ } = { correct: bySubspecialty[s].correct, totalQ: bySubspecialty[s].total };
            const sub = bySubspecialty[s];
            const fillPct = sub.total > 0 ? Math.round((sub.correct / sub.total) * 100) : 0;
            const fillCls = sub.correct === sub.total ? 'perfect' : (sub.correct === 0 ? 'zero' : '');
            return `
              <tr>
                <td>${s}</td>
                <td>${sub.correct}/${sub.total}</td>
                <td><div class="mini-bar-track"><div class="mini-bar-fill ${fillCls}" style="width:${fillPct}%"></div></div></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <div class="section-title">Question Review</div>

      ${SUBSPECIALTIES.map(sub => {
        const qs = State.questions.filter(q => q.subspecialty === sub);
        if (qs.length === 0) return '';
        const correct = qs.filter(q => State.answers[q.id] === q.correct).length;
        return `
          <details class="review-section">
            <summary>
              <span>${sub}</span>
              <span>
                <span class="review-score-chip">${correct}/${qs.length}</span>
              </span>
            </summary>
            <div class="review-cards">
              ${qs.map((q, i) => {
                const userAns = State.answers[q.id];
                const isCorrect = userAns === q.correct;
                const qNum = State.questions.indexOf(q) + 1;
                return `
                  <div class="review-card ${isCorrect ? 'correct-card' : 'wrong-card'}">
                    <div class="review-q-header">
                      <span class="review-q-num">Q${qNum}</span>
                      <span class="review-q-type">${q.questionType}</span>
                      <span class="review-check ${isCorrect ? 'ok' : 'bad'}">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                    </div>
                    <p class="review-stem">${escHtml(q.stem)}</p>
                    ${q.imageFile ? `
                      <div class="review-image-wrap">
                        <img class="review-image" src="images/${escHtml(q.imageFile)}"
                             alt="${escHtml(q.imageCaption || '')}"
                             data-zoomable>
                        ${q.imageCaption ? `<p class="image-caption">${escHtml(q.imageCaption)}</p>` : ''}
                      </div>
                    ` : ''}
                    <div class="review-answer">
                      <div class="answer-line">
                        <span class="answer-label">Your answer: </span>
                        ${userAns
                          ? `<span class="${isCorrect ? 'answer-correct-text' : 'answer-wrong-text'}">${userAns} — ${escHtml(q.choices[userAns])}</span>`
                          : '<span style="color:var(--text-light)">Not answered</span>'
                        }
                      </div>
                      ${!isCorrect ? `
                        <div class="answer-line">
                          <span class="answer-label">Correct answer: </span>
                          <span class="answer-correct-text">${q.correct} — ${escHtml(q.choices[q.correct])}</span>
                        </div>
                      ` : ''}
                    </div>
                    <div class="review-explanation">
                      <span class="explanation-label">Explanation</span>
                      ${escHtml(q.explanation)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </details>
        `;
      }).join('')}

      <div class="retake-wrap">
        <button class="btn-retake" id="btn-retake">Retake Exam</button>
      </div>
    </div>
  `;

  document.getElementById('btn-retake').addEventListener('click', () => {
    sessionStorage.removeItem("orthoExam");
    startExam();
  });

  el.querySelectorAll('[data-zoomable]').forEach(attachZoom);
}

// ── Utility ──────────────────────────────────────────────────────────────────

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// ── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setupZoom();

  const ok = restore();
  if (ok && State.submitted && State.questions.length > 0) {
    renderResults();
    showScreen('results');
  } else if (ok && !State.submitted && State.questions.length > 0) {
    renderExam(State.currentIndex);
    showScreen('exam');
  } else {
    renderWelcome();
    showScreen('welcome');
  }
});
