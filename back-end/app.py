from flask import Flask, jsonify, request
from flask_cors import CORS
from db import conectar

app = Flask(__name__)
CORS(app)


@app.route('/tarefas', methods=['GET'])
def listar_tarefa():
    

    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM tarefas")
    tarefas = cursor.fetchall()

    print(f"📦 Tarefas atuais (GET): {tarefas}")

    cursor.close()
    conn.close()


    
    return jsonify(tarefas), 200



@app.route('/tarefas', methods=['POST'])
def adicionar_tarefa():
    dados = request.get_json()
    titulo = dados.get('titulo')

    #Conectando ao mySQl 
    conn = conectar()
    cursor = conn.cursor()


    #Colocando dados
    query = "INSERT INTO tarefas (titulo) VALUE(%s);"
    valor = (titulo,)
    cursor.execute(query, valor)
    conn.commit()

    #Fechando conexão
    cursor.close()
    conn.close()

    tarefa_id = cursor.lastrowid

    tarefa = {
        'id': tarefa_id, 
        'titulo': titulo,
        'concluida': False
    }

    return jsonify(tarefa), 201




@app.route('/tarefas/<int:id>', methods=['PUT'])
def atualizar_tarefa(id):
    dados = request.get_json()
    novo_titulo = dados.get('titulo')
    nova_conclusao = dados.get('concluida')

    #Conectando ao mySQl 
    conn = conectar()
    cursor = conn.cursor()

    query = "UPDATE tarefas SET titulo = %s, concluida = %s WHERE id = %s;"
    valores = (novo_titulo, nova_conclusao, id)
    cursor.execute(query, valores)
    conn.commit()

    cursor.close()
    conn.close()


    return jsonify({'mensagem': f'Tarefa {id} atualizada com sucesso.'}), 200





@app.route('/tarefas/<int:id>', methods=['DELETE'])
def excluir_tarefa(id):
    conn = conectar()
    cursor = conn.cursor()

    query = "DELETE FROM tarefas WHERE id = %s;"
    valor = (id,)
    cursor.execute(query, valor)
    conn.commit()

    cursor.close()
    conn.close()


    return jsonify({'mensagem': f'Tarefa {id} removida com sucesso.'}), 200
    



if __name__ == '__main__':
    app.run(debug=True)
