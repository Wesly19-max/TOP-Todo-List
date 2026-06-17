
import { endOfDayWithOptions } from "date-fns/fp";
import { projectList,addProject} from "./app.js";

const editProjectNameDialog = document.querySelector(".edit-project-name")

export function viewProjects() {
  //refresh dom first
  const projectHeadline = document.querySelector(".projects")
  projectHeadline.innerHTML = "";

  //for each project, display it with a card ui
  projectList.forEach((projectItem) => {
  const project = document.createElement("div")
  project.classList.add("project")
  project.dataset.id = projectItem.id;

  const leftProjectContent = document.createElement("span")
  leftProjectContent.classList.add("left-project-content")
  const projectImage = document.createElement("img");
  projectImage.src = "https://img.icons8.com/ios-filled/50/menu-squared-2.png";
  projectImage.height = 24;
  projectImage.width = 24;
  const projectName = document.createElement("h3");
  projectName.textContent = projectItem.projectName;
  

  const editProjectBtn = document.createElement("img")
  editProjectBtn.src = "https://img.icons8.com/material-rounded/24/menu-2.png";
  editProjectBtn.height = 24;
  editProjectBtn.width = 24;

  //append to the dom
  
  projectHeadline.appendChild(project)
  project.appendChild(leftProjectContent)
  leftProjectContent.appendChild(projectImage)
  leftProjectContent.appendChild(projectName)
  project.appendChild(editProjectBtn)

  //add functionality to edit project name for each project
  editProjectBtn.addEventListener("click",() => {
    //IF menu container of a project card is CLICKED

    editProjectNameDialog.dataset.activeProjectId = projectItem.id
    editProjectNameDialog.showModal();
    //DISPLAY a dialog box to edit project name with buttons cancel, rename and delete 
    //renameProject(projectItem.id)
    
    //add functionality to  delete project
  })
});

  viewAddProject();
  viewTodosinProject();


}

const addProjectDialog = document.querySelector(".add-project-dialog");
const confirmBtn = document.querySelector(".confirmBtn")

export function viewAddProject() {
  
  
  //after every end of project, add an add project button
  const projectHeadline = document.querySelector(".projects")
  const addProjectBtn = document.createElement("div")
  //addProjectBtn.classList.add("project")

  const addProjectBtnImg = document.createElement("img");
  addProjectBtnImg.src= "https://img.icons8.com/ios/50/add--v1.png"
  addProjectBtnImg.width = 24;
  addProjectBtnImg.height = 24;

  const addProjectBtnText = document.createElement("h3");
  addProjectBtnText.textContent = "Add New Project"

  projectHeadline.appendChild(addProjectBtn)
  addProjectBtn.classList.add("addBtn");
  addProjectBtn.appendChild(addProjectBtnImg)
  addProjectBtn.appendChild(addProjectBtnText)


//if this add project button is clicked, then a dialog appears where user is asked a form to type in new
  addProjectBtn.addEventListener("click", () => {
    addProjectDialog.showModal();
  })

}


//name for the project with options add and cancel below
  confirmBtn.addEventListener("click",(event) => {
    event.preventDefault();

    const projectName = document.querySelector("#project-name").value;

    addProject(projectName);

    document.querySelector("form").reset();

    //display new projects list on ui
    viewProjects();

    addProjectDialog.close();

  })

//if Rename button is clicked in project menu container
const renameBtn = document.querySelector(".renameBtn");

renameBtn.addEventListener("click", (event) => {
    console.log("rename clicked")
    event.preventDefault();

    const projectItemId = editProjectNameDialog.dataset.activeProjectId
    //get the value of the user input in project name
    const editProjectNameValue = document.querySelector("#edit-project-name").value;

    //edit project name property of the project class instance
    const index = projectList.findIndex((project) => project.id == projectItemId)
    projectList[index].editProject(editProjectNameValue); 

    document.querySelector(".edit-project-form").reset();
    //refresh..View the projects again
    viewProjects();

    editProjectNameDialog.close()
  })
   
const deleteProjectBtn = document.querySelector(".delete-project")

deleteProjectBtn.addEventListener("click", () => {
  //find the clicked project
  const projectItemId = editProjectNameDialog.dataset.activeProjectId;
  //delete the clicked project
  const index = projectList.findIndex((project) => project.id == projectItemId)
  projectList[index].removeProject();

  viewProjects();

  editProjectNameDialog.close()
})



