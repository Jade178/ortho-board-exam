# Ortho On-Call Schedule

A shared web app for building the monthly **night on-call roster** (16:00 → 08:00
next day) for the orthopedic department. Each doctor signs in with Google, claims
**3 preferred nights in priority order** (1st/2nd/3rd), and everyone sees the calendar update in real time.
Admins resolve conflicts and auto-fill the rest under a seniority-based quota,
then lock and print/export the month. Each doctor can push their own nights to
their Google Calendar.

No build step — plain HTML/CSS/JS. Backend is Firebase (Google Auth + Firestore).

## How the schedule works

- **One doctor per night.** A 31-day month has 31 nights.
- **Seniority quota.** Roster order = seniority (top = most senior). Everyone does
  `floor(nights ÷ active doctors)` nights; the leftover nights go to the most
  **junior** doctors, bottom-up (+1 each). Seniors do at least one fewer.
  - *July 2026:* 31 nights ÷ 13 active (Ake absent) = 2 each, remainder 5 → the 5
    most-junior active doctors (Nick, June, Boom, Jade, Iaim) do 3, the rest do 2.
- **Each doctor picks 3 nights, ranked 1st/2nd/3rd.** Admin auto-fill is staged: 1st
  priorities first (resolve same-day conflicts), then 2nd, then 3rd, then a fairness
  fill for any leftover nights up to each doctor's quota.
- **Fairness in auto-fill:** even spread of weekends + Thai public holidays
  (entered manually, counted like weekends), per-doctor blackout dates respected,
  and back-to-back nights discouraged (soft).
- **Conflicts** (two doctors pick the same date) are flagged; an admin resolves
  them manually (coin toss offline, then record the winner).
- **Swaps** are done verbally, then an admin edits the assignment in Manual edit mode.
- **Timeline:** claims open early; admin finalizes around the **20th of the
  previous month** (set the deadline in Admin tools).

## Demo mode (no setup)

Open `index.html` with any static server — with no `firebase-config.js` present it
runs in **demo (mock) mode**: pick any name to "sign in", and data is stored in
your browser (`localStorage`). Great for trying the workflow.

```bash
# from this folder
python -m http.server 8000      # then open http://localhost:8000
```

Run the logic tests by opening `test.html`.

## Going live (Firebase) — admin one-time setup

1. **Create a Firebase project** at <https://console.firebase.google.com> (your Google account).
2. **Authentication → Sign-in method → enable Google.**
3. **Firestore Database → Create** (production mode). Open the **Rules** tab,
   paste the contents of [`firestore.rules`](firestore.rules), and **Publish**.
4. **Google Calendar API:** in the linked Google Cloud project
   (console.cloud.google.com → same project) → *APIs & Services* → enable
   **Google Calendar API**, and on the **OAuth consent screen** add the scope
   `.../auth/calendar.events`.
5. **Web app config:** Firebase → Project settings → *Your apps* → Web → copy the
   config. `cp firebase-config.example.js firebase-config.js` and paste it in.
   (`firebase-config.js` is git-ignored.)
6. **Host it:** either
   - **Firebase Hosting:** `npm i -g firebase-tools && firebase init hosting && firebase deploy`
     (its domain is auto-authorized for sign-in), or
   - **GitHub Pages:** push this folder, then add the Pages domain under
     Firebase → Authentication → Settings → **Authorized domains**.
7. **Seed the roster:** first run writes nothing server-side automatically. Easiest
   path — temporarily run in demo mode is browser-only; for live, add doctors via
   the **Admin tools → Roster** table after you're bootstrapped as admin (next step),
   or pre-create `doctors/<id>` docs in the console using `roster.js` as the source
   of truth (fields: `name, rank, isAdmin, email, absentMonths`).

### Bootstrapping the first admin

Security rules use a `members/{uid}` map and **never let a user self-grant admin**.
So after the first admin (e.g. Jade) signs in once:

1. In Firestore, open `members/<their-uid>` (created on first sign-in).
2. Set `isAdmin: true`. Publish.

That doctor now has Admin tools and can promote others from the Roster table
(toggling the Admin checkbox mirrors to their `members` doc automatically).

## Files

| File | Role |
|---|---|
| `index.html` | Shell; loads Firebase SDK + app scripts |
| `roster.js` | **Seed roster** — edit to change names / seniority / admins / absences |
| `schedule.js` | Pure quota + auto-fill logic (no DOM; tested by `test.html`) |
| `store.js` | Data layer: mock (demo) + Firestore backends, real-time subscribe |
| `calendar.js` | Google Calendar push (per-user) |
| `app.js` | UI: sign-in, calendar, claim panel, admin tools |
| `style.css` | Styling + print layout |
| `firestore.rules` | Security rules (paste into Firebase) |
| `firebase-config.example.js` | Template for your Firebase keys |
| `test.html` | Logic test harness |

## Adding doctors later

Edit `roster.js` (for a fresh seed) or use **Admin tools → Roster → Add doctor**
(added as most-junior; reorder with ↑/↓). Mark a doctor absent for a specific
month with the "Absent this month" checkbox — they're excluded from that month's
quota (e.g. Ake in Jul–Aug 2026).
