This is a simplified version of the https://www.volunteeryatra.com/ platform. 

🚀 Tech Stack
Frontend: Next.js (TypeScript, App Router)
Backend: Express.js (TypeScript, Node.js)
Database: Supabase (PostgreSQL)
Deployment:
  Backend -> AWS EC2 (Ubuntu, Node.js, PM2, Nginx)
  Frontend -> Vercel

📌 Features
1. Public page showing all volunteer opportunities
2. Create new opportunities (via backend API)
3. Apply to an opportunity (linked via opportunity_id)
4. Search functionality (by title/description/skills), used debouncing to cache search results
5. Clean separation: frontend <---> backend <---> database

⚡ API Endpoints
Opportunities
1. GET /api/opportunities -> list all opportunities ( with querying ?search=keyword )
2. POST /api/opportunities -> create opportunity

Applications
POST /api/applications -> apply to opportunity


To run it locally.

BACKEND
1. cd to the backend
2. define the SUPABASE api key and port in the .env file
3. npm install
4. npm run dev / npm start

FRONTEND
1. cd to the volunteeryatra
2. define NEXT_PUBLIC_API_URL in the .env. you have to paste the URL with the port
3. npm install
4. npm run dev


🌍 Deployment
BACKEND
1. Ubuntu EC2 instance with Node.js & PM2
2. Nginx reverse proxy -> maps port 80 -> Express (5001)

🔗 Live Link:- https://volunteeryatraa.vercel.app/


