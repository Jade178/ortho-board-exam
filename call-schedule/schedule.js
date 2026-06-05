'use strict';

/*
 * Pure scheduling logic — no DOM, no network. Safe to unit-test in Node or in
 * test.html. Exposes window.Schedule (and module.exports for Node tests).
 *
 * Core concepts
 * -------------
 * month   : "YYYY-MM" string.
 * day     : integer 1..daysInMonth.
 * dateKey : "YYYY-MM-DD" string.
 *
 * Quota (seniority): everyone does `floor(nights / active)`; the leftover
 * `nights % active` nights go to the most-JUNIOR doctors (highest rank), one
 * extra each, bottom-up. Seniors therefore do (at least) one fewer night.
 */
(function (global) {

  // ── Date helpers ──────────────────────────────────────────────────────────

  function parseMonth(month) {
    const [year, m] = month.split('-').map(Number);
    return { year, month: m };
  }

  function daysInMonth(month) {
    const { year, month: m } = parseMonth(month);
    return new Date(year, m, 0).getDate(); // day 0 of next month = last day
  }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function dateKey(month, day) {
    return month + '-' + pad2(day);
  }

  // 0=Sun .. 6=Sat.
  function dayOfWeek(month, day) {
    const { year, month: m } = parseMonth(month);
    return new Date(year, m - 1, day).getDay();
  }

  // Weekend = Sat(6) and Sun(0) only. Friday is a normal weekday.
  function isWeekendDay(month, day) {
    const dow = dayOfWeek(month, day);
    return dow === 6 || dow === 0;
  }

  // ── Roster helpers ────────────────────────────────────────────────────────

  // Active = not absent this month. Sorted senior → junior (rank ascending).
  function activeDoctors(doctors, month) {
    return doctors
      .filter(d => !(d.absentMonths || []).includes(month))
      .slice()
      .sort((a, b) => a.rank - b.rank);
  }

  // Distribute `total` units across active doctors; remainder goes to the most
  // junior (highest rank) first. Returns { docId: count }.
  function distributeByJuniority(active, total) {
    const n = active.length;
    const out = {};
    if (n === 0) return out;
    const base = Math.floor(total / n);
    const remainder = total % n;
    const juniorFirst = active.slice().sort((a, b) => b.rank - a.rank);
    const bonus = new Set(juniorFirst.slice(0, remainder).map(d => d.id));
    active.forEach(d => { out[d.id] = base + (bonus.has(d.id) ? 1 : 0); });
    return out;
  }

  function computeQuotas(doctors, month, nights) {
    return distributeByJuniority(activeDoctors(doctors, month), nights);
  }

  // ── Auto-fill ─────────────────────────────────────────────────────────────

  /*
   * autoFill(opts) → result
   *
   * opts:
   *   doctors  : full roster array
   *   month    : "YYYY-MM"
   *   holidays : ["YYYY-MM-DD", ...]  treated like weekends for fairness
   *   claims   : { docId: { day: <int>, blackout: [<int day>, ...] } }
   *              each doctor's self-picked preferred night + unavailable days
   *   fixed    : { dateKey: docId }   assignments the admin has already locked
   *              (conflict resolutions / manual edits). Highest priority.
   *   rng      : optional () => [0,1) for deterministic tests
   *
   * result:
   *   { assignments: { dateKey: docId },
   *     quotas:      { docId: n },
   *     counts:      { docId: total nights },
   *     weekendCounts:{ docId: weekend nights },
   *     unfilled:    [ dateKey, ... ] }   // dates no eligible doctor could take
   */
  function autoFill(opts) {
    const doctors = opts.doctors;
    const month = opts.month;
    const holidays = new Set(opts.holidays || []);
    const claims = opts.claims || {};
    const fixed = opts.fixed || {};
    const rng = opts.rng || Math.random;
    // optional weekly day-of-week preference: { docId: { weekdays:[dow], weekend:dow } }
    const prefByDoc = opts.prefByDoc || {};

    const ndays = daysInMonth(month);
    const nights = ndays; // one doctor per night
    const active = activeDoctors(doctors, month);
    const activeIds = new Set(active.map(d => d.id));
    const quotas = computeQuotas(doctors, month, nights);

    function weekendish(day) {
      return isWeekendDay(month, day) || holidays.has(dateKey(month, day));
    }

    const weekendDays = [];
    for (let d = 1; d <= ndays; d++) if (weekendish(d)) weekendDays.push(d);
    const weekendTargets = distributeByJuniority(active, weekendDays.length);

    // state
    const assignments = {};            // dateKey -> docId
    const counts = {};                 // docId -> nights
    const weekendCounts = {};          // docId -> weekend nights
    const daysOf = {};                 // docId -> [day,...]
    const blackout = {};               // docId -> Set(day)
    active.forEach(d => {
      counts[d.id] = 0; weekendCounts[d.id] = 0; daysOf[d.id] = [];
      const bl = (claims[d.id] && claims[d.id].blackout) || [];
      blackout[d.id] = new Set(bl);
    });

    function place(day, docId) {
      assignments[dateKey(month, day)] = docId;
      if (counts[docId] === undefined) { // safety for non-active fixed picks
        counts[docId] = 0; weekendCounts[docId] = 0; daysOf[docId] = [];
      }
      counts[docId]++;
      if (weekendish(day)) weekendCounts[docId]++;
      daysOf[docId].push(day);
    }

    const taken = new Set(); // days already assigned

    // 1) Fixed admin assignments win outright.
    Object.keys(fixed).forEach(k => {
      const day = Number(k.slice(-2));
      if (day >= 1 && day <= ndays && !taken.has(day)) {
        place(day, fixed[k]);
        taken.add(day);
      }
    });

    // 2) Honour self-claims where the day is free and doctor is under quota.
    active.forEach(d => {
      const c = claims[d.id];
      if (!c || !c.day) return;
      const day = c.day;
      if (taken.has(day)) return;                       // conflict → admin handles via `fixed`
      if (blackout[d.id].has(day)) return;
      if (counts[d.id] >= quotas[d.id]) return;
      place(day, d.id);
      taken.add(day);
    });

    // 3) Fill the rest. Weekends first (scarcer fairness resource), then weekdays.
    const remaining = [];
    for (let d = 1; d <= ndays; d++) if (!taken.has(d)) remaining.push(d);
    remaining.sort((a, b) => {
      const wa = weekendish(a) ? 0 : 1, wb = weekendish(b) ? 0 : 1;
      return wa - wb || a - b;
    });

    const unfilled = [];
    remaining.forEach(day => {
      const isWknd = weekendish(day);
      let best = null, bestScore = Infinity;
      active.forEach(d => {
        const id = d.id;
        if (counts[id] >= quotas[id]) return;        // hard: quota
        if (blackout[id].has(day)) return;           // hard: blackout

        // soft scoring — lower is better
        const fillRatio = counts[id] / Math.max(1, quotas[id]);
        let score = fillRatio * 100;

        if (isWknd) {
          const debt = weekendCounts[id] - (weekendTargets[id] || 0);
          score += debt * 60;                        // over weekend target → penalised
        }

        // spacing: discourage (but don't forbid) nights close together
        let minGap = Infinity;
        for (const od of daysOf[id]) minGap = Math.min(minGap, Math.abs(od - day));
        if (minGap <= 1) score += 1000;              // back-to-back: strong penalty
        else if (minGap === 2) score += 40;
        else if (minGap === 3) score += 10;

        // weekly preference: nudge toward each doctor's preferred day-of-week
        const pref = prefByDoc[id];
        if (pref) {
          const dow = dayOfWeek(month, day);
          const match = isWknd ? (pref.weekend === dow)
                               : (pref.weekdays && pref.weekdays.indexOf(dow) !== -1);
          if (match) score -= 25;
        }

        score += rng() * 5;                          // tiebreak jitter

        if (score < bestScore) { bestScore = score; best = id; }
      });

      if (best) { place(day, best); taken.add(day); }
      else unfilled.push(dateKey(month, day));
    });

    return { assignments, quotas, counts, weekendCounts, unfilled };
  }

  // ── Ranked picks (1st / 2nd / 3rd priority) ───────────────────────────────

  // a doctor's ranked day picks, holes removed. picks[0] = 1st priority.
  function picksOf(claim) {
    const p = claim && claim.picks;
    return Array.isArray(p) ? p.filter(d => !!d) : [];
  }

  // Conflicts at one priority level (1-based): { day: [docId,...] } with 2+ doctors
  // whose pick at that level is the same day.
  function findPriorityConflicts(claims, level) {
    const byDay = {};
    Object.keys(claims).forEach(id => {
      const day = picksOf(claims[id])[level - 1];
      if (day) (byDay[day] = byDay[day] || []).push(id);
    });
    const out = {};
    Object.keys(byDay).forEach(d => { if (byDay[d].length > 1) out[Number(d)] = byDay[d]; });
    return out;
  }

  // All unresolved conflicts across levels 1..maxLevel, excluding already-taken days.
  // → [{ day, level, docIds:[...] }]
  function allPriorityConflicts(claims, maxLevel, takenDays) {
    const taken = takenDays || new Set();
    const res = [];
    for (let lvl = 1; lvl <= maxLevel; lvl++) {
      const c = findPriorityConflicts(claims, lvl);
      Object.keys(c).forEach(d => { const day = Number(d); if (!taken.has(day)) res.push({ day, level: lvl, docIds: c[day] }); });
    }
    return res;
  }

  // Assign the non-conflicting picks at a single priority level, on top of the
  // current assignments. Conflicting days (2+ doctors want them at this level)
  // are left for the admin to resolve first.
  //
  // opts: { doctors, month, claims, assignments, level }
  //   assignments : { dateKey: docId | {docId} }  (current schedule)
  // → { added: { dateKey: docId }, conflicts: { day:[ids] } }
  function autoFillPriority(opts) {
    const { doctors, month, level } = opts;
    const claims = opts.claims || {};
    const current = opts.assignments || {};
    const active = activeDoctors(doctors, month);
    const quotas = computeQuotas(doctors, month, daysInMonth(month));

    const taken = new Set();
    const counts = {};
    active.forEach(d => { counts[d.id] = 0; });
    Object.keys(current).forEach(k => {
      const docId = current[k] && current[k].docId !== undefined ? current[k].docId : current[k];
      taken.add(Number(k.slice(-2)));
      if (counts[docId] !== undefined) counts[docId]++;
    });

    const conflicts = findPriorityConflicts(claims, level);
    const conflictDays = new Set(Object.keys(conflicts).map(Number));
    const added = {};
    active.forEach(d => {
      const day = picksOf(claims[d.id])[level - 1];
      if (!day || taken.has(day) || conflictDays.has(day)) return;
      if (counts[d.id] >= quotas[d.id]) return;
      const bl = new Set((claims[d.id] && claims[d.id].blackout) || []);
      if (bl.has(day)) return;
      added[dateKey(month, day)] = d.id;
      taken.add(day); counts[d.id]++;
    });
    return { added, conflicts };
  }

  const Schedule = {
    parseMonth, daysInMonth, dateKey, dayOfWeek, isWeekendDay,
    activeDoctors, distributeByJuniority, computeQuotas,
    autoFill, picksOf, findPriorityConflicts, allPriorityConflicts, autoFillPriority,
  };

  global.Schedule = Schedule;
  if (typeof module !== 'undefined' && module.exports) module.exports = Schedule;

})(typeof window !== 'undefined' ? window : globalThis);
