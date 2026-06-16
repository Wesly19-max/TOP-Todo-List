# TOP_TodoList
Requirements v5
- [X] edge case: if no date was being put, then just state as no due date



Requirements v4
- [X] learn about how date-fns can be integrated in your project
- [X] view all projects
- [X]view all todos in each project
- [ ]add functionality that expands todo item when you edit it
- [ ]delete a todo
- [X]add a todo in project
- [X]add project
- [X]edit project name
- [X]delete project
- [ ] integrate local storage in your project
- [X] create separate js modules

Requirements v3
- [X] a way to add projects
- [X] a way to delete projects
- [X] a way to edit projects
- [X] a way to add todos inside projects
- [X] refactor display todos function to include project list and their tasks


Requirements v2
- [X] it has a function to display todos
- [X] it has a function to add a todo
- [X] it has a function to edit a todo
- [X] it has a function to remove a todo



Requirements v1 
- [X] a place to store a todos
- [X] a way to add a todo item
- [X] a way to view all todo items
- [X] a way to edit a todo item
- [X] a way to delete a todo item

ideas:
- [X] refactor the edit functionality on todo item class to avoid repetition
- [X] how to keep the footer at the very bottom of the screen?

unfamilliar concepts:
- local storage
- how date-fns,an npm library can be used?

next:
- [X]  PROBLEM: i am struggling how to delete a todo object inside taskList array of Project object (taskList) which is inside of an array of projects (projectList)
e.g. projectList[0].taskList[0].removeItem() (delete first todo of the first project)
 what i have tried: chaining filter,console logging but removeItem() didnt worked
  SOLUTION: filter doesn't modify the original array, it just returns a copy of that array. Also, I should have reassigned it to the project.tasklist not to the projectList array.