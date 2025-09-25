import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")


def get_connection():
    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="Multiplayer-Chess",
        user=db_user,
        password=db_password
    )

    return connection

