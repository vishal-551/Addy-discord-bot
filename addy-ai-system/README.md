# Addy AI System

Monorepo-style starter platform for the Addy Discord bot ecosystem:

- **Discord bot runtime** in `bot/`
- **FastAPI backend** in `api/`
- **Next.js dashboard** in `dashboard/nextjs-app/`
- **Shared utilities** in `shared/`
- **Workers and data tooling** in `workers/` and `database/`

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run_api.py
```

For the bot:

```bash
python run_bot.py
```
