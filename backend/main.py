from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, problems, profile
from errors import APIError, handle_api_error

app = FastAPI(
    title="CodeSage API",
    description="AI-powered coding platform backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(problems.router)
app.include_router(profile.router)
app.add_exception_handler(APIError, handle_api_error)

@app.get("/")
async def root():
    return {"message": "CodeSage API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
