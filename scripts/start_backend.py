#!/usr/bin/env python3
"""
Script to start the CodeSage FastAPI backend server
"""
import subprocess
import sys
import os

def main():
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), '..', 'backend')
    os.chdir(backend_dir)
    
    print("Starting CodeSage Backend Server...")
    print("Backend directory:", os.getcwd())
    
    try:
        # Start the FastAPI server with uvicorn
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error starting server: {e}")
        return 1
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        return 0

if __name__ == "__main__":
    sys.exit(main())
