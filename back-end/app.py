from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tarefas = []

@app.route('/tarefas', methods=['GET'])
def listar_tarefa():
    print(f"📦 Tarefas atuais (GET): {tarefas}")
    return jsonify(tarefas), 200

@app.route('/tarefas', methods=['POST'])
def adicionar_tarefa():
    dados = request.get_json()
    titulo = dados.get('titulo')

    tarefa = {
        'id': len(tarefas) + 1, 
        'titulo': titulo,
        'concluida': False
    }

    tarefas.append(tarefa)
    return jsonify(tarefa), 201


@app.route('/tarefas/<int:id>', methods=['PUT'])
def atualizar_tarefa(id):

    dados = request.get_json()

    for tarefa in tarefas:
        if tarefa['id'] == id:
            tarefa['titulo'] = dados.get('titulo', tarefa['titulo'])
            tarefa['concluida'] = dados.get('concluida', tarefa['concluida'])
            return jsonify(tarefa), 200

    return jsonify({'erro': 'Tarefa não encontrada'}), 404


@app.route('/tarefas/<int:id>', methods=['DELETE'])
def excluir_tarefa(id):
    for tarefa in tarefas:
        if tarefa['id'] == id:
            tarefas.remove(tarefa)
            return jsonify({'mensagem': f'Tarefa {id} removida com sucesso.'}), 200
    return jsonify({'erro': 'Tarefa não encontrada'}), 404


if __name__ == '__main__':
    app.run(debug=True)
