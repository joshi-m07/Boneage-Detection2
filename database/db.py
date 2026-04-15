from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Absolute path for the SQLite database — anchored to the project root so
# the file is always created in the same place regardless of cwd.
_DB_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_DB_PATH = os.path.join(_DB_DIR, "boneage_predictions.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{_DB_PATH}"

# Ensure the directory exists (not strictly needed for root but keeps it tidy)
os.makedirs(os.path.dirname(_DB_PATH), exist_ok=True)

# Create SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Needed for SQLite
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
Base = declarative_base()


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables"""
    from database.models import Patient, Prediction
    Base.metadata.create_all(bind=engine)
    print("[OK] Database initialized successfully")
