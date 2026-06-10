
let projectList = []

//todo items are objects
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
    displayTodos();
  }
  //toggling todo importance
  toggleImportance() {
    this.isImportant = !this.isImportant;
    displayTodos();
  }
  //changing due date 
  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
    displayTodos();
  }
  //changing description
  changeDescription(newDescription) {
    this.description = newDescription;
    displayTodos();
  }
  //changing title
  changeTitle(newTitle) {
    this.title = newTitle;
    displayTodos();
  }
  
  //delete todo item instance
  removeItem() {
    projectList.forEach((project) => {
        project.taskList = project.taskList.filter((todoItem) => todoItem.id!== this.id);
    })
    displayTodos();
  };

}
  


//add a project
class Project {
  taskList = [];
  constructor(projectName) {
    this.id = crypto.randomUUID();
    this.projectName = projectName;
  }

  //function to add todo item
  addTodoItem(title,description,dueDate,isImportant,isComplete) {
    let newTask = new TodoItem(title,description,dueDate,isImportant,isComplete)
    this.taskList.push(newTask)
    displayTodos()
  }

  //delete project
  removeProject() {
    projectList = projectList.filter((project)=> project.id !== this.id)
  }

  //edit project name
  editProject(projectName) {
    this.projectName = projectName;
  }
}

function addProject(projectName) {
  let newProject = new Project(projectName);
  projectList.push(newProject);

}

//default project is the project where todo items go to that doesn't have a specific project
addProject("Default");

//add a todo item to default project if you didn't add it from project
function addTodoItem(title,description,dueDate,isImportant,isComplete) {
  let newTask = new TodoItem(title,description,dueDate,isImportant,isComplete);
  projectList[0].taskList.push(newTask)
  displayTodos();
}




addTodoItem("task 1", "do it now","06222006",true,false);
addTodoItem("task 2", "haircut","06232006",true,false);
addTodoItem("buy grocery","milk","07-28-2027",false,false);
// defaultProject[0].removeItem();


//show all todos
function displayTodos() {
  projectList.forEach((project) => {
    console.log(project.projectName);
    project.taskList.forEach((todoItem) => {
      console.log(`${todoItem.isComplete? '[X]' : '[ ]'} ${todoItem.title}. Description: ${todoItem.description}. Due Date: ${todoItem.dueDate}. ${todoItem.isImportant? 'Important':'Not Important'} `);
    })
  })

}


    
  

console.log(displayTodos()) 




/* task1.toggleComplete();
console.log(task1)
task1.changeDescription("new description haha");
console.log(task1);
task1.changeDueDate("06162006");
console.log(task1);
task1.changeTitle("project1");
console.log(task1) */