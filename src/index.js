let todoList = [];

class TodoItem {
  constructor(title,description,dueDate,isImportant,isComplete) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isImportant = isImportant;
    this.isComplete = isComplete;
  }

  //toggling todos as complete/incomplete

  //toggling todo importance

  //changing due date 

  //changing description

  //changing title

  //delete todo item

}

//add a todo item 
let task1 = new TodoItem("task 1", "do it now","06222006",true,false);
todoList.push(task1);

let task2 = new TodoItem("task 2", "haircut","06232006",true,false);
todoList.push(task2);

//show all todos
for (let i =0;i<todoList.length;i++) {
  console.log(todoList[i]);
}