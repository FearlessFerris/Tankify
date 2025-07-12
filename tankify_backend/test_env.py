from dotenv import load_dotenv
import os
from pathlib import Path

# Explicitly print current file path
current_path = Path(__file__).resolve()
print("📁 Current file path:", current_path)

# Target .env file location
dotenv_path = current_path.parent / ".env"
print("🔍 Looking for .env at:", dotenv_path)

# Check if the file exists
if dotenv_path.exists():
    print("✅ .env file exists")
else:
    print("❌ .env file NOT FOUND")

# Load and test
load_dotenv(dotenv_path)

# Print one variable to test
print("🧪 DB_HOST =", os.getenv("DB_HOST"))
