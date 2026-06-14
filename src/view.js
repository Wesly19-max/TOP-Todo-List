import { projectList,addProject} from "./app.js";

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
});

  viewAddProject();
  viewTodosinProject();

}

export function viewAddProject() {
  
  
  //after every end of project, add an add project button
  const projectHeadline = document.querySelector(".projects")
  const addProjectBtn = document.createElement("div")
  //addProjectBtn.classList.add("project")

  const addProjectBtnImg = document.createElement("img");
  addProjectBtnImg.src= "https://img.icons8.com/ios/50/add--v1.png"

  const addProjectBtnText = document.createElement("h3");
  addProjectBtnText.textContent = "Add New Project"

  projectHeadline.appendChild(addProjectBtn)
  addProjectBtn.appendChild(addProjectBtnImg)
  addProjectBtn.appendChild(addProjectBtnText)


//if this add project button is clicked, then a dialog appears where user is asked a form to type in new
  addProjectBtn.addEventListener("click", () => {
    dialog.showModal();
  })

}

const dialog = document.querySelector("dialog");
const confirmBtn = document.querySelector(".confirmBtn")
//name for the project with options add and cancel below
  confirmBtn.addEventListener("click",(event) => {
    event.preventDefault();

    const projectName = document.querySelector("#project-name").value;

    addProject(projectName);

    document.querySelector("form").reset();

    //display new projects list on ui
    viewProjects();

    dialog.close();

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
      
    })
  })

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
    })
  }


}

