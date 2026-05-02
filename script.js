let tasks = [];

// Load tasks on page load
window.onload = function () {
    let saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
    }

    renderTasks();
};

function addTask() {
    let input = document.getElementById("inputtext");
    let task = input.value;
    let date = document.getElementById("dateInput").value;
    let priority = document.getElementById("priorityInput").value;

    tasks.push({
        text: task,
        completed: false,
        date: date,
        priority: priority
    });

    if (task.trim() === "") return;

    // store as object
    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    input.value = "";
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
  <span>
    ${task.text} <br>
    <small>${task.date} | ${task.priority}</small>
  </span>
`;

        // apply completed style if true
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        // apply priority style
        switch (task.priority) {
            case "High":
                li.classList.add("high");
                break;
            case "Medium":
                li.classList.add("medium");
                break;
            case "Low":
                li.classList.add("low");
                break;
        }

        // toggle complete
        li.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        // edit button
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        editBtn.onclick = function (event) {
            event.stopPropagation();

            let newText = prompt("Edit your task:", task.text);

            if (newText === null || newText.trim() === "") return;

            tasks[index].text = newText;

            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        // delete button
        let btn = document.createElement("button");
        btn.innerText = "Delete";

        btn.onclick = function (event) {
            event.stopPropagation();

            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
        };

        li.appendChild(editBtn);
        li.appendChild(btn);
        list.appendChild(li);
    });
}