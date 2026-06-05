'use strict';

/*
 * Data layer. Presents ONE API to app.js with two interchangeable backends:
 *
 *   • mock      — in-memory, persisted to localStorage, "real-time" via local
 *                 listeners + the cross-tab `storage` event. Used automatically
 *                 when no Firebase config is present, so the whole app is
 *                 testable with zero cloud setup.
 *   • firestore — real Google Auth + Cloud Firestore with onSnapshot listeners.
 *                 Used when window.firebaseConfig is defined.
 *
 * Every subscribe* method returns an unsubscribe function.
 *
 * Shapes
 *   doctor      : { id, name, rank, isAdmin, email, uid, absentMonths:[] }
 *   schedule    : { month, holidays:[dateKey], quotas:{docId:n}, status, deadline }
 *   claims      : { docId: { day:int, blackout:[int], calendarEventIds:{dateKey:eventId} } }
 *   assignments : { dateKey: { docId, source:"claim"|"admin"|"auto" } }
 *   user        : { uid, email, name, accessToken|null }
 */
(function (global) {

  const HAS_FIREBASE = !!global.firebaseConfig;
  const MODE = HAS_FIREBASE ? 'firestore' : 'mock';

  // ── tiny emitter ───────────────────────────────────────────────────────────
  function emitter() {
    const fns = new Set();
    return {
      sub(fn) { fns.add(fn); return () => fns.delete(fn); },
      emit(v) { fns.forEach(fn => { try { fn(v); } catch (e) { console.error(e); } }); },
    };
  }
  const defer = fn => setTimeout(fn, 0);

  // ════════════════════════════════════════════════════════════════════════════
  //  MOCK BACKEND
  // ════════════════════════════════════════════════════════════════════════════
  function MockBackend() {
    const LS_KEY = 'callSchedule.v1';
    let db = load();

    function load() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return { doctors: (global.ROSTER || []).map(d => Object.assign({ uid: null }, d)), months: {} };
    }
    function save() {
      try { localStorage.setItem(LS_KEY, JSON.stringify(db)); } catch (e) {}
    }

    const doctorsBus = emitter();
    const monthBus = {}; // month -> { schedule, claims, assignments } emitters
    function busFor(month) {
      if (!monthBus[month]) monthBus[month] = { schedule: emitter(), claims: emitter(), assignments: emitter() };
      return monthBus[month];
    }
    function ensureMonthObj(month) {
      if (!db.months[month]) {
        db.months[month] = {
          schedule: { month, holidays: [], quotas: {}, status: 'open', deadline: '' },
          claims: {}, assignments: {},
        };
      }
      return db.months[month];
    }

    // cross-tab sync
    global.addEventListener('storage', e => {
      if (e.key !== LS_KEY) return;
      db = load();
      doctorsBus.emit(clone(db.doctors));
      Object.keys(monthBus).forEach(m => {
        const mo = db.months[m]; if (!mo) return;
        monthBus[m].schedule.emit(clone(mo.schedule));
        monthBus[m].claims.emit(clone(mo.claims));
        monthBus[m].assignments.emit(clone(mo.assignments));
      });
    });

    function clone(x) { return JSON.parse(JSON.stringify(x)); }

    // auth (simulated)
    let user = null;
    const authBus = emitter();

    return {
      MODE: 'mock',
      // ── auth ──
      onAuth(cb) { defer(() => cb(user)); return authBus.sub(cb); },
      get currentUser() { return user; },
      signInWithGoogle() {
        return Promise.reject(new Error('Google sign-in is unavailable in demo mode. Use "Sign in as…".'));
      },
      mockSignInAs(docId) {
        const d = db.doctors.find(x => x.id === docId);
        user = d
          ? { uid: 'mock-' + d.id, email: d.email || (d.id + '@demo.local'), name: d.name, accessToken: null }
          : { uid: 'mock-guest', email: 'guest@demo.local', name: 'Guest', accessToken: null };
        // bind uid for identity matching
        if (d && !d.uid) { d.uid = user.uid; save(); doctorsBus.emit(clone(db.doctors)); }
        authBus.emit(user);
        return user;
      },
      signOut() { user = null; authBus.emit(null); return Promise.resolve(); },

      // ── doctors ──
      subscribeDoctors(cb) { defer(() => cb(clone(db.doctors))); return doctorsBus.sub(cb); },
      updateDoctor(id, patch) {
        const d = db.doctors.find(x => x.id === id);
        if (d) Object.assign(d, patch);
        save(); doctorsBus.emit(clone(db.doctors)); return Promise.resolve();
      },
      addDoctor(doc) {
        db.doctors.push(Object.assign({ uid: null, isAdmin: false, email: '', absentMonths: [] }, doc));
        save(); doctorsBus.emit(clone(db.doctors)); return Promise.resolve();
      },
      removeDoctor(id) {
        db.doctors = db.doctors.filter(x => x.id !== id);
        save(); doctorsBus.emit(clone(db.doctors)); return Promise.resolve();
      },
      bindUid(docId, uid, email) {
        const d = db.doctors.find(x => x.id === docId);
        if (d) { d.uid = uid; if (email && !d.email) d.email = email; }
        save(); doctorsBus.emit(clone(db.doctors)); return Promise.resolve();
      },
      // membership map is a Firestore-rules concern; no-ops in mock mode
      ensureMembership() { return Promise.resolve(); },
      setMemberAdmin() { return Promise.resolve(); },

      // ── schedule ──
      ensureMonth(month) { ensureMonthObj(month); save(); return Promise.resolve(); },
      subscribeSchedule(month, cb) {
        ensureMonthObj(month);
        defer(() => cb(clone(db.months[month].schedule)));
        return busFor(month).schedule.sub(cb);
      },
      updateSchedule(month, patch) {
        const mo = ensureMonthObj(month);
        Object.assign(mo.schedule, patch);
        save(); busFor(month).schedule.emit(clone(mo.schedule)); return Promise.resolve();
      },

      // ── claims ──
      subscribeClaims(month, cb) {
        ensureMonthObj(month);
        defer(() => cb(clone(db.months[month].claims)));
        return busFor(month).claims.sub(cb);
      },
      setClaim(month, docId, data) {
        const mo = ensureMonthObj(month);
        if (data === null) delete mo.claims[docId];
        else mo.claims[docId] = Object.assign({}, mo.claims[docId], data);
        save(); busFor(month).claims.emit(clone(mo.claims)); return Promise.resolve();
      },

      // ── assignments ──
      subscribeAssignments(month, cb) {
        ensureMonthObj(month);
        defer(() => cb(clone(db.months[month].assignments)));
        return busFor(month).assignments.sub(cb);
      },
      setAssignment(month, dateKey, docId, source) {
        const mo = ensureMonthObj(month);
        if (docId === null) delete mo.assignments[dateKey];
        else mo.assignments[dateKey] = { docId, source: source || 'admin' };
        save(); busFor(month).assignments.emit(clone(mo.assignments)); return Promise.resolve();
      },
      // detailed: { dateKey: { docId, source } } — replaces the whole month
      replaceAssignments(month, detailed) {
        const mo = ensureMonthObj(month);
        mo.assignments = {};
        Object.keys(detailed).forEach(k => {
          mo.assignments[k] = { docId: detailed[k].docId, source: detailed[k].source || 'auto' };
        });
        save(); busFor(month).assignments.emit(clone(mo.assignments)); return Promise.resolve();
      },

      _reset() { localStorage.removeItem(LS_KEY); db = load(); save(); },
    };
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  FIRESTORE BACKEND  (active only when window.firebaseConfig is set)
  // ════════════════════════════════════════════════════════════════════════════
  function FirestoreBackend() {
    firebase.initializeApp(global.firebaseConfig);
    const auth = firebase.auth();
    const fs = firebase.firestore();

    let user = null, accessToken = null;
    const authBus = emitter();
    auth.onAuthStateChanged(u => {
      user = u ? { uid: u.uid, email: u.email, name: u.displayName, accessToken } : null;
      authBus.emit(user);
    });

    function colDoctors() { return fs.collection('doctors'); }
    function docSchedule(month) { return fs.collection('schedules').doc(month); }
    function colClaims(month) { return docSchedule(month).collection('claims'); }
    function colAssign(month) { return docSchedule(month).collection('assignments'); }

    return {
      MODE: 'firestore',
      // ── auth ──
      onAuth(cb) { defer(() => cb(user)); return authBus.sub(cb); },
      get currentUser() { return user; },
      signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar.events');
        return auth.signInWithPopup(provider).then(res => {
          accessToken = res.credential && res.credential.accessToken;
          user = { uid: res.user.uid, email: res.user.email, name: res.user.displayName, accessToken };
          authBus.emit(user);
          return user;
        });
      },
      mockSignInAs() { return Promise.reject(new Error('Not in demo mode.')); },
      signOut() { return auth.signOut(); },

      // ── doctors ──
      subscribeDoctors(cb) {
        return colDoctors().onSnapshot(snap => {
          cb(snap.docs.map(d => Object.assign({ id: d.id }, d.data())));
        });
      },
      updateDoctor(id, patch) { return colDoctors().doc(id).set(patch, { merge: true }); },
      addDoctor(doc) {
        const id = doc.id; const data = Object.assign({}, doc); delete data.id;
        return colDoctors().doc(id).set(data);
      },
      removeDoctor(id) { return colDoctors().doc(id).delete(); },
      bindUid(docId, uid, email) {
        const patch = { uid }; if (email) patch.email = email;
        return colDoctors().doc(docId).set(patch, { merge: true });
      },
      // ensure members/{uid} = { docId, isAdmin:false } exists (rules use it).
      // Never self-grants admin — promote via console (bootstrap) or setMemberAdmin.
      ensureMembership(docId, uid) {
        const ref = fs.collection('members').doc(uid);
        return ref.get().then(s => { if (!s.exists) return ref.set({ docId, isAdmin: false }); });
      },
      setMemberAdmin(uid, isAdmin) {
        return fs.collection('members').doc(uid).set({ isAdmin }, { merge: true });
      },

      // ── schedule ──
      ensureMonth(month) {
        return docSchedule(month).get().then(s => {
          if (!s.exists) return docSchedule(month).set({ month, holidays: [], quotas: {}, status: 'open', deadline: '' });
        });
      },
      subscribeSchedule(month, cb) {
        return docSchedule(month).onSnapshot(s => cb(s.exists ? s.data() : { month, holidays: [], quotas: {}, status: 'open', deadline: '' }));
      },
      updateSchedule(month, patch) { return docSchedule(month).set(patch, { merge: true }); },

      // ── claims ──
      subscribeClaims(month, cb) {
        return colClaims(month).onSnapshot(snap => {
          const out = {}; snap.docs.forEach(d => out[d.id] = d.data()); cb(out);
        });
      },
      setClaim(month, docId, data) {
        if (data === null) return colClaims(month).doc(docId).delete();
        return colClaims(month).doc(docId).set(data, { merge: true });
      },

      // ── assignments ──
      subscribeAssignments(month, cb) {
        return colAssign(month).onSnapshot(snap => {
          const out = {}; snap.docs.forEach(d => out[d.id] = d.data()); cb(out);
        });
      },
      setAssignment(month, dateKey, docId, source) {
        if (docId === null) return colAssign(month).doc(dateKey).delete();
        return colAssign(month).doc(dateKey).set({ docId, source: source || 'admin' });
      },
      replaceAssignments(month, detailed) {
        const batch = fs.batch();
        return colAssign(month).get().then(snap => {
          snap.docs.forEach(d => batch.delete(d.ref));
          Object.keys(detailed).forEach(k => batch.set(colAssign(month).doc(k),
            { docId: detailed[k].docId, source: detailed[k].source || 'auto' }));
          return batch.commit();
        });
      },
    };
  }

  const backend = HAS_FIREBASE ? FirestoreBackend() : MockBackend();
  backend.MODE = MODE;
  global.Store = backend;

})(window);
