import { taskList } from ".";
import calendarSVG from "../images/calendar.svg";
import { openEditMenu } from "./editTask";

export let currentTask = null;

export function displayTasks(currentProject) {
    for (const task of currentProject.tasks) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        let taskStart = document.createElement("div");
        taskStart.classList.add("start");

        let completeTask = document.createElement("button");
        completeTask.classList.add("complete-task");
        completeTask.setAttribute("id", String(task.getCheckboxID()));

        let taskTitle = document.createElement("div");
        taskTitle.classList.add("task-title");
        taskTitle.innerText = task.title;
        taskTitle.setAttribute("id", String(task.id));

        let taskEnd = document.createElement("div");
        taskEnd.classList.add("end");

        let showMore = document.createElement("button");
        showMore.classList.add("show-more");
        showMore.innerText = ">";
        showMore.addEventListener("click", () => {
            openEditMenu(task);
            currentTask = task;
        });

        let dueDateDiv = document.createElement("div");
        dueDateDiv.classList.add("due-date");

        let dueDateImg = document.createElement("img");
        dueDateImg.classList.add("due-date-img");
        dueDateImg.src = calendarSVG;

        let dueDateVal = document.createElement("div");
        dueDateVal.classList.add("due-date-value");
        if (task.dueDate == "") {
            dueDateVal.innerText = "yyyy-mm-dd";
        } else {
            dueDateVal.innerText = task.dueDate;
        }

        let priorityDiv = document.createElement("div");
        priorityDiv.classList.add("priority");

        let priorityDisplay = document.createElement("div");
        let priorityLevel = document.createElement("div");

        switch (task.priority) {
            case "high":
                priorityDisplay.classList.add("priority-high");
                priorityLevel.innerText = "High";
                break;
            case "medium":
                priorityDisplay.classList.add("priority-medium");
                priorityLevel.innerText = "Medium";
                break;
            case "low":
                priorityDisplay.classList.add("priority-low");
                priorityLevel.innerText = "Low";
                break
        }


        if (task.isCompleted()) {
            completeTask.classList.add("checked")
            const isChecked = completeTask.classList.contains("checked");
            completeTask.setAttribute("aria-pressed", isChecked);
            completeTask.textContent = isChecked ? "✓" : "";
            taskTitle.classList.toggle("completed");
        }

        dueDateDiv.appendChild(dueDateImg);
        dueDateDiv.appendChild(dueDateVal);

        priorityDiv.appendChild(priorityDisplay);
        priorityDiv.appendChild(priorityLevel);

        taskEnd.appendChild(showMore);
        taskStart.appendChild(completeTask);
        taskStart.appendChild(taskTitle);
        taskDiv.appendChild(taskStart);
        taskDiv.appendChild(dueDateDiv);
        taskDiv.appendChild(priorityDiv);
        taskDiv.appendChild(taskEnd);

        taskList.appendChild(taskDiv);
    }

    const checkButtons = document.querySelectorAll(".complete-task");

    checkButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("checked");
            const isChecked = button.classList.contains("checked");
            button.setAttribute("aria-pressed", isChecked);
            button.textContent = isChecked ? "✓" : "";
           
        currentProject.tasks.forEach(task => {
        if (task.getCheckboxID() == button.id) {
                const taskTitle = document.getElementById(task.id);
                taskTitle.classList.toggle("completed");
                task.completeTask();
        }
        })
        });
    });
}