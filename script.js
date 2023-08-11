const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.querySelector(".task-list");

function updateLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelector(".btn-input").addEventListener("click", function () {
  const taskInput = document.querySelector(".text-input");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTaskToList(taskText);
    taskInput.value = "";

    savedTasks.push(taskText);
    updateLocalStorage(savedTasks);
  }
});

function addTaskToList(taskText) {
  const taskList = document.querySelector(".task-list");
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");
  taskItem.appendChild(removeButton);
  taskList.appendChild(taskItem);
}

document
  .querySelector(".text-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const taskInput = document.querySelector(".text-input");
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
        addTaskToList(taskText);
        taskInput.value = "";

        savedTasks.push(taskText);
        updateLocalStorage(savedTasks);
      }
    }
  });

for (const savedTask of savedTasks) {
  addTaskToList(savedTask);
}

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const taskItem = event.target.parentNode;
    taskList.removeChild(taskItem);

    const taskText = taskItem.textContent.trim();
    savedTasks.splice(savedTasks.indexOf(taskText), 1);
    updateLocalStorage(savedTasks);
  }
});
