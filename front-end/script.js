

   
const campoInput = document.querySelector('input.campo')
carregarTarefas();

campoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa(campoInput);
    }
});

const botaoAdicionar = document.querySelector('.botao');
botaoAdicionar.addEventListener('click', () => adicionarTarefa(campoInput));


    

function adicionarTarefa(campoInput){
    const texto = campoInput.value.trim();

    // confere se o usúario digitou nada. 
    if (texto == ''){
        alert('Digite alguma tarefa antes de adicionar!')
        return
    }

    // Conectando a minha API em Python
    fetch('http://127.0.0.1:5000/tarefas', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ 
            titulo: texto
        })
    })
        .then((Response) => {
            if (!Response.ok){
                throw new Error (`Erro a realizar a requisisão, status: ${Response.status}`)
            }

            return Response.json()
        })

        .then(data => {
            console.log('Tarefa salva:', data)
            mostrarNaTela(data)
            campoInput.value = ''
        })

        .catch((error) => {
            console.error('Erro ao salvar tarefa:', error)
        })

}



function carregarTarefas() {
    fetch('http://127.0.0.1:5000/tarefas')
    .then(Response => Response.json())
    .then(dados => {
        dados.forEach(tarefa => mostrarNaTela(tarefa))
    })

    .catch(error => {
        console.error('Erro ao carregar tarefas:', error)
    })
}

function atualizarTarefa(id, novoTitulo, feito=false){
    fetch(`http://127.0.0.1:5000/tarefas/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            titulo: novoTitulo,
            concluida: feito
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao atualizar');
        return response.json();
    })
    .then(data => console.log('Tarefa atualizada:', data))
    .catch(error => console.error(error));

}

function deletarTarefa(id, elementoHTML){
    fetch(`http://127.0.0.1:5000/tarefas/${id}`, {
        method: 'DELETE'
    })

    .then(response => {
        if (response.ok){
            elementoHTML.remove()
        }
    })

    .catch(error => console.error(error));
}

function mostrarNaTela(tarefa){
    const tarefas = document.getElementById('tarefas')


    // criando uma div com uma class:".item-tarefa".

    const novaTarefa = document.createElement('div')
    novaTarefa.classList.add('item-tarefa', 'animar');



    // Criando o checkbox

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'tarefa-' + tarefa.id;
    checkbox.classList.add('checkbox')

    


    // Criando o label. Ex: <label class="tarefa"> Texto </label>

    const label = document.createElement('label')
    label.classList.add('tarefa')
    label.htmlFor = checkbox.id
    label.textContent = tarefa.titulo // Adicionar o texto dentro do label

    checkbox.checked = tarefa.concluida;
    if (checkbox.checked) {
        label.classList.add('concluida');
    }

    checkbox.addEventListener('change', () => {
        const estaConcluida = checkbox.checked;
        if (estaConcluida) label.classList.add('concluida');
        else label.classList.remove('concluida');

        atualizarTarefa(tarefa.id, label.textContent, estaConcluida);
    });


    // botão Editar

    const editar = document.createElement('button')
    editar.classList.add('editar')
    editar.setAttribute('aria-label', 'Editar tarefa')
    // icone
    editar.innerHTML = '<span class="material-symbols-outlined">edit</span>'

    editar.addEventListener('click', () => {
        // cria input para edição
        const inputEdit = document.createElement('input')
        inputEdit.type = 'text'
        inputEdit.value = label.textContent
        inputEdit.classList.add('campo-edicao')

        // Trocar o label pelo inputEdit
        novaTarefa.replaceChild(inputEdit, label)
        inputEdit.focus()

        function salvarEdicao() {
            const novoTitulo = inputEdit.value.trim();

            if(inputEdit.value.trim() === '') {
                alert('A tarefa não pode ficar vazia!');
                inputEdit.focus(); // Faz o cursor vai automaticamente para dentro do campo
                return;
            }

            label.textContent = novoTitulo;
            novaTarefa.replaceChild(label, inputEdit);
            atualizarTarefa(tarefa.id, novoTitulo)
        }

        // salvar ao apertar Enter
        inputEdit.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                salvarEdicao();
            }
        });
    })


    // botão Delete

    const excluir = document.createElement('button')
    excluir.classList.add('excluir')
    excluir.setAttribute('aria-label', 'Excluir tarefa')
    // icone
    excluir.innerHTML = '<span class="material-symbols-outlined">delete</span>'
    excluir.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            deletarTarefa(tarefa.id, novaTarefa);
        }

        setTimeout(() => {
            if (tarefas.children.length === 0) {
                tarefas.style.opacity = '0';
            } else {
                tarefas.style.opacity = '1';
            }
        }, 100);
    
    })



    // Adicionando os elementos na div novaTarefa: (div class="item-tarefa")
    novaTarefa.appendChild(checkbox)
    novaTarefa.appendChild(label)
    novaTarefa.appendChild(editar)
    novaTarefa.appendChild(excluir)

    // Adicionando a novaTarefa no div id='tarefas'
    tarefas.appendChild(novaTarefa)
    tarefas.style.opacity = '1';
}