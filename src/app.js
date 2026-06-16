import {format} from "date-fns";

export let projectList = []

//todo items are objects
class TodoItem {
  constructor(title,description,year,month,day,isImportant,isComplete) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    // 1. Check if all three parts are strictly numbers
    if (typeof year === "number" && typeof month === "number" && typeof day === "number") {
      const date = new Date(year, month - 1, day);
      
      // 2. Verify the date is valid and didn't auto-roll over (e.g., Feb 30 becoming March 2)
      if (!isNaN(date.getTime()) && date.getMonth() === month - 1 && date.getDate() === day) {
        this.dueDate = format(date, "yyyy-MM-dd");
      } else {
        this.dueDate = "No Due Date";
      }
    } else {
      this.dueDate = "No Due Date";
    }
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

  edit(newTitle,newDescription,year,month,day) {
    this.title = newTitle;
    this.description = newDescription;
    // 1. Check if all three parts are strictly numbers
    if (typeof year === "number" && typeof month === "number" && typeof day === "number") {
      const date = new Date(year, month - 1, day);
      
      // 2. Verify the date is valid and didn't auto-roll over (e.g., Feb 30 becoming March 2)
      if (!isNaN(date.getTime()) && date.getMonth() === month - 1 && date.getDate() === day) {
        this.dueDate = format(date, "yyyy-MM-dd");
      } else {
        this.dueDate = "No Due Date";
      }
    } else {
      this.dueDate = "No Due Date";
    }
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
  addTodoItem(title,description,year,month,day,isImportant,isComplete) {
    let newTask = new TodoItem(title,description,year,month,day,isImportant,isComplete)
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

export function addProject(projectName) {
  let newProject = new Project(projectName);
  projectList.push(newProject);
  displayTodos();

}

//default project is the project where todo items go to that doesn't have a specific project
addProject("Default");
addProject("school")
addProject("exercise")

//add a todo item to default project if you didn't add it from project
function addTodoItem(title,description,year,month,day,isImportant,isComplete) {
  let newTask = new TodoItem(title,description,year,month,day,isImportant,isComplete);
  projectList[0].taskList.push(newTask)
  displayTodos();
}




addTodoItem("task 1", "do it now",2026,5,22,true,false);
addTodoItem("task 2", "haircut",2026,5,23,true,false);
addTodoItem("buy grocery","milk",2026,5,24,false,false);
projectList[2].addTodoItem("run","for 5 days",2026,6,29,false,false);
// defaultProject[0].removeItem();


//show all todos
function displayTodos() {
  console.log(projectList);
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