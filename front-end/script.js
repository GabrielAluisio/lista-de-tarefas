const campoInput = document.querySelector('input.campo');


campoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});


function adicionarTarefa(){
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
        .then(Response => Response.json())
        .then(data => {
            mostrarNaTela(data)
            campoInput.value = ''
        })
        .catch((error) => {
            console.error('Erro ao salvar tarefa:', error)
        })

}

function mostrarNaTela(tarefa){
    const tarefas = document.getElementById('tarefas')

    // criando uma div com uma class:".item-tarefa".
    const novaTarefa = document.createElement('div')
    novaTarefa.classList.add('item-tarefa')
    novaTarefa.classList.add('item-tarefa', 'animar');

    // Criando o checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'tarefa-' + tarefa.id;
    checkbox.classList.add('checkbox')
    checkbox.addEventListener('change', () => {
        label.classList.toggle('concluida');
    });


    // Crianso o label. Ex: <label class="tarefa"> Texto </label>
    const label = document.createElement('label')
    label.classList.add('tarefa')
    label.htmlFor = checkbox.id
    label.textContent = tarefa.titulo // Adicionar o texto dentro do label

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
            if(inputEdit.value.trim() === '') {
                alert('A tarefa não pode ficar vazia!');
                inputEdit.focus(); // Faz o curso vai automaticamente para dentro do campo
                return;
            }
            label.textContent = inputEdit.value.trim();
            novaTarefa.replaceChild(label, inputEdit);
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
        novaTarefa.remove();

            if (tarefas.children.length === 0) {
                tarefas.style.opacity = '0';

        }}
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