export function viewTodosinProject() {
  const projectBtns = document.querySelectorAll(".project");
  const projectName = document.querySelector(".project-name");

  projectBtns.forEach((projectBtn) => {
    projectBtn.addEventListener("click", () => {
      //if any project is clicked, then display the project name and its todo contents on the main content
      let index = projectList.findIndex((project) => project.id == projectBtn.dataset.id)
      projectName.textContent = projectList[index].projectName;

      viewTodos(projectBtn.dataset.id)
      viewAddTodos(projectBtn.dataset.id)
      console.log("viewAddTodos")
      
    })
  })

  
}

function viewTodos(projectIdentifier) {
    //refresh the todos first before adding 

    const taskContentDiv = document.querySelector(".taskContent")
    taskContentDiv.innerHTML = ""
    let index = projectList.findIndex((project) => projectIdentifier == project.id);

    //for each todo item in the project,display it on main content
    projectList[index].taskList.forEach((todoItem) => {
      const taskDiv = document.createElement("div")
      taskDiv.classList.add("task")

      const leftTaskContentDiv = document.createElement("div")
      leftTaskContentDiv.classList.add("left-task-content")
      const completeBtn = document.createElement("img");
      completeBtn.src = "https://img.icons8.com/forma-thin-filled-sharp/24/unchecked-radio-button.png"
      completeBtn.width = 24;
      completeBtn.height = 24;

      const taskName = document.createElement("p")
      taskName.textContent = todoItem.title;

      //if completeBtn is clicked, then make the complete property true of the todo item 
      completeBtn.addEventListener("click", () => { 
        todoItem.toggleComplete() ;
        if (todoItem.isComplete == true) { 
          completeBtn.src="https://img.icons8.com/color/48/checked-radio-button--v2.png";
          completeBtn.width = 24; 
          completeBtn.height = 24; 
          
          taskName.innerHTML = `<del>${todoItem.title}</del>`
        }else { 
          completeBtn.src = "https://img.icons8.com/forma-thin-filled-sharp/24/unchecked-radio-button.png";
          taskName.textContent = todoItem.title; 
        } 
      })
      

      const rightTaskContentDiv = document.createElement("div")
      rightTaskContentDiv.classList.add("right-task-content")
      const dueDate = document.createElement("p")
      dueDate.classList.add("due-date");
      dueDate.textContent = todoItem.dueDate;
      const importantBtn = document.createElement("img");
      importantBtn.src = "https://img.icons8.com/ios/50/star--v1.png"
      importantBtn.width = 24;
      importantBtn.height = 24;

      importantBtn.addEventListener("click",() => {
        todoItem.toggleImportance();
        if (todoItem.isImportant == true) { 
          importantBtn.src="https://img.icons8.com/emoji/48/star-emoji.png";
          importantBtn.width = 24; 
          importantBtn.height = 24; 
        }else { 
          importantBtn.src = "https://img.icons8.com/ios/50/star--v1.png"; 
        } 
      })
      
      const editBtn = document.createElement("img")
      editBtn.src = "https://img.icons8.com/ios-glyphs/30/menu-2.png"
      editBtn.width = 24;
      editBtn.height = 24;

      //if edit button is clicked, 
      //append to dom
      taskContentDiv.appendChild(taskDiv)
      taskDiv.appendChild(leftTaskContentDiv)
      taskDiv.appendChild(rightTaskContentDiv)
      leftTaskContentDiv.appendChild(completeBtn)
      leftTaskContentDiv.appendChild(taskName)
      rightTaskContentDiv.appendChild(dueDate)
      rightTaskContentDiv.appendChild(importantBtn)
      rightTaskContentDiv.appendChild(editBtn)

      const editTodoDialog = document.querySelector(".edit-todo-dialog")
      //add menu container event listener for each todo
      editBtn.addEventListener("click", () => {
        editTodoDialog.dataset.activeProjectId = projectList[index].id;
        editTodoDialog.dataset.activeTodoId = todoItem.id;
        console.log(editTodoDialog.dataset.activeProjectId )
        console.log(editTodoDialog.dataset.activeTodoId)
        //if edit is clicked, then display a dialog box to edit the current todo
        editTodoDialog.showModal();
        //if delete is clicked, then delete the todo
      })
        
    })
  }

