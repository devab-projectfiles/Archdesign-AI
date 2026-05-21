# ArchDesign AI - Multi-Agent System Design Generator

An AI-powered application that generates comprehensive system architectures and system designs based on user requirements. The system leverages a multi-agent crew (analyst, engineer, reviewer) powered by **CrewAI** and **Gemini 2.5 Flash**, orchestrating them to collaborate, design, and refine architectural blueprints.

## Repository Architecture

This repository is organized as a monorepo containing both the frontend and backend applications:

```text
Archdesign_using_agents/ (Monorepo Root)
├── frontend/             # React + Vite frontend application (Vercel)
│   ├── src/              # React components, routing, and api services
│   └── package.json      # Frontend package manifest
├── src/                  # Backend application source (Render)
│   ├── ai_crew/          # CrewAI configuration, agents, tasks, and logic
│   └── backend/          # FastAPI server (API endpoints, routers, and schemas)
├── pyproject.toml        # Python dependencies (managed via uv/pip)
├── .env                  # Global environment variables
└── README.md             # This file
```

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites
- **Python**: `>=3.11`
- **Node.js**: `v18` or higher
- **Gemini API Key**: Obtain a key from the [Google AI Studio](https://aistudio.google.com/)

---

### 1. Backend Setup (FastAPI + CrewAI)

1. Navigate to the root directory (if not already there).
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows (PowerShell):
   .venv\Scripts\Activate.ps1
   # On Windows (Git Bash):
   source .venv/Scripts/activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -e .
   ```
4. Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Start the FastAPI development server:
   ```bash
   uvicorn src.backend.main:app --reload --port 8000
   ```
   The backend API will be available at `http://localhost:8000`, and you can view the interactive API docs at `http://localhost:8000/docs`.

---

### 2. Frontend Setup (React + Vite)

1. Open a new terminal window and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Copy or create the environment variables configuration `.env` inside `frontend/`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

---

## 🌐 Production Deployment

This monorepo is ready to be hosted with **Vercel** (frontend) and **Render** (backend).

### 1. Frontend: Vercel
1. Link your GitHub repository in Vercel.
2. In the **Build & Development Settings**, set the **Root Directory** to `frontend`.
3. Set the environment variable `VITE_API_BASE_URL` to your live Render backend URL.
4. Deploy!

### 2. Backend: Render
1. Create a new **Web Service** on Render and link your GitHub repository.
2. Set the **Root Directory** to the root (`.`) or `src/backend`.
3. Select **Python3** as the runtime.
4. Add the following environment variable under settings:
   - `GEMINI_API_KEY` = *your Gemini key*
5. Use the following build and start commands:
   - **Build Command**: `pip install -e .`
   - **Start Command**: `uvicorn src.backend.main:app --host 0.0.0.0 --port $PORT`
6. Deploy!
