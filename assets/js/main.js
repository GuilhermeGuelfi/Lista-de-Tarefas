const tarefa = document.querySelector('.input-tarefa');
const lista = document.querySelector('.lista-tarefas');

function criaLista() {
    let li = document.createElement('li');
    return li;
}

function adicionaTarefa(textoInput) {
    const li = criaLista();
    li.innerText = textoInput;
    lista.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    let botaoApagar = document.createElement('button');;
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

tarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        checaVazio();
    }
})

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }

})

function salvarTarefas() {
    const liTarefas = lista.querySelectorAll('li');
    let tarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText.replace('Apagar', '').trim();
        tarefas.push(tarefaTexto);
    }
    
    const tarefasJSON = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function checaVazio() {
    if (tarefa.value) {
        adicionaTarefa(tarefa.value);
    } else {
        return;
    }
}

function limpaInput() {
    tarefa.value = '';
    tarefa.focus();
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    console.log(listaDeTarefas)
    
    for (let tarefass of listaDeTarefas) {
        adicionaTarefa(tarefass)
    }
}

try {
    adicionaTarefasSalvas()
} catch(err) {
    console.log('')
}