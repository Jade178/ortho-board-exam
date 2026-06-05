'use strict';

/*
 * UI for the ortho on-call schedule. Re-renders #app on any state change
 * (small, like the ortho-exam app). All interactions go through data-action
 * attributes handled by delegated listeners. Backend is provided by Store
 * (mock in demo, Firestore when configured).
 */
(function () {

  // ── state ──────────────────────────────────────────────────────────────────
  const App = {
    user: null,
    doctors: [],
    month: initialMonth(),
    schedule: { month: initialMonth(), holidays: [], quotas: {}, status: 'open', deadline: '' },
    claims: {},
    assignments: {},
    editMode: false,
    holidayMode: false,
    blackoutMode: false,  // doctor drags across the calendar to paint blackout days
    adminOpen: false,   // keep admin panel open across re-renders
    boView: null,       // Set of docIds whose blackout shows in the admin overview (null = all active)
    boEditDoc: '',      // docId the admin is editing blackout for in the overview
    subs: { schedule: null, claims: null, assignments: null },
  };

  // ── month helpers ────────────────────────────────────────────────────────
  function ym(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
  function addMonths(month, n) { const [y, m] = month.split('-').map(Number); return ym(new Date(y, m - 1 + n, 1)); }
  function defaultMonth() { return addMonths(ym(new Date()), 1); } // next month (planning is done ~20th prior)
  // A page can fix its starting month via window.INITIAL_MONTH or ?month=YYYY-MM
  // (e.g. august.html). The header dropdown still switches months freely.
  function initialMonth() {
    if (typeof window !== 'undefined') {
      if (/^\d{4}-\d{2}$/.test(window.INITIAL_MONTH || '')) return window.INITIAL_MONTH;
      const q = new URLSearchParams(window.location.search).get('month');
      if (/^\d{4}-\d{2}$/.test(q || '')) return q;
    }
    return defaultMonth();
  }
  function monthLabel(month) { const [y, m] = month.split('-').map(Number); return new Date(y, m - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' }); }
  function dayOfDateKey(k) { return Number(k.slice(-2)); }

  // ── misc helpers ─────────────────────────────────────────────────────────
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function docName(id) { const d = App.doctors.find(x => x.id === id); return d ? d.name : id; }
  function me() {
    if (!App.user) return null;
    const byUid = App.doctors.find(d => d.uid === App.user.uid);
    if (byUid) return byUid;
    const email = (App.user.email || '').toLowerCase();
    return App.doctors.find(d => d.email && d.email.toLowerCase() === email) || null;
  }
  function isAdmin() { const m = me(); return !!(m && m.isAdmin); }
  function isLocked() { return App.schedule.status === 'locked'; }
  function activeDoctors() { return Schedule.activeDoctors(App.doctors, App.month); }
  function quotas() { return Schedule.computeQuotas(App.doctors, App.month, Schedule.daysInMonth(App.month)); }
  function holidaySet() { return new Set(App.schedule.holidays || []); }

  // ── day-of-week / preference helpers ────────────────────────────────────────
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // 0..6
  const WEEKDAY_DOWS = [1, 2, 3, 4, 5];   // Mon–Fri
  const WEEKEND_DOWS = [6, 0];            // Sat, Sun
  function prefWeekdays(d) { return (d && d.prefWeekdays) || []; }
  function prefWeekend(d) { return d && (d.prefWeekend === 0 || d.prefWeekend) ? d.prefWeekend : null; }
  function formatPrefs(d) {
    const wd = prefWeekdays(d).slice().sort((a, b) => a - b).map(n => DOW[n]);
    const we = prefWeekend(d);
    const parts = [];
    if (wd.length) parts.push(wd.join(', '));
    if (we !== null) parts.push(DOW[we]);
    return parts.length ? parts.join(' · ') : '—';
  }
  // map of docId -> { weekdays:[dow], weekend:dow } for autofill nudging
  function prefByDoc() {
    const out = {};
    App.doctors.forEach(d => {
      const we = prefWeekend(d);
      if (prefWeekdays(d).length || we !== null) out[d.id] = { weekdays: prefWeekdays(d), weekend: we };
    });
    return out;
  }

  // ── ranked picks helpers ────────────────────────────────────────────────────
  const PRIO = ['1st', '2nd', '3rd'];
  function picksOfDoc(id) { return (App.claims[id] && Array.isArray(App.claims[id].picks)) ? App.claims[id].picks.slice() : []; }
  function takenDays() { return new Set(Object.keys(App.assignments).map(k => Number(k.slice(-2)))); }
  function priorityConflicts() { return Schedule.allPriorityConflicts(App.claims, 3, takenDays()); }
  // day -> [{ id, level }] across all doctors' picks
  function demandByDay() {
    const out = {};
    Object.keys(App.claims).forEach(id => {
      Schedule.picksOf(App.claims[id]).forEach((day, i) => { (out[day] = out[day] || []).push({ id, level: i + 1 }); });
    });
    return out;
  }

  // admin availability-overview doctor selection (null = all active)
  function boViewSet() {
    if (App.boView === null) return new Set(activeDoctors().map(d => d.id));
    return new Set(App.boView);
  }
  function toggleBoView(id, on) {
    const s = boViewSet();
    on ? s.add(id) : s.delete(id);
    App.boView = [...s];
    render();
  }

  let toastTimer = null;
  function toast(msg, isErr) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.className = 'show' + (isErr ? ' err' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.className = ''; }, 3200);
  }

  // ── lightweight choice menu (promise) ──────────────────────────────────────
  function chooseMenu(title, items) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;z-index:60;padding:16px;';
      const box = document.createElement('div');
      box.style.cssText = 'background:#fff;border-radius:12px;max-width:360px;width:100%;max-height:80vh;overflow:auto;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.25);';
      box.innerHTML = '<h3 style="margin-top:0">' + esc(title) + '</h3>';
      const list = document.createElement('div');
      list.style.cssText = 'display:flex;flex-direction:column;gap:6px;margin:10px 0;';
      items.forEach(it => {
        const b = document.createElement('button');
        b.className = 'btn' + (it.danger ? ' danger' : '');
        b.style.textAlign = 'left';
        b.textContent = it.label;
        b.onclick = () => { document.body.removeChild(ov); resolve(it.value); };
        list.appendChild(b);
      });
      box.appendChild(list);
      const cancel = document.createElement('button');
      cancel.className = 'btn ghost'; cancel.textContent = 'Cancel';
      cancel.onclick = () => { document.body.removeChild(ov); resolve(undefined); };
      box.appendChild(cancel);
      ov.appendChild(box);
      ov.onclick = e => { if (e.target === ov) { document.body.removeChild(ov); resolve(undefined); } };
      document.body.appendChild(ov);
    });
  }

  // ── subscriptions ──────────────────────────────────────────────────────────
  function selectMonth(month) {
    App.month = month;
    Object.values(App.subs).forEach(u => u && u());
    Store.ensureMonth(month);
    App.subs.schedule = Store.subscribeSchedule(month, s => { App.schedule = s || App.schedule; render(); });
    App.subs.claims = Store.subscribeClaims(month, c => { App.claims = c || {}; render(); });
    App.subs.assignments = Store.subscribeAssignments(month, a => { App.assignments = a || {}; render(); });
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════════════════════════════
  function render() {
    const app = document.getElementById('app');
    if (!App.user) { app.innerHTML = renderSignIn(); return; }
    if (!me()) { app.innerHTML = renderHeader() + '<div class="wrap">' + renderBindIdentity() + '</div>'; return; }
    // Live mode: make sure the rules' members/{uid} map exists (once).
    if (Store.MODE === 'firestore' && !App._membershipEnsured) {
      App._membershipEnsured = true;
      Store.ensureMembership(me().id, App.user.uid);
    }
    app.innerHTML =
      renderHeader() +
      '<div class="wrap">' +
        (isAdmin() ? renderAdmin() : '') +
        renderSummary() +
        renderCalendar() +
        (isAdmin() && (App.editMode || App.holidayMode) ? '' : renderClaimPanel()) +
        renderCounts() +
      '</div>';

    // Remember whether the admin panel is open so store-driven re-renders
    // (e.g. after each edit) don't keep collapsing it.
    const det = app.querySelector('details.admin');
    if (det) det.addEventListener('toggle', () => { App.adminOpen = det.open; });
  }

  function renderSignIn() {
    const demo = Store.MODE === 'mock';
    let inner;
    if (demo) {
      const opts = App.doctors.map(d => '<option value="' + d.id + '">' + esc(d.name) + (d.isAdmin ? ' (Admin)' : '') + '</option>').join('');
      inner =
        '<p class="muted">Demo mode — no Google account needed. Pick who you are to try the app.</p>' +
        '<div class="row" style="justify-content:center">' +
          '<select id="asWho">' + opts + '</select>' +
          '<button class="btn primary" data-action="signin-as">Sign in</button>' +
        '</div>';
    } else {
      inner =
        '<p class="muted">Sign in with your Google account to view and claim your on-call nights.</p>' +
        '<button class="gbtn" data-action="signin-google">' +
          '<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.4 5.9 2.6 13.7l7.8 6c1.9-5.6 7.1-9.7 13.6-9.7z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.2-3.9 6.2-9.6 6.2-17z"/><path fill="#FBBC05" d="M10.4 28.3c-.5-1.4-.8-2.9-.8-4.3s.3-3 .8-4.3l-7.8-6C1 16.7 0 20.2 0 24s1 7.3 2.6 10.3l7.8-6z"/><path fill="#34A853" d="M24 47.5c6.2 0 11.4-2 15.2-5.5l-7.1-5.5c-2 1.3-4.6 2.1-8.1 2.1-6.5 0-11.7-4.1-13.6-9.7l-7.8 6C6.4 42.1 14.6 47.5 24 47.5z"/></svg>' +
          'Sign in with Google</button>';
    }
    return '<div class="signin"><div class="brand" style="font-size:1.5rem;margin-bottom:6px">Ortho On-Call Schedule</div>' +
      '<div class="card">' + inner + '</div>' +
      '<p class="small muted">Night duty 16:00 → 08:00. ' + (demo ? '<span class="pill demo">DEMO</span>' : '') + '</p></div>';
  }

  function renderBindIdentity() {
    const unbound = App.doctors.filter(d => !d.uid);
    const opts = unbound.map(d => '<option value="' + d.id + '">' + esc(d.name) + '</option>').join('');
    return '<div class="card"><h2>Welcome — who are you?</h2>' +
      '<p class="muted">Your Google account (' + esc(App.user.email || '') + ') isn\'t linked to a doctor yet. Pick your name to link it.</p>' +
      '<div class="row"><select id="bindWho">' + opts + '</select>' +
      '<button class="btn primary" data-action="bind-identity">This is me</button></div></div>';
  }

  function renderHeader() {
    const m = me();
    const demo = Store.MODE === 'mock' ? '<span class="pill demo">DEMO</span>' : '';
    const months = [];
    for (let i = -1; i <= 7; i++) months.push(addMonths(ym(new Date()), i));
    const opts = months.map(mo => '<option value="' + mo + '"' + (mo === App.month ? ' selected' : '') + '>' + monthLabel(mo) + '</option>').join('');
    return '<header class="app"><div class="wrap row">' +
      '<div class="brand">Ortho On-Call ' + demo + '<br><small>Night duty 16:00 → 08:00</small></div>' +
      '<div class="spacer"></div>' +
      '<select data-action="select-month">' + opts + '</select>' +
      '<span class="pill ' + (isLocked() ? 'locked">LOCKED' : 'open">OPEN') + '</span>' +
      (m ? '<span class="pill' + (m.isAdmin ? ' admin' : '') + '">' + esc(m.name) + (m.isAdmin ? ' · Admin' : '') + '</span>' : '') +
      '<button class="btn sm" data-action="signout">Sign out</button>' +
      '</div></header>';
  }

  function renderSummary() {
    const m = me();
    const q = quotas();
    const myQuota = q[m.id] != null ? q[m.id] : '—';
    const myAssigned = Object.values(App.assignments).filter(a => a.docId === m.id).length;
    const myPicks = picksOfDoc(m.id);
    const filled = Object.keys(App.assignments).length;
    const nights = Schedule.daysInMonth(App.month);
    const conflicts = priorityConflicts().length;
    const deadline = App.schedule.deadline ? new Date(App.schedule.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;
    const absent = (m.absentMonths || []).includes(App.month);
    return '<div class="card"><div class="summary">' +
      '<div class="metric"><div class="n">' + (absent ? '—' : myQuota) + '</div><div class="l">Your quota</div></div>' +
      '<div class="metric"><div class="n">' + myAssigned + '</div><div class="l">Assigned to you</div></div>' +
      '<div class="metric"><div class="n">' + myPicks.length + '/3</div><div class="l">Your priority picks</div></div>' +
      '<div class="metric"><div class="n">' + filled + '/' + nights + '</div><div class="l">Nights filled</div></div>' +
      (conflicts ? '<div class="metric"><div class="n" style="color:#a9770a">' + conflicts + '</div><div class="l">Priority conflicts</div></div>' : '') +
      (deadline ? '<div class="metric"><div class="n" style="font-size:1.1rem">' + deadline + '</div><div class="l">Claim deadline</div></div>' : '') +
      '</div>' +
      (absent ? '<p class="small muted" style="margin:8px 0 0">You are marked absent this month — no nights assigned.</p>' : '') +
      '</div>';
  }

  function renderCalendar() {
    const month = App.month;
    const ndays = Schedule.daysInMonth(month);
    const lead = Schedule.dayOfWeek(month, 1); // 0=Sun
    const hols = holidaySet();
    const m = me();
    const editing = isAdmin() && App.editMode;
    const holidayEditing = isAdmin() && App.holidayMode;
    const absentMe = m && (m.absentMonths || []).includes(month);
    const blackoutActive = App.blackoutMode && !isLocked() && m && !absentMe;
    const myBlackout = new Set((m && App.claims[m.id] && App.claims[m.id].blackout) || []);
    const myPicks = m ? picksOfDoc(m.id) : [];

    // demand: who wants each day, at which priority; conflict days from priorityConflicts()
    const demand = demandByDay();
    const conflictDays = new Set(priorityConflicts().map(c => c.day));

    const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let cells = dows.map(d => '<div class="dow">' + d + '</div>').join('');
    for (let i = 0; i < lead; i++) cells += '<div class="cell empty"></div>';

    for (let day = 1; day <= ndays; day++) {
      const key = Schedule.dateKey(month, day);
      const isHol = hols.has(key);
      const isWknd = Schedule.isWeekendDay(month, day);
      const assigned = App.assignments[key];
      const dayDemand = demand[day] || [];
      const isConflict = conflictDays.has(day) && !assigned;
      const myLevel = myPicks.indexOf(day);     // -1 if not one of my picks
      const mineAssigned = assigned && assigned.docId === m.id;

      const cls = ['cell'];
      if (isHol) cls.push('holiday'); else if (isWknd) cls.push('weekend');
      if (isConflict) cls.push('conflict');
      if (myLevel >= 0 || mineAssigned) cls.push('mine');
      if (myBlackout.has(day)) cls.push('blackout');
      // data-day sits on the cell itself; click actions read it via dataset.
      let action = '';
      if (blackoutActive) { /* painted via pointer drag, no click action */ }
      else if (holidayEditing) { cls.push('clickable'); action = 'data-action="toggle-holiday-day"'; }
      else if (!isLocked()) {
        if (editing) { cls.push('clickable'); action = 'data-action="assign-day"'; }
        else if (!absentMe) { cls.push('clickable'); action = 'data-action="claim-day"'; }
      }

      let body = '';
      if (assigned) {
        body = '<div class="assignee">' + esc(docName(assigned.docId)) +
          ' <span class="src">' + (assigned.source === 'claim' ? '★' : assigned.source === 'admin' ? '✎' : '') + '</span></div>';
      } else if (dayDemand.length) {
        // show who wants the day, with their priority as a superscript
        const names = dayDemand
          .slice().sort((a, b) => a.level - b.level)
          .map(x => '<span class="dem' + (m && x.id === m.id ? ' me' : '') + '">' + esc(docName(x.id)) + '<sup>' + x.level + '</sup></span>')
          .join(' ');
        body = '<div class="claims">' + names + '</div>';
      }
      const dot = isHol ? '<span class="dot hol"></span>' : (isWknd ? '<span class="dot wknd"></span>' : '');
      const myBadge = myLevel >= 0 ? '<span class="pickbadge p' + (myLevel + 1) + '">' + PRIO[myLevel] + '</span>' : '';

      const note = (App.schedule.notes || {})[key];
      cells += '<div class="' + cls.join(' ') + '" data-day="' + day + '" ' + action + '>' +
        '<div class="dnum">' + day + dot + (isHol ? ' <span class="hol">hol</span>' : '') + myBadge + '</div>' +
        body +
        (myBlackout.has(day) ? '<span class="bomark">✕ off</span>' : '') +
        (isConflict ? '<div class="warn">⚠ conflict</div>' : '') +
        (note ? '<div class="daynote" title="' + esc(note) + '">📝 ' + esc(note) + '</div>' : '') +
        '</div>';
    }

    const legend = '<div class="legend no-print" style="margin-top:10px">' +
      '<span><span class="swatch weekend"></span>Weekend</span>' +
      '<span><span class="swatch holiday"></span>Holiday</span>' +
      '<span><span class="swatch conflict"></span>Conflict</span>' +
      '<span><span class="swatch mine"></span>You</span>' +
      '<span><span class="swatch blackout"></span>Your blackout</span>' +
      '<span>★ self-pick · ✎ admin</span></div>';

    const hint = blackoutActive ? '<div class="editbar no-print">Blackout select: drag across the calendar (any direction) to mark days you can\'t work. Drag over marked days to clear them.</div>'
      : holidayEditing ? '<div class="editbar no-print">Holiday mode: click any day to mark / unmark it a holiday (counted like a weekend).</div>'
      : isLocked() ? '<p class="small muted">This month is locked.</p>'
      : editing ? '<div class="editbar no-print">Edit mode: click any day to assign / reassign (use for verbal swaps & conflict fixes).</div>'
      : '<p class="small muted no-print">Click days in order to set your <b>1st, 2nd, 3rd</b> priority nights. Click a picked day to remove it.</p>';

    return '<div class="card"><div class="row"><h2 style="margin:0">' + monthLabel(month) + '</h2>' +
      '<div class="spacer"></div><button class="btn sm no-print" data-action="print">Print</button></div>' +
      hint + '<div class="cal' + (blackoutActive ? ' bo-mode' : '') + '" style="margin-top:8px">' + cells + '</div>' + legend + '</div>';
  }

  function renderClaimPanel() {
    const m = me();
    if ((m.absentMonths || []).includes(App.month)) return '';
    const claim = App.claims[m.id] || {};
    const picks = picksOfDoc(m.id);
    const blackout = (claim.blackout || []).slice().sort((a, b) => a - b);
    const chips = blackout.map(d => '<span class="chip">' + App.month + '-' + String(d).padStart(2, '0') +
      ' <button data-action="remove-blackout" data-day="' + d + '" title="remove">×</button></span>').join('') ||
      '<span class="muted small">none</span>';
    const myDates = Object.keys(App.assignments).filter(k => App.assignments[k].docId === m.id);
    const canSync = Store.MODE === 'firestore' && App.user.accessToken;

    const pickRows = PRIO.map((label, i) => {
      const d = picks[i];
      return '<div class="row pickrow"><span class="prank p' + (i + 1) + '">' + label + '</span>' +
        (d ? '<b>' + App.month + '-' + String(d).padStart(2, '0') + '</b>' +
              (i > 0 ? '<button class="btn sm" data-action="pick-up" data-idx="' + i + '" title="raise priority">↑</button>' : '') +
              '<button class="btn sm" data-action="pick-remove" data-idx="' + i + '">×</button>'
            : '<span class="muted small">click a day above</span>') + '</div>';
    }).join('');

    return '<div class="card claim-panel"><h2>Your picks</h2>' +
      '<p class="small muted">Click days on the calendar to choose your <b>3 preferred nights in priority order</b> (1st, 2nd, 3rd). ' +
      'The admin fills 1st priorities first, then 2nd, then 3rd. Mark days you absolutely cannot work as blackout.</p>' +
      '<div class="subcard">' + pickRows +
      (picks.length ? '<div class="row" style="margin-top:6px"><button class="btn sm" data-action="clear-claim">Clear all picks</button></div>' : '') +
      '</div>' +
      renderWeeklyPref(m) +
      '<div class="subcard"><h3>Blackout days (cannot work)</h3>' +
      '<div class="row" style="margin-bottom:8px"><button class="btn sm ' + (App.blackoutMode ? 'primary' : '') + '" data-action="toggle-blackout-mode">' +
        (App.blackoutMode ? 'Done selecting' : '✎ Select on calendar (drag)') + '</button>' +
        (App.blackoutMode ? '<span class="small muted">Drag across days above — horizontally or vertically — to mark/clear.</span>' : '') + '</div>' +
      '<div class="chips" style="margin-bottom:8px">' + chips + '</div>' +
      '<div class="row"><input type="date" id="blackoutDate" min="' + App.month + '-01" max="' + App.month + '-' + String(Schedule.daysInMonth(App.month)).padStart(2, '0') + '">' +
      '<button class="btn sm" data-action="add-blackout">Add by date</button></div></div>' +
      '<div class="subcard"><h3>Google Calendar</h3>' +
      '<p class="small muted">Add your ' + myDates.length + ' assigned night(s) to your own Google Calendar (16:00 → 08:00).</p>' +
      '<button class="btn" data-action="sync-cal"' + (myDates.length ? '' : ' disabled') + '>Add my nights to Google Calendar</button>' +
      (canSync ? '' : '<p class="small muted" style="margin:6px 0 0">' + (Store.MODE === 'mock' ? 'Calendar sync works in the live (Google sign-in) version.' : 'Sign in with Google to enable.') + '</p>') +
      '</div></div>';
  }

  // Weekly day-of-week preference: 2 weekdays + 1 weekend day.
  function renderWeeklyPref(d) {
    const wd = new Set(prefWeekdays(d));
    const we = prefWeekend(d);
    const wdBoxes = WEEKDAY_DOWS.map(n =>
      '<label class="dowchk"><input type="checkbox" data-action="pref-weekday" data-dow="' + n + '"' +
      (wd.has(n) ? ' checked' : '') + '> ' + DOW[n] + '</label>').join('');
    const weOpts = '<option value="">none</option>' +
      WEEKEND_DOWS.map(n => '<option value="' + n + '"' + (we === n ? ' selected' : '') + '>' + DOW[n] + '</option>').join('');
    return '<div class="subcard"><h3>Preferred days of week</h3>' +
      '<p class="small muted">Pick up to <b>2 weekdays</b> and <b>1 weekend day</b> you\'d rather be on call. ' +
      'Used to help the admin decide and to nudge auto-fill.</p>' +
      '<div class="row"><span class="small muted" style="min-width:70px">Weekdays:</span>' + wdBoxes + '</div>' +
      '<div class="row" style="margin-top:6px"><span class="small muted" style="min-width:70px">Weekend:</span>' +
      '<select data-action="pref-weekend">' + weOpts + '</select>' +
      '<span class="small muted">Currently: <b>' + formatPrefs(d) + '</b></span></div></div>';
  }

  function renderCounts() {
    const q = quotas();
    const counts = {};
    Object.values(App.assignments).forEach(a => { counts[a.docId] = (counts[a.docId] || 0) + 1; });
    const rows = activeDoctors().map(d => {
      const c = counts[d.id] || 0, qd = q[d.id] || 0;
      const over = c > qd;
      return '<div class="c' + (over ? ' over' : '') + '"><span>' + esc(d.name) + '</span><b>' + c + '/' + qd + '</b></div>';
    }).join('');
    return '<div class="card"><h2>Nights per doctor</h2><div class="counts">' + rows + '</div>' +
      '<p class="small muted" style="margin-top:8px">assigned / quota · seniors carry fewer (juniors take the remainder).</p></div>';
  }

  // ── admin panel ────────────────────────────────────────────────────────────
  function renderAdmin() {
    const pconf = priorityConflicts(); // [{day, level, docIds}]
    const conflictHtml = pconf.length
      ? pconf.map(c => '<div class="row" style="margin:4px 0"><span><span class="prank p' + c.level + '">' + PRIO[c.level - 1] + '</span> ' +
          App.month + '-' + String(c.day).padStart(2, '0') + ': ' + c.docIds.map(docName).map(esc).join(', ') +
          '</span><button class="btn sm" data-action="resolve-pconflict" data-day="' + c.day + '" data-level="' + c.level + '">Resolve…</button></div>').join('')
      : '<p class="small muted">No priority conflicts.</p>';

    const hols = (App.schedule.holidays || []).slice().sort();
    const holChips = hols.map(k => '<span class="chip">' + k + ' <button data-action="remove-holiday" data-key="' + k + '">×</button></span>').join('') || '<span class="muted small">none</span>';

    const ndays = Schedule.daysInMonth(App.month);
    const rosterRows = App.doctors.slice().sort((a, b) => a.rank - b.rank).map((d, i, arr) => {
      const absent = (d.absentMonths || []).includes(App.month);
      return '<tr class="' + (absent ? 'absent' : '') + '">' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + esc(d.name) + '</td>' +
        '<td><button class="btn sm" data-action="rank-up" data-doc="' + d.id + '"' + (i === 0 ? ' disabled' : '') + '>↑</button> ' +
            '<button class="btn sm" data-action="rank-down" data-doc="' + d.id + '"' + (i === arr.length - 1 ? ' disabled' : '') + '>↓</button></td>' +
        '<td><input type="checkbox" data-action="toggle-admin" data-doc="' + d.id + '"' + (d.isAdmin ? ' checked' : '') + '></td>' +
        '<td><input type="checkbox" data-action="toggle-absent" data-doc="' + d.id + '"' + (absent ? ' checked' : '') + '></td>' +
        '<td class="small">' + esc(formatPrefs(d)) + '</td>' +
        '<td><button class="btn sm danger" data-action="remove-doctor" data-doc="' + d.id + '">remove</button></td>' +
        '</tr>';
    }).join('');

    const dis = isLocked() ? ' disabled' : '';
    return '<details class="admin no-print"' + (App.adminOpen ? ' open' : '') + '><summary>Admin tools</summary><div class="admin-body">' +
      '<div class="subcard"><h3>Staged auto-fill (by priority)</h3>' +
        '<p class="small muted">Fill 1st priorities, resolve any conflicts, then move to 2nd, then 3rd. ' +
        'Each stage skips conflicting days (resolve them below) and respects quota &amp; blackout.</p>' +
        '<div class="row">' +
          '<button class="btn primary" data-action="autofill-prio" data-level="1"' + dis + '>1️⃣ Auto-fill 1st priorities</button>' +
          '<button class="btn" data-action="autofill-prio" data-level="2"' + dis + '>2️⃣ Auto-fill 2nd</button>' +
          '<button class="btn" data-action="autofill-prio" data-level="3"' + dis + '>3️⃣ Auto-fill 3rd</button>' +
        '</div>' +
        '<div class="row" style="margin-top:8px">' +
          '<button class="btn" data-action="fill-remaining"' + dis + '>Fill remaining by fairness</button>' +
          '<button class="btn" data-action="clear-assignments"' + dis + '>Clear all assignments</button>' +
        '</div></div>' +

      '<div class="row" style="margin-top:12px">' +
        '<button class="btn ' + (App.editMode ? 'primary' : '') + '" data-action="toggle-edit">' + (App.editMode ? 'Done editing' : 'Manual edit mode') + '</button>' +
        '<button class="btn ' + (App.holidayMode ? 'primary' : '') + '" data-action="toggle-holiday-mode">' + (App.holidayMode ? 'Done holidays' : 'Mark holidays') + '</button>' +
        '<div class="spacer"></div>' +
        '<button class="btn ' + (isLocked() ? '' : 'danger') + '" data-action="toggle-lock">' + (isLocked() ? 'Unlock month' : 'Lock month') + '</button>' +
      '</div>' +

      '<div class="subcard"><h3>Priority conflicts to resolve first</h3>' + conflictHtml + '</div>' +

      '<div class="subcard"><h3>Holidays (counted like weekends)</h3>' +
        '<p class="small muted">Click <b>Mark holidays</b> above, then click any day on the calendar to toggle it. Or add by date below.</p>' +
        '<div class="chips" style="margin-bottom:8px">' + holChips + '</div>' +
        '<div class="row"><input type="date" id="holDate" min="' + App.month + '-01" max="' + App.month + '-' + String(ndays).padStart(2, '0') + '">' +
        '<button class="btn sm" data-action="add-holiday">Add holiday</button></div></div>' +

      '<div class="subcard"><h3>Claim deadline</h3>' +
        '<p class="small muted">Recommended: around the 20th of the previous month.</p>' +
        '<input type="date" id="deadlineDate" value="' + (App.schedule.deadline || '') + '" data-action="set-deadline"></div>' +

      renderBlackoutOverview() +

      '<div class="subcard"><h3>Roster &amp; seniority</h3>' +
        '<table class="roster"><thead><tr><th>#</th><th>Name</th><th>Order</th><th>Admin</th><th>Absent this month</th><th>Prefers (wk · wknd)</th><th></th></tr></thead>' +
        '<tbody>' + rosterRows + '</tbody></table>' +
        '<div class="row" style="margin-top:10px"><input type="text" id="newDocName" placeholder="New doctor name">' +
        '<button class="btn sm" data-action="add-doctor">Add doctor (most junior)</button></div></div>' +

      '</div></details>';
  }

  // Admin availability calendar: see each / multiple doctors' blackout days,
  // and (when one doctor is targeted) drag to set that doctor's blackouts.
  function renderBlackoutOverview() {
    const month = App.month;
    const ndays = Schedule.daysInMonth(month);
    const lead = Schedule.dayOfWeek(month, 1);
    const view = boViewSet();
    const editDoc = App.boEditDoc && App.doctors.find(d => d.id === App.boEditDoc);
    const editing = !!editDoc;

    // blackout day -> [docId] (only viewed doctors)
    const byDay = {};
    App.doctors.forEach(d => {
      if (!view.has(d.id)) return;
      ((App.claims[d.id] || {}).blackout || []).forEach(day => { (byDay[day] = byDay[day] || []).push(d.id); });
    });

    const docChecks = App.doctors.slice().sort((a, b) => a.rank - b.rank).map(d =>
      '<label class="dowchk"><input type="checkbox" data-action="bo-view-doctor" data-doc="' + d.id + '"' +
      (view.has(d.id) ? ' checked' : '') + '> ' + esc(d.name) + '</label>').join('');

    const editOpts = '<option value="">— none —</option>' +
      activeDoctors().map(d => '<option value="' + d.id + '"' + (App.boEditDoc === d.id ? ' selected' : '') + '>' + esc(d.name) + '</option>').join('');

    const dows = DOW.map(d => '<div class="dow">' + d + '</div>').join('');
    let cells = dows;
    for (let i = 0; i < lead; i++) cells += '<div class="cell empty"></div>';
    for (let day = 1; day <= ndays; day++) {
      const ids = byDay[day] || [];
      const cls = ['cell', 'mini'];
      if (Schedule.isWeekendDay(month, day) || holidaySet().has(Schedule.dateKey(month, day))) cls.push('weekend');
      const editOff = editing && ((App.claims[App.boEditDoc] || {}).blackout || []).includes(day);
      if (editOff) cls.push('blackout');
      const names = ids.map(id => '<span class="botag' + (editing && id === App.boEditDoc ? ' me' : '') + '">' + esc(docName(id)) + '</span>').join('');
      cells += '<div class="' + cls.join(' ') + '" data-day="' + day + '">' +
        '<div class="dnum">' + day + (ids.length ? ' <b>' + ids.length + '</b>' : '') + '</div>' +
        '<div class="botags">' + names + '</div></div>';
    }

    return '<div class="subcard"><h3>Availability (blackout) overview</h3>' +
      '<p class="small muted">Tick doctors to see their blackout days. To set blackouts for someone, choose them under “Edit” then ' +
      'click or drag across the calendar below.</p>' +
      '<div class="row" style="flex-wrap:wrap;margin-bottom:6px">' + docChecks + '</div>' +
      '<div class="row" style="margin-bottom:8px"><span class="small muted">Edit blackout for:</span>' +
      '<select data-action="bo-edit-doctor">' + editOpts + '</select>' +
      (editing ? '<span class="small muted">Drag on the calendar to mark/clear ' + esc(editDoc.name) + '’s days.</span>' : '') + '</div>' +
      '<div class="cal mini-cal' + (editing ? ' bo-admin bo-mode' : '') + '">' + cells + '</div></div>';
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  ACTIONS
  // ════════════════════════════════════════════════════════════════════════════
  async function handleAction(action, ds) {
    const m = me();
    switch (action) {
      case 'signin-google':
        try { await Store.signInWithGoogle(); } catch (e) { toast(e.message, true); }
        break;
      case 'signin-as':
        Store.mockSignInAs(document.getElementById('asWho').value);
        break;
      case 'signout':
        await Store.signOut(); App.editMode = false;
        break;
      case 'select-month':
        break; // handled in change listener
      case 'bind-identity': {
        const id = document.getElementById('bindWho').value;
        await Store.bindUid(id, App.user.uid, App.user.email);
        await Store.ensureMembership(id, App.user.uid);
        toast('Linked. Welcome, ' + docName(id) + '!');
        break;
      }
      case 'claim-day': {
        if (isLocked()) return;
        const day = Number(ds.day);
        const picks = picksOfDoc(m.id);
        const idx = picks.indexOf(day);
        if (idx >= 0) picks.splice(idx, 1);            // already picked → remove (re-ranks rest)
        else if (picks.length < 3) picks.push(day);    // add as next priority
        else { toast('You already picked 3 days — remove one first.', true); return; }
        await Store.setClaim(App.month, m.id, { picks, blackout: (App.claims[m.id] || {}).blackout || [] });
        break;
      }
      case 'clear-claim':
        await Store.setClaim(App.month, m.id, { picks: [] });
        break;
      case 'pick-up': {
        const i = Number(ds.idx); if (i <= 0) return;
        const picks = picksOfDoc(m.id);
        [picks[i - 1], picks[i]] = [picks[i], picks[i - 1]];
        await Store.setClaim(App.month, m.id, { picks });
        break;
      }
      case 'pick-remove': {
        const picks = picksOfDoc(m.id);
        picks.splice(Number(ds.idx), 1);
        await Store.setClaim(App.month, m.id, { picks });
        break;
      }
      case 'add-blackout': {
        const v = document.getElementById('blackoutDate').value;
        if (!v) return;
        const day = dayOfDateKey(v);
        const bl = new Set((App.claims[m.id] || {}).blackout || []); bl.add(day);
        await Store.setClaim(App.month, m.id, { blackout: [...bl] });
        break;
      }
      case 'remove-blackout': {
        const bl = ((App.claims[m.id] || {}).blackout || []).filter(d => d !== Number(ds.day));
        await Store.setClaim(App.month, m.id, { blackout: bl });
        break;
      }
      case 'sync-cal':
        await syncCalendar();
        break;
      case 'assign-day':
        assignDayDialog(Number(ds.day));
        break;
      case 'resolve-pconflict':
        await resolvePriorityConflict(Number(ds.day), Number(ds.level));
        break;
      case 'autofill-prio':
        await runAutoFillPriority(Number(ds.level));
        break;
      case 'fill-remaining':
        runFillRemaining();
        break;
      case 'clear-assignments':
        if (confirm('Clear all assignments for ' + monthLabel(App.month) + '?')) Store.replaceAssignments(App.month, {});
        break;
      case 'toggle-edit':
        App.editMode = !App.editMode;
        if (App.editMode) { App.holidayMode = false; App.blackoutMode = false; }
        App.adminOpen = true; render();
        break;
      case 'toggle-holiday-mode':
        App.holidayMode = !App.holidayMode;
        if (App.holidayMode) { App.editMode = false; App.blackoutMode = false; }
        App.adminOpen = true; render();
        break;
      case 'toggle-blackout-mode':
        App.blackoutMode = !App.blackoutMode;
        if (App.blackoutMode) { App.editMode = false; App.holidayMode = false; }
        render();
        break;
      case 'toggle-holiday-day': {
        const key = Schedule.dateKey(App.month, Number(ds.day));
        const set = new Set(App.schedule.holidays || []);
        set.has(key) ? set.delete(key) : set.add(key);
        await Store.updateSchedule(App.month, { holidays: [...set] });
        break;
      }
      case 'toggle-lock':
        await Store.updateSchedule(App.month, { status: isLocked() ? 'open' : 'locked' });
        break;
      case 'add-holiday': {
        const v = document.getElementById('holDate').value;
        if (!v) return;
        const set = new Set(App.schedule.holidays || []); set.add(v);
        await Store.updateSchedule(App.month, { holidays: [...set] });
        break;
      }
      case 'remove-holiday': {
        await Store.updateSchedule(App.month, { holidays: (App.schedule.holidays || []).filter(k => k !== ds.key) });
        break;
      }
      case 'rank-up': await moveRank(ds.doc, -1); break;
      case 'rank-down': await moveRank(ds.doc, +1); break;
      case 'remove-doctor':
        if (confirm('Remove ' + docName(ds.doc) + ' from the roster?')) await Store.removeDoctor(ds.doc);
        break;
      case 'add-doctor': {
        const name = (document.getElementById('newDocName').value || '').trim();
        if (!name) return;
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).slice(2, 5);
        const maxRank = Math.max(-1, ...App.doctors.map(d => d.rank));
        await Store.addDoctor({ id, name, rank: maxRank + 1, isAdmin: false, email: '', absentMonths: [] });
        break;
      }
      case 'print': window.print(); break;
    }
  }

  async function moveRank(id, dir) {
    const sorted = App.doctors.slice().sort((a, b) => a.rank - b.rank);
    const i = sorted.findIndex(d => d.id === id);
    const j = i + dir;
    if (j < 0 || j >= sorted.length) return;
    const a = sorted[i], b = sorted[j];
    await Store.updateDoctor(a.id, { rank: b.rank });
    await Store.updateDoctor(b.id, { rank: a.rank });
  }

  // Admin decision dialog for a single date: shows each doctor's relevant info
  // (claimed? matches their weekly preference? blacked out? nights/quota), lets
  // the admin assign or clear, and edit a free-text note for the day.
  function assignDayDialog(day) {
    const month = App.month;
    const key = Schedule.dateKey(month, day);
    const dow = Schedule.dayOfWeek(month, day);
    const isWknd = Schedule.isWeekendDay(month, day) || holidaySet().has(key);
    const q = quotas();
    const counts = {};
    Object.values(App.assignments).forEach(a => { counts[a.docId] = (counts[a.docId] || 0) + 1; });
    const assigned = App.assignments[key];
    const note = (App.schedule.notes || {})[key] || '';

    // candidate ranking: those who picked this day (lower priority # first), then
    // pref match, then most room left
    const cand = activeDoctors().map(d => {
      const pickIdx = picksOfDoc(d.id).indexOf(day);   // 0,1,2 or -1
      const blocked = ((App.claims[d.id] || {}).blackout || []).includes(day);
      const pm = isWknd ? (prefWeekend(d) === dow) : (prefWeekdays(d).indexOf(dow) !== -1);
      const c = counts[d.id] || 0, qd = q[d.id] || 0;
      return { d, pickIdx, blocked, pm, c, qd, room: qd - c };
    }).sort((a, b) => {
      const ap = a.pickIdx < 0 ? 9 : a.pickIdx, bp = b.pickIdx < 0 ? 9 : b.pickIdx;
      return (ap - bp) || (a.blocked - b.blocked) || (b.pm - a.pm) || (b.room - a.room) || (a.c - b.c);
    });

    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;z-index:60;padding:16px;';
    const box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:12px;max-width:520px;width:100%;max-height:86vh;overflow:auto;padding:18px;box-shadow:0 12px 40px rgba(0,0,0,.25);';

    const rows = cand.map(x =>
      '<div class="cand' + (x.blocked ? ' blocked' : '') + '">' +
        '<div class="cinfo"><b>' + esc(x.d.name) + '</b> <span class="small muted">' + x.c + '/' + x.qd + ' nights</span>' +
        '<div class="badges">' +
          (x.pickIdx >= 0 ? '<span class="b claim">' + PRIO[x.pickIdx] + ' priority pick</span>' : '') +
          (x.pm ? '<span class="b pref">matches pref ' + DOW[dow] + '</span>' : '') +
          (x.blocked ? '<span class="b block">BLACKOUT</span>' : '') +
          (x.room <= 0 ? '<span class="b full">at quota</span>' : '') +
        '</div></div>' +
        '<button class="btn sm ' + (assigned && assigned.docId === x.d.id ? 'primary' : '') + '" data-pick="' + x.d.id + '">' +
          (assigned && assigned.docId === x.d.id ? 'assigned' : 'Assign') + '</button>' +
      '</div>').join('');

    box.innerHTML =
      '<h3 style="margin-top:0">' + key + ' · ' + DOW[dow] + (isWknd ? ' (weekend/holiday)' : '') + '</h3>' +
      '<p class="small muted" style="margin:0 0 8px">Pick who is on call. Badges show who wants it / who can\'t. ' +
      'If nobody wants it, use the note to record the decision.</p>' +
      '<div class="cand-list">' + rows + '</div>' +
      '<label class="small muted" style="display:block;margin-top:12px">Admin note for this day</label>' +
      '<textarea id="dayNote" rows="2" style="width:100%;margin-top:4px" placeholder="e.g. nobody available — assigned by rotation; swap agreed with…">' + esc(note) + '</textarea>';

    const actions = document.createElement('div');
    actions.className = 'row'; actions.style.marginTop = '12px';
    actions.innerHTML =
      '<button class="btn" id="saveNote">Save note</button>' +
      (assigned ? '<button class="btn danger" id="clearDay">Clear day</button>' : '') +
      '<div class="spacer"></div><button class="btn ghost" id="closeDlg">Close</button>';
    box.appendChild(actions);
    ov.appendChild(box); document.body.appendChild(ov);

    function close() { document.body.removeChild(ov); }
    function saveNote() {
      const notes = Object.assign({}, App.schedule.notes || {});
      const v = box.querySelector('#dayNote').value.trim();
      if (v) notes[key] = v; else delete notes[key];
      return Store.updateSchedule(month, { notes });
    }
    ov.onclick = e => { if (e.target === ov) close(); };
    box.querySelector('#closeDlg').onclick = close;
    box.querySelector('#saveNote').onclick = () => { saveNote().then(() => { toast('Note saved.'); close(); }); };
    const clr = box.querySelector('#clearDay');
    if (clr) clr.onclick = () => { Store.setAssignment(month, key, null); close(); };
    box.querySelectorAll('[data-pick]').forEach(b => {
      b.onclick = () => { saveNote(); Store.setAssignment(month, key, b.getAttribute('data-pick'), 'admin'); close(); };
    });
  }

  // Resolve a priority conflict: give the day to one claimant. The losers keep
  // their other picks; this date is now taken so a later stage skips it for them.
  async function resolvePriorityConflict(day, level) {
    const c = Schedule.findPriorityConflicts(App.claims, level)[day] || [];
    const items = c.map(id => ({ label: 'Give to ' + docName(id), value: id }));
    const choice = await chooseMenu('Resolve ' + PRIO[level - 1] + ' priority on ' + App.month + '-' + String(day).padStart(2, '0'), items);
    if (!choice) return;
    await Store.setAssignment(App.month, Schedule.dateKey(App.month, day), choice, 'admin');
    toast('Given to ' + docName(choice) + '. Others keep their lower-priority picks.');
  }

  // Stage auto-fill: assign non-conflicting picks at one priority level.
  async function runAutoFillPriority(level) {
    const month = App.month;
    const current = {};
    Object.keys(App.assignments).forEach(k => { current[k] = App.assignments[k].docId; });
    const res = Schedule.autoFillPriority({ doctors: App.doctors, month, claims: App.claims, assignments: current, level });
    const added = Object.keys(res.added);
    for (const k of added) await Store.setAssignment(month, k, res.added[k], 'claim');
    const assignedDays = takenDays();
    const remainingConf = Object.keys(res.conflicts).map(Number).filter(d => !assignedDays.has(d) && !res.added[Schedule.dateKey(month, d)]);
    toast('Stage ' + level + ': assigned ' + added.length + ' ' + PRIO[level - 1] + '-priority night(s)' +
      (remainingConf.length ? '; ' + remainingConf.length + ' conflict(s) to resolve.' : '.'),
      remainingConf.length > 0);
  }

  // Final fairness fill: keep all current assignments, fill any empty nights up
  // to quota, respecting blackout and nudged by weekly preferences.
  function runFillRemaining() {
    const month = App.month;
    const fixed = {};
    Object.keys(App.assignments).forEach(k => { fixed[k] = App.assignments[k].docId; });
    const claims = {};
    Object.keys(App.claims).forEach(id => { claims[id] = { blackout: App.claims[id].blackout || [] }; });

    const res = Schedule.autoFill({ doctors: App.doctors, month, holidays: App.schedule.holidays || [], claims, fixed, prefByDoc: prefByDoc() });
    const detailed = {};
    Object.keys(res.assignments).forEach(k => {
      const docId = res.assignments[k];
      detailed[k] = fixed[k] !== undefined ? { docId, source: (App.assignments[k] || {}).source || 'admin' } : { docId, source: 'auto' };
    });
    Store.replaceAssignments(month, detailed);
    Store.updateSchedule(month, { quotas: res.quotas });
    if (res.unfilled.length) toast(res.unfilled.length + ' day(s) had no eligible doctor (blackout/quota). Assign manually.', true);
    else toast('Filled all remaining nights by fairness.');
  }

  async function syncCalendar() {
    const m = me();
    const token = App.user.accessToken;
    if (!token) { toast('Calendar sync needs Google sign-in (live version).', true); return; }
    const myDates = Object.keys(App.assignments).filter(k => App.assignments[k].docId === m.id).sort();
    if (!myDates.length) { toast('No nights assigned to you yet.', true); return; }
    try {
      toast('Syncing ' + myDates.length + ' nights…');
      const prev = (App.claims[m.id] || {}).calendarEventIds || {};
      const ids = await CalendarSync.sync(token, myDates, prev);
      await Store.setClaim(App.month, m.id, { calendarEventIds: ids });
      toast('Added ' + Object.keys(ids).length + ' nights to your Google Calendar.');
    } catch (e) { toast(e.message, true); }
  }

  // ── delegated event wiring ──────────────────────────────────────────────────
  function wire() {
    const app = document.getElementById('app');
    app.addEventListener('click', e => {
      const t = e.target.closest('[data-action]');
      if (!t) return;
      const action = t.getAttribute('data-action');
      // checkboxes/selects handled by change; ignore their click
      if (t.tagName === 'INPUT' || t.tagName === 'SELECT') return;
      e.preventDefault();
      handleAction(action, t.dataset);
    });
    app.addEventListener('change', e => {
      const t = e.target.closest('[data-action]');
      if (!t) return;
      const action = t.getAttribute('data-action');
      if (action === 'select-month') { selectMonth(t.value); return; }
      if (action === 'toggle-admin') {
        const d = App.doctors.find(x => x.id === t.dataset.doc);
        Store.updateDoctor(t.dataset.doc, { isAdmin: t.checked });
        if (Store.MODE === 'firestore' && d && d.uid) Store.setMemberAdmin(d.uid, t.checked);
        return;
      }
      if (action === 'toggle-absent') {
        const d = App.doctors.find(x => x.id === t.dataset.doc);
        const set = new Set(d.absentMonths || []);
        t.checked ? set.add(App.month) : set.delete(App.month);
        Store.updateDoctor(t.dataset.doc, { absentMonths: [...set] });
        return;
      }
      if (action === 'set-deadline') { Store.updateSchedule(App.month, { deadline: t.value }); return; }
      if (action === 'pref-weekday') {
        const m = me(); if (!m) return;
        const dow = Number(t.dataset.dow);
        const set = new Set(prefWeekdays(m));
        if (t.checked) {
          if (set.size >= 2) { t.checked = false; toast('Pick at most 2 weekdays.', true); return; }
          set.add(dow);
        } else set.delete(dow);
        Store.updateDoctor(m.id, { prefWeekdays: [...set].sort((a, b) => a - b) });
        return;
      }
      if (action === 'pref-weekend') {
        const m = me(); if (!m) return;
        Store.updateDoctor(m.id, { prefWeekend: t.value === '' ? null : Number(t.value) });
        return;
      }
      if (action === 'bo-view-doctor') { toggleBoView(t.dataset.doc, t.checked); return; }
      if (action === 'bo-edit-doctor') { App.boEditDoc = t.value; render(); return; }
    });

    wireBlackoutDrag(app);
  }

  // ── blackout drag-paint ─────────────────────────────────────────────────────
  // In blackout mode, press on a day and drag (any direction) to mark/clear
  // multiple days at once. The first cell decides add-vs-remove (paint), so a
  // drag is consistent; release commits the whole stroke in one write.
  function wireBlackoutDrag(app) {
    let drag = null; // { docId, mode:'add'|'remove', days:Set }
    const SEL = '.cal.bo-mode .cell[data-day]';

    // Which doctor does a cell edit? Admin overview cal targets boEditDoc;
    // the doctor's own calendar targets me().
    function targetDoc(cell) {
      const cal = cell.closest('.cal');
      if (cal && cal.classList.contains('bo-admin')) return App.boEditDoc || null;
      return App.blackoutMode && me() ? me().id : null;
    }
    function cellAt(x, y) {
      const el = document.elementFromPoint(x, y);
      return el ? el.closest(SEL) : null;
    }
    function paint(cell, mode) {
      cell.classList.remove('bo-add', 'bo-remove');
      cell.classList.add(mode === 'add' ? 'bo-add' : 'bo-remove');
    }

    app.addEventListener('pointerdown', e => {
      const cell = e.target.closest(SEL);
      if (!cell) return;
      const docId = targetDoc(cell);
      if (!docId) return;
      e.preventDefault();
      const day = Number(cell.dataset.day);
      const cur = new Set((App.claims[docId] || {}).blackout || []);
      drag = { docId, mode: cur.has(day) ? 'remove' : 'add', days: new Set([day]) };
      paint(cell, drag.mode);
    });

    document.addEventListener('pointermove', e => {
      if (!drag) return;
      const cell = cellAt(e.clientX, e.clientY);
      if (!cell || targetDoc(cell) !== drag.docId) return; // stay within the same calendar/doctor
      const day = Number(cell.dataset.day);
      if (!drag.days.has(day)) { drag.days.add(day); paint(cell, drag.mode); }
    });

    document.addEventListener('pointerup', () => {
      if (!drag) return;
      const cur = new Set((App.claims[drag.docId] || {}).blackout || []);
      drag.days.forEach(d => drag.mode === 'add' ? cur.add(d) : cur.delete(d));
      const arr = [...cur].sort((a, b) => a - b);
      const docId = drag.docId;
      drag = null;
      Store.setClaim(App.month, docId, { blackout: arr }); // re-renders with final state
    });
  }

  // ── boot ────────────────────────────────────────────────────────────────────
  function init() {
    wire();
    Store.subscribeDoctors(docs => {
      App.doctors = (docs || []).slice();
      render();
    });
    Store.onAuth(u => { App.user = u; if (u) selectMonth(App.month); render(); });
    selectMonth(App.month);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
