## Demo — dostęp testowy

**Live demo:** https://biblioteka.effathagliwice.pl/

| Rola | URL | Login |
|------|-----|-------|
| Użytkownik | `/user-login` | hasło: `demo_user_202#` |
| Admin | `/login` | email: `demo@example.com`, hasło: `demo_admin_202#` |

### Uruchomienie lokalnie
1. `npm install`
2. Skopiuj `.env.example` → `.env`
3. Uzupełnij zmienne w `.env`:
   - `VITE_SUPABASE_URL` i `VITE_SUPABASE_KEY` — Supabase Dashboard → **Settings → API**
   - `VITE_SUPABASE_EMAIL` — email konta admina w Supabase Auth (Authentication → Users)
   - `VITE_USER_PASSWORD` — hasło do logowania użytkownika (dowolne, ustawiasz sam)
4. `npm run dev`