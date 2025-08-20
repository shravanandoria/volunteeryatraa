This is a simplified version of the https://www.volunteeryatra.com/ platform. 

🚀 Tech Stack
- Frontend: Next.js (TypeScript, App Router)
- Backend: Express.js (TypeScript, Node.js)
- Database: Supabase (PostgreSQL)
- Deployment:
   Backend -> AWS EC2 (Ubuntu, Node.js, PM2, Nginx)
   Frontend -> Vercel

📌 Features
1. Public page showing all volunteer opportunities
2. Create new opportunities (via backend API)
3. Apply to an opportunity (linked via opportunity_id)
4. Search functionality (by title/description/skills), used debouncing and caching to optimise search results
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


🏗 Key Architectural Decisions

1. Separation of Concerns 
    - Kept frontend and backend as independent codebases (in /frontend (volunteeryatra) and /backend) -> ensures modularity and easier deployments.

2. Backend with Express.js
    - Built REST API endpoints (/api/opportunities, /api/applications) instead of letting frontend talk directly to Supabase.
    - This keeps the system secure and mirrors real-world client–server separation.

3. Database Access (Supabase PostgreSQL with raw SQL)
    - Used pg client for raw SQL queries.
    - No ORM -> lighter and gives better control, following the assignment’s constraints.

4. Search Implementation
    - Used PostgreSQL’s ILIKE operator for case-insensitive keyword search across title, description, and skills.
    - API-driven search keeps business logic centralized in backend.
    - used optimisation methods like debouncing and caching to improve search efficiency 

5. Deployment Decisions
    - Backend on AWS EC2 with PM2 + Nginx reverse proxy -> production-ready, scalable.
    - Frontend on Vercel -> optimized for Next.js with minimal config.
    - Environment variables used for flexibility (NEXT_PUBLIC_API_URL).

6. Error Handling & Validation
    - Basic validation in backend (ensuring required fields are present).
    - Error messages returned in JSON -> consistent API responses.


