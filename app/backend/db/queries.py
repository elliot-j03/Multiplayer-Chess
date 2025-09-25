from db.connection import get_connection


# Auth Queries
def db_create_user(username: str, email: str, hshd_pw: str):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            '''
                INSERT INTO users (username, email, hashed_password)
                VALUES (%s, %s, %s)
            ''',
            (username, email, hshd_pw)
        )
        conn.commit()
        return {"Success": True}
    except Exception as e:
        print(f"[ERROR] queries.py/db_create_user: {e}")
        return {
            "Success": False,
            "detail": f"An error occurred while updating the database: {e}"
        }
    finally:
        cursor.close()
        conn.close()


def db_login(username: str, password: str):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT username, hashed_password FROM users WHERE username = %s",
                       (username,))
        user_row = cursor.fetchone()

        if user_row == None:
            return {
                "Success": False,
                "detail": "The username provided was not found"
            }
        
        _, pw = user_row
        if pw != password:
            return {
                "Success": False,
                "detail": "The password provided does not match the username"
            }
        
        return {"Success": True}
    except Exception as e:
        print(f"[ERROR] queries.py/db_login: {e}")
        return {
            "Success": False,
            "detail": f"An error occurred while querying the database: {e}"
        }
    finally:
        cursor.close()
        conn.close()