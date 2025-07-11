# Lista de Tarefas

Projeto simples de lista de tarefas (To-Do List) com API feita em Python (Flask) e banco de dados MySQL.

---

## Funcionalidades

- Criar, listar, atualizar e excluir tarefas
- API RESTful com Flask
- Banco MySQL para armazenamento dos dados
- Front-end básico em HTML, CSS e JavaScript conectado à API

---

## Tecnologias

- Python 3
- Flask
- MySQL
- HTML5 / CSS3 / JavaScript

---

## Como executar

1. Clone o repositório:  
```bash
git clone https://github.com/GabrielAluisio/lista-de-tarefas.git
```
2. Entre na pasta do projeto:  
```bash
cd lista-de-tarefas
```

3. Instale as dependências:  
```bash
pip install flask flask-cors mysql-connector-python
```

4. Configure seu banco MySQL criando o banco e a tabela:  

```sql
CREATE DATABASE tarefas_db;  
USE tarefas_db;

CREATE TABLE tarefas (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    titulo VARCHAR(255) NOT NULL,  
    concluida BOOLEAN DEFAULT FALSE  
);
```
5. Abra o front-end no navegador e use!