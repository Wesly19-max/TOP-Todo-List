// a place to store todos
let todoList = [];

class TodoItem {
  constructor(title,description,dueDate,isImportant,isComplete) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isImportant = isImportant;
    this.isComplete = isComplete;
  }

  //toggling todos as complete/incomplete
  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
  //toggling todo importance
  toggleImportance() {
    this.isImportant = !this.isImportant;
  }
  //changing due date 
  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
  //changing description
  changeDescription(newDescription) {
    this.description = newDescription;
  }
  //changing title
  changeTitle(newTitle) {
    this.title = newTitle;
  }
  
  
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

//delete todo item (task 1)
todoList = todoList.filter((todoItem) => {
  return !(todoItem.id === task1.id);
})

console.log(todoList)

/* task1.toggleComplete();
console.log(task1)
task1.changeDescription("new description haha");
console.log(task1);
task1.changeDueDate("06162006");
console.log(task1);
task1.changeTitle("project1");
console.log(task1) */