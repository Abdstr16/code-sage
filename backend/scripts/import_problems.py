import sys
import os
import json

backend_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # backend/
sys.path.insert(0, backend_path)

from sqlalchemy.orm import Session
from database import engine
from model import Problem

data_dir = os.path.join(os.path.dirname(backend_path), "public", "data")

def load_data():
    with open(os.path.join(data_dir, "problemset_complete.json"), "r", encoding="utf-8") as f:
        problemset = json.load(f)

    with open(os.path.join(data_dir, "descriptions.json"), "r", encoding="utf-8") as f:
        descriptions = json.load(f)

    return problemset, descriptions

def import_problems():
    problemset, descriptions = load_data()

    with Session(engine) as session:
        for prob in problemset:
            prob_id = prob["id"]

            desc_data = descriptions.get(prob_id, {})
            description = desc_data.get("description", "")
            constraints = desc_data.get("constraints", {})
            examples = desc_data.get("examples", [])
            note = desc_data.get("note", "")

            db_problem = Problem(
                id=prob_id,
                contestId=prob.get("contestId"),  
                index=prob.get("index"),
                name=prob.get("name"),
                rating=prob.get("rating"),
                tags=prob.get("tags", []),
                description=description,
                constraints=constraints,
                examples=examples,
                note=note
            )
            session.merge(db_problem)

        session.commit()

    print("Problems imported successfully!")


if __name__ == "__main__":
    import_problems()
