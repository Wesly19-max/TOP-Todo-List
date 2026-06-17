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



//add a todo item to default project if you didn't add it from project
function addTodoItem(title,description,year,month,day,isImportant,isComplete) {
  let newTask = new TodoItem(title,description,year,month,day,isImportant,isComplete);
  projectList[0].taskList.push(newTask)
  displayTodos();
}





//show all todos
function displayTodos() {
  console.log(projectList);
  projectList.forEach((project) => {
    console.log(project.projectName);
    project.taskList.forEach((todoItem) => {
      console.log(`${todoItem.isComplete? '[X]' : '[ ]'} ${todoItem.title}. Description: ${todoItem.description}. Due Date: ${todoItem.dueDate}. ${todoItem.isImportant? 'Important':'Not Important'} `);
    })
  })

  //convert projectList to string
  const myJSON = JSON.stringify(projectList)
  //save the array into local storage
  localStorage.setItem("todoProjects",myJSON)
}




function loadData() {
  //if saved data is not empty then parse the data 
  const savedData = localStorage.getItem("todoProjects")
  if (savedData !== null) {
    const parsedProjects = JSON.parse(savedData)

    parsedProjects.forEach((parsedProject) => {

      //create brand new proper project isntance using saved name
      const restoredProject = new Project(parsedProject.projectName)

      restoredProject.id = parsedProject.id;

      parsedProject.taskList.forEach((parsedTodo) => {
        restoredProject.addTodoItem(
          parsedTodo.title,
          parsedTodo.description,
          parseInt(parsedTodo.dueDate.slice(0,4)),
          parseInt(parsedTodo.dueDate.slice(5,7)),
          parseInt(parsedTodo.dueDate.slice(8,10)),
          parsedTodo.isImportant,
          parsedTodo.isComplete
        );

        // Ensure the restored todo keeps its original UUID
        const lastTodoIndex = restoredProject.taskList.length - 1;
        restoredProject.taskList[lastTodoIndex].id = parsedTodo.id;
      });

      projectList.push(restoredProject);
    })
  }else {
    addProject("default")
  }
}

loadData();