//display an "add new todo" button in each project
function viewAddTodos(projectIdentifier) {
  
  const addTodoDialog = document.querySelector(".add-todo-dialog")
  const taskContentDiv = document.querySelector(".taskContent")
  const addTodoBtn = document.createElement("div")

  const addTodoBtnImg = document.createElement("img");
  addTodoBtnImg.src= "https://img.icons8.com/ios/50/add--v1.png"
  addTodoBtnImg.width = 24;
  addTodoBtnImg.height = 24;

  const addTodoBtnText = document.createElement("h3");
  addTodoBtnText.textContent = "Add New Todo"

  taskContentDiv.appendChild(addTodoBtn)
  addTodoBtn.classList.add("addBtn")
  addTodoBtn.appendChild(addTodoBtnImg)
  addTodoBtn.appendChild(addTodoBtnText)


//if this add todo button is clicked, then a dialog appears where user is asked a form to type in new
  addTodoBtn.addEventListener("click", () => {
    addTodoDialog.dataset.activeProjectId = projectIdentifier;
    addTodoDialog.showModal();
  })
}

const addTodoBtn = document.querySelector(".addTodoBtn")
addTodoBtn.addEventListener("click", () => {
  //get the values of title,description and date
    const titleInput = document.querySelector("#title").value
    const descriptionInput = document.querySelector("#description").value
    const dateInput = document.querySelector("#date").value

    const yearDate = parseInt(dateInput.slice(0,4));
    const monthDate = parseInt(dateInput.slice(5,7));
    const dayDate = parseInt(dateInput.slice(8,10));
  //add a new todo into the taskList array of that specific project
  const addTodoDialog = document.querySelector(".add-todo-dialog")
  const projectItemId = addTodoDialog.dataset.activeProjectId;
  const index = projectList.findIndex((project) => project.id == projectItemId)
  console.log(index)
  projectList[index].addTodoItem(titleInput,descriptionInput,yearDate,monthDate,dayDate,false,false)

  const addTodoDialogForm = document.querySelector(".add-todo-dialog-form");
  addTodoDialogForm.reset();
  //view Todos
  viewTodos(projectItemId)
  viewAddTodos(projectItemId)
})

const editTodoBtn = document.querySelector(".editTodoBtn");
const editTodoDialog = document.querySelector(".edit-todo-dialog")
editTodoBtn.addEventListener("click", () => {
  //get values of title,description and date
    const titleInput = document.querySelector("#edit-title").value
    const descriptionInput = document.querySelector("#edit-description").value
    const dateInput = document.querySelector("#edit-date").value

    const yearDate = parseInt(dateInput.slice(0,4));
    const monthDate = parseInt(dateInput.slice(5,7));
    const dayDate = parseInt(dateInput.slice(8,10));
  //edit the clicked todo at that specific project
  const projectItemId = editTodoDialog.dataset.activeProjectId;
  const taskId = editTodoDialog.dataset.activeTodoId;

  const projectIndex = projectList.findIndex((project) => project.id == projectItemId)
  const taskIndex = projectList[projectIndex].taskList.findIndex((todoItem) => taskId == todoItem.id)
  console.log(`${projectIndex} ${taskIndex}`)
  projectList[projectIndex].taskList[taskIndex].edit(titleInput,descriptionInput,yearDate,monthDate,dayDate);
  document.querySelector(".edit-todo-form").reset();
  //view todos
  viewTodos(projectItemId)
  viewAddTodos(projectItemId);
})

const deleteTodoBtn = document.querySelector(".deleteTodoBtn");
deleteTodoBtn.addEventListener("click", () => {
  //find the todo item that was clicked
  const projectItemId = editTodoDialog.dataset.activeProjectId;
  const taskId = editTodoDialog.dataset.activeTodoId;

  const projectIndex = projectList.findIndex((project) => project.id == projectItemId)
  const taskIndex = projectList[projectIndex].taskList.findIndex((todoItem) => taskId == todoItem.id)
  console.log(`${projectIndex} ${taskIndex}`)
  //delete that specific todo item on that project
  projectList[projectIndex].taskList[taskIndex].removeItem();
  //view todos
  viewTodos(projectItemId)
  viewAddTodos(projectItemId);
})
