from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable = False)
    hashed_password = Column(String, nullable=False)

    submissions = relationship("Submission", back_populates="user")

class Problem(Base):
    __tablename__ = "problem"

    id = Column(String, primary_key=True, index=True)   # e.g., "306/A"
    contestId = Column(Integer, index=True)            # e.g., 306
    index = Column(String)                             # e.g., "A"
    name = Column(String, nullable=False)             # problem name, e.g., "Candies"
    rating = Column(Integer)                           # e.g., 800
    tags = Column(JSON)                                # list of tags, e.g., ["implementation"]
    
    description = Column(Text)                         # problem statement
    constraints = Column(JSON)                         # input/output/interaction constraints
    examples = Column(JSON)                             # examples: list of {input, output}
    note = Column(Text)                                # any note for the problem

    submissions = relationship("Submission", back_populates="problem")

class Submission(Base):
    __tablename__ = "submission"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    problem_id = Column(Integer, ForeignKey("problem.id"), nullable=False)
    code = Column(Text, nullable=False)
    verdict = Column(String, default="pending")
    submitted_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="submissions")
    problem = relationship("Problem", back_populates="submissions")
