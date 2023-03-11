import sqlite3
import json
import os
from typing import TypedDict

# Type definition for the models
class PORTFOLIO(TypedDict):
    name: str
    short_description: str
    content: str
    tags: str
    image: str 
    date_created: str
    slug: str

class PROJECTS(TypedDict):
    name: str
    short_description: str
    detail_description: str
    image_url: str
    date_created: str
    slug: str

class BLOGS(TypedDict):
    name: str
    content: str
    date_created: str
    image: str
    tags: str
    slug: str

MODELS: dict[str, PORTFOLIO | PROJECTS | BLOGS] = {"Portfolio": PORTFOLIO, "Projects": PROJECTS, "Blogs": BLOGS}

def getJSONFile(fName: str) -> str:
    """
    Returns the file name
    """
    currDir = os.getcwd()

    JSONDir = os.path.join(currDir, "dump", f"{fName}.json")

    if os.path.exists(JSONDir):
        return JSONDir
    else:
        raise FileNotFoundError(f"Unable to locate {fName}.json")
    
def readJSON(path):
    with open(path, "r") as dataFile:
        return dataFile.read()

def loadModel(name: str) -> list[dict[str, str]]:
    """
    Returns the serialized data from the json file
    """
    jsonData = readJSON(getJSONFile(name))
    data = json.loads(jsonData)
    # Parse each list 
    parsedData: list[dict[str, str]] = [i["fields"] for i in data]
    return parsedData


def main():
    models = {
        "Portfolio": {
            "fields": ["name", "short_description", "content", "tags", "image", "date_created", "slug"]
        },
        "Projects": {
            "fields": ["name", "short_description", "detail_description", "image_url", "date_created", "slug"]
        },
        "Blogs": {
            "fields": ["name", "content", "date_created", "slug", "tags", "image"]
        }
    }

    # Change to file directory
    fileDir = os.path.dirname(__file__)
    os.chdir(fileDir)

    # Create a connection
    db = sqlite3.connect("./database.db")
    cur = db.cursor()
    
    for model in models:
        parsedModel: list[MODELS[model]] = loadModel(model)
        fields: list[str] = models[model]["fields"]
        data_values = []

        for row in parsedModel:
            # Create SQL statement
            values = tuple((f'"{row[col]}"' for col in fields))
            data_values.append(values)
        
        statement = f"INSERT INTO {model} ({', '.join(fields)}) VALUES ({', '.join(['?' for _ in fields])});"
        cur.executemany(statement, data_values)
        db.commit()
            
    db.close()

if __name__ == "__main__":
    main()