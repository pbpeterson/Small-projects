const tarefa = document.querySelector('.tarefa');
const adicionar = document.querySelector('.addTarefa');
const pendents = document.querySelector('.pendents');
const todoApp = document.querySelector('.todo');
let fecharButton = document.querySelectorAll('.button');
const limparTudo = document.querySelector('.clearAll');
const tasks = document.querySelector('.contents');

function setValue() {
  tasks.innerHTML = window.localStorage.getItem('content');
  atualizaTask();
  if (fecharButton.length) {
    pendents.classList.add('ativo');
  }
  fecharButton.forEach((fechar) => {
    fechar.addEventListener('click', removeSelf);
  });
}

function atualizaTask() {
  fecharButton = document.querySelectorAll('.button');
  const tarefaPendente = document.querySelector('.tarefaPendente');
  if (fecharButton.length == 1) {
    tarefaPendente.innerText = `Você tem ${fecharButton.length} tarefa pendentes`;
  } else {
    tarefaPendente.innerText = `Você tem ${fecharButton.length} tarefas pendentes`;
  }
}

function removeSelf(event) {
  event.path[1].remove();
  const conteudos = document.querySelectorAll('.content');
  if (conteudos.length == 0) {
    pendents.classList.remove('ativo');
  }
  atualizaTask();
  saveHtml('content', tasks.innerHTML);
}

function adicionarTarefa() {
  event.preventDefault();
  if (tarefa.value) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('content');
    newDiv.innerHTML = `<p>${tarefa.value}</p> \n <p class="button">✖</p>`;
    tasks.appendChild(newDiv);
    tarefa.value = '';
    pendents.classList.add('ativo');
    atualizaTask();
  }
  fecharButton.forEach((fechar) => {
    fechar.addEventListener('click', removeSelf);
  });
  saveHtml('content', tasks.innerHTML);
}

function removerTudo() {
  const conteudos = document.querySelectorAll('.content');
  conteudos.forEach((conteudo) => {
    conteudo.remove();
  });
  pendents.classList.remove('ativo');
}

function saveHtml(value, html) {
  localStorage[value] = html;
}

setValue();
saveHtml('content', tasks.innerHTML);
adicionar.addEventListener('click', adicionarTarefa);
limparTudo.addEventListener('click', removerTudo);
