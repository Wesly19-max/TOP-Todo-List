
import {projectList} from "./app.js"
import "./styles.css"

console.log(projectList)

projectList.forEach((projectItem) => {
  const project = document.createElement("div")
  project.classList.add("project")

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
  const projectHeadline = document.querySelector(".projects")
  projectHeadline.appendChild(project)
  project.appendChild(leftProjectContent)
  leftProjectContent.appendChild(projectImage)
  leftProjectContent.appendChild(projectName)
  project.appendChild(editProjectBtn)
});
