let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;

let localData = JSON.parse(localStorage.getItem("todo"));

let todoList = localData || [];
  
function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(param){
        let number = Math.random() * 16 | 0,
        randomNumber = param == 'x'?number:(number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}
addTodoButton.addEventListener("click",(event)=>{
   event.preventDefault();
   todo = todoInput.value;
    if(todo.length > 0){
        todoList.push({id: uuid(),todo,isCompleted:false});        
    }
    renderTodoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList));
    todoInput.value = "";    
    
});
showTodos.addEventListener("click",(event)=>{
    let key = event.target.dataset.key;
    let delTodo = event.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted}:todo); 
    todoList = todoList.filter(todo => todo.id !== delTodo);
    localStorage.setItem("todo",JSON.stringify(todoList));
    renderTodoList(todoList);
});
function renderTodoList(todoList){                                                                                                                                                                //is it is is completed then add the checked-todo class otherwise add the empty string                                 
    showTodos.innerHTML = todoList.map(({id,todo,isCompleted}) => 

    `<div class="relative todo">
        <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${isCompleted ?"checked":""}>
        <label class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : "" }" for="item-${id}" data-key=${id}>${todo}</label>
        <button class="absolute right-0 button cursor" ><i class="material-icons del-btn" data-todokey=${id}>delete</i></button>
    </div>
    `
);    
   
}
renderTodoList(todoList);