function adicionarTarefa(){
    const campoInput = document.querySelector('input.campo')
    const tarefas = document.getElementById('tarefas')

    // Pega o texto digitado e tira os espaços no começo e no final.
    const texto = campoInput.value.trim()

    // confere se o usúario digitou nada. 
    if (texto == ''){
        alert('Digite alguma tarefa antes de adicionar!')
        return
    }

    // criando uma div com uma class:".item-tarefa".
    const novaTarefa = document.createElement('div')
    novaTarefa.classList.add('item-tarefa')
    
    // Criando o checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'tarefa-' + Date.now();
    checkbox.classList.add('checkbox')

    // Crianso o label. Exe: <label class="tarefa"> Texto </label>
    const label = document.createElement('label')
    label.classList.add('tarefa')
    label.htmlFor = checkbox.id
    label.textContent = texto // Adicionar o texto dentro do label

    // botão Editar
    const editar = document.createElement('button')
    editar.classList.add('editar')
    editar.setAttribute('aria-label', 'Editar tarefa')
    // icone
    editar.innerHTML = '<span class="material-symbols-outlined">edit</span>'

    // botão Delete
    const excluir = document.createElement('button')
    excluir.classList.add('excluir')
    excluir.setAttribute('aria-label', 'Excluir tarefa')
    // icone
    excluir.innerHTML = '<span class="material-symbols-outlined">delete</span>'

    // Adicionando os elementos na div novaTarefa: (div class="item-tarefa")
    novaTarefa.appendChild(checkbox)
    novaTarefa.appendChild(label)
    novaTarefa.appendChild(editar)
    novaTarefa.appendChild(excluir)

    // Adicionando a novaTarefa no div id='tarefas'
    tarefas.appendChild(novaTarefa)

    campoInput.value = ''



}