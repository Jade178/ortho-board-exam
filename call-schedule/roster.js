'use strict';

/*
 * Seed roster for the on-call schedule.
 *
 * This is the ONE file to edit to add / remove doctors or change the hierarchy.
 *
 *   rank          : seniority order, 0 = most senior. Juniors (higher rank)
 *                   carry the leftover nights in the monthly quota.
 *   isAdmin       : can resolve conflicts, auto-fill, edit roster, lock months.
 *   email         : the doctor's Gmail. Used to match their Google sign-in to
 *                   this roster entry. Leave "" to let them self-bind on first
 *                   login (admin-approved).
 *   absentMonths  : list of "YYYY-MM" the doctor is unavailable for the whole
 *                   month (e.g. away rotation). They are excluded from quota.
 *
 * Doctors also set, from inside the app (stored here once edited):
 *   prefWeekdays  : up to 2 preferred weekday day-of-week numbers (Mon=1..Fri=5)
 *   prefWeekend   : one preferred weekend day-of-week (Sat=6 or Sun=0), or null
 *   (soft weekly preference — shown to admins and nudges auto-fill)
 *
 * When this seed is loaded into a fresh data store it becomes editable from the
 * admin UI; later edits live in the store, not here.
 */
window.ROSTER = [
  { id: "pong", name: "Pong", rank: 0,  isAdmin: false, email: "", absentMonths: [] },
  { id: "aud",  name: "Aud",  rank: 1,  isAdmin: false, email: "", absentMonths: [] },
  { id: "gere", name: "Gere", rank: 2,  isAdmin: false, email: "", absentMonths: [] },
  { id: "term", name: "Term", rank: 3,  isAdmin: false, email: "", absentMonths: [] },
  { id: "noom", name: "Noom", rank: 4,  isAdmin: false, email: "", absentMonths: [] },
  { id: "modz", name: "Modz", rank: 5,  isAdmin: false, email: "", absentMonths: [] },
  { id: "joe",  name: "Joe",  rank: 6,  isAdmin: false, email: "", absentMonths: [] },
  { id: "parn", name: "Parn", rank: 7,  isAdmin: false, email: "", absentMonths: [] },
  { id: "nick", name: "Nick", rank: 8,  isAdmin: true,  email: "", absentMonths: [] },
  { id: "ake",  name: "Ake",  rank: 9,  isAdmin: false, email: "", absentMonths: ["2026-07", "2026-08"] },
  { id: "june", name: "June", rank: 10, isAdmin: false, email: "", absentMonths: [] },
  { id: "boom", name: "Boom", rank: 11, isAdmin: false, email: "", absentMonths: [] },
  { id: "jade", name: "Jade", rank: 12, isAdmin: true,  email: "jade77638@gmail.com", absentMonths: [] },
  { id: "iaim", name: "Iaim", rank: 13, isAdmin: false, email: "", absentMonths: [] },
];
