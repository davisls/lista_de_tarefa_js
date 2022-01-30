const inputTarefa = document.querySelector('.input-tarefas');
const btnTarefa = document.querySelector('.btn-tarefa');
const listaTarefa = document.querySelector('.lista-tarefas');

function criaLi () {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex')
  return li
}

function limpaTexto () {
  inputTarefa.value = '';
  inputTarefa.focus();  
}

function criaTarefa (texto) {
  const li = criaLi();
  li.innerText = texto;
  listaTarefa.appendChild(li);
  limpaTexto();
  criaBotaoApagar(li);
}

function criaBotaoApagar (li) {
  li.innerText += ' ';
  const btnApagar = document.createElement('button');
  btnApagar.innerText = 'Apagar';
  btnApagar.classList.add('apagar', 'btn', 'btn-sm', 'btn-dark', 'ml-auto');
  li.appendChild(btnApagar); 
}

function salvaTarefas () {
  const liTarefas = listaTarefa.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('listaTarefa', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('listaTarefa');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

btnTarefa.addEventListener('click', function (){
  if(!inputTarefa.value.trim()) return
  criaTarefa(inputTarefa.value); 
  salvaTarefas(); 
});

inputTarefa.addEventListener ('keypress', function (e){
  if(!inputTarefa.value.trim()) return
  if(e.key === 'Enter') criaTarefa(inputTarefa.value);
  salvaTarefas(); 
})

document.addEventListener ('click', function (e){
  const el = e.target;
  if(el.classList.contains('apagar')){
    el.parentElement.remove();
    salvaTarefas(); 
  }
});

adicionaTarefasSalvas();
