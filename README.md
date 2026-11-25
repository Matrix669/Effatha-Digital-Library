<h1>Effatha Digital Library</h1>

<p>
  <a href="https://biblioteka.effathagliwice.pl/"><img src="https://img.shields.io/badge/Live_demo-biblioteka.effathagliwice.pl-232526?style=for-the-badge&labelColor=DFDFDF&color=232526" alt="Live demo"></a>
</p>
<p>
  <img src="https://img.shields.io/badge/React_19-232526?style=for-the-badge&logo=react&logoColor=DFDFDF" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-232526?style=for-the-badge&logo=typescript&logoColor=DFDFDF" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-232526?style=for-the-badge&logo=supabase&logoColor=DFDFDF" alt="Supabase">
  <img src="https://img.shields.io/badge/TanStack_Query-232526?style=for-the-badge&logo=reactquery&logoColor=DFDFDF" alt="TanStack Query">
  <img src="https://img.shields.io/badge/Vite-232526?style=for-the-badge&logo=vite&logoColor=DFDFDF" alt="Vite">
  <img src="https://img.shields.io/badge/Netlify-232526?style=for-the-badge&logo=netlify&logoColor=DFDFDF" alt="Netlify">
</p>

A web app for the **Effatha community in Gliwice** to manage its shared book collection. Members browse the catalogue, borrow and reserve books, and an admin manages the collection from a separate panel.

It was my first time building something that felt like a real application end to end. A colleague had vibe-coded a rough prototype and asked me to improve it, so I shipped a working version in a single evening: no polished design or big product plan, just focus on getting it working.

![Main view with the list of books and their statuses](./screnshoot1.png)

## Features

**For members**
- Book list with live statuses: **available**, **reserved** or **borrowed**
- Filtering books by status
- Borrowing and reserving a book from a modal, with the borrower's name and a return date

**For the admin**
- Separate, password-protected admin panel
- Adding new books (title, author) and removing them
- Handling the whole loan flow: confirming a pickup, marking a book as returned and cancelling reservations

<table>
  <tr>
    <td><img src="./screnshoot2.png" alt="Modal for borrowing a book"></td>
    <td><img src="./screnshoot3.png" alt="Modal for reserving a book"></td>
  </tr>
  <tr>
    <td align="center"><sub>Borrowing a book</sub></td>
    <td align="center"><sub>Reserving a book</sub></td>
  </tr>
  <tr>
    <td><img src="./screnshoot4.png" alt="Admin panel login form"></td>
    <td><img src="./screnshoot5.png" alt="Book list in the admin panel"></td>
  </tr>
  <tr>
    <td align="center"><sub>Admin login</sub></td>
    <td align="center"><sub>Admin panel</sub></td>
  </tr>
</table>

![Admin panel: full book list and the form for adding a new book](./screnshoot6.png)

## Tech stack

React 19 · TypeScript · Vite · Supabase (database + auth) · TanStack Query · React Router · Lucide icons · Netlify

## What I learned

- **Business logic is the hard part.** Reservation states, the transitions between them and lots of edge cases ("if it's reserved like this, what happens next?") took more thought than the UI.
- **Supabase + TanStack Query** were new to me. This was my first serious use of both, including designing a simple database schema for books.
- **Auth needs a clear security model.** Access to the main view is password-based and backed by a database account, but some admin authorisation is handled on the client. Today I'd design this differently.

## What's next

I'm planning to rebuild the app in **Next.js** (and maybe as a mobile app), with much better UX, visual design and proper planning from the start.

## Demo access

You can try the [live demo](https://biblioteka.effathagliwice.pl/) with these test accounts:

| Role | URL | Login |
| --- | --- | --- |
| Member | `/user-login` | password: `demo_user_202#` |
| Admin | `/login` | email: `demo@example.com`, password: `demo_admin_202#` |

## Running locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Fill in the variables in `.env`:
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`: Supabase Dashboard → **Settings → API**
   - `VITE_SUPABASE_EMAIL`: email of the admin account in Supabase Auth (Authentication → Users)
   - `VITE_USER_PASSWORD`: the password members use to log in (you choose it)
4. Start the dev server: `npm run dev`

---

<sub>More of my projects → <a href="https://maxtkaczyk.pl"><b>maxtkaczyk.pl</b></a></sub>
