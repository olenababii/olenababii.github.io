const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = 0;

document.addEventListener("DOMContentLoaded", function () {
  todos = getTodos() || [];
  id = getId();
  render();
});

class Todo {
  constructor(){
    this.id = id++;
    this.text = this.getText();
    this.checked = false
  }
  getText(){
    return prompt('Enter a Todo task')
  }
}

function newTodo() {
  const todo = new Todo();
  todos.push(todo);
  render();
}

function render(){
  list.innerHTML = '';
  todos.map(todo => renderTodo(todo)).forEach(todo => list.appendChild(todo));
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
  if (todos.length === 0) id = 0;
  saveTodos();

  //
}

function renderTodo(todo){
  const li = document.createElement('li');
  li.innerHTML = `
      <input type="checkbox" onchange="changeTodo(${todo.id})" ${todo.checked ? 'checked' : ''}>
      <button onclick="deleteTodo(${todo.id})">delete</button>
      <span>${todo.text}</span> 
  `;

  return li;
}

function saveTodos(){
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("id", id);

}

function getTodos(){
  var str = localStorage.getItem("todos")
  todosGet = JSON.parse(str);
  return todosGet;
}

function getId(){
  var str = localStorage.getItem("id");
  var idGet = JSON.parse(str);
  return idGet;
}


function deleteTodo(id){
  console.log('from deleteTodo')
  todos = todos.filter(todo => todo.id !== id);
  render();
}

function changeTodo(id){
  todos = todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo)
  
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
  saveTodos();
}
