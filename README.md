# TOP_TodoList

Requirements v3
- [X] a way to add projects
- [X] a way to delete projects
- [ ] a way to edit projects
- [X] a way to add todos inside projects
- [ ] refactor display todos function to include project list and their tasks


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
- refactor the edit functionality on todo item class to avoid repetition

unfamilliar concepts:
- local storage
- how date-fns,an npm library can be used?

next:
- [X]  PROBLEM: i am struggling how to delete a todo object inside taskList array of Project object (taskList) which is inside of an array of projects (projectList)
e.g. projectList[0].taskList[0].removeItem() (delete first todo of the first project)
 what i have tried: chaining filter,console logging but removeItem() didnt worked
  SOLUTION: filter doesn't modify the original array, it just returns a copy of that array. Also, I should have reassigned it to the project.tasklist not to the projectList array.