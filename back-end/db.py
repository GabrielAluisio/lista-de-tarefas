import mysql.connector

def conectar():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='G@b16645164840',
        database='tarefas_db'
    )
