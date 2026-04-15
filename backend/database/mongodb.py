from pymongo import MongoClient
import os

# Initialize connection string.
# Since this was requested directly via UI, embedding here. But typical protocol relies on os.getenv()
MONGO_URI = "mongodb+srv://joshikamuthu05:joshikamuthu05@travel.vr5qjab.mongodb.net/?appName=travel"

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # the database we're connecting to:
    db = client["boneage_users"]
    users_collection = db["users"]
    
    # Just checking connection implicitly:
    client.server_info()
    print("  [OK] Connected to MongoDB Atlas correctly!")
except Exception as e:
    print(f"  [FAIL] Could not connect to MongoDB: {e}")
    db = None
    users_collection = None
