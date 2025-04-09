
---

# To-Do App

## Overview

This To-Do App allows users to create, manage, and delete tasks. Tasks are persistent across sessions using **localStorage** to store the tasks. The app also features task completion toggling with a check/uncheck option and a simple delete function to remove tasks. It includes a responsive UI and is designed to be easily extendable with future features such as keyboard support, duplicate validation, and improved accessibility.

---

## Features

- **Add Tasks**: Create new tasks by typing in the input field and clicking the "Add" button.
- **Delete Tasks**: Remove tasks by clicking the "×" button next to each task.
- **Check/Uncheck Tasks**: Mark tasks as completed by clicking on them, which strikes them through.
- **Persistent Data**: Tasks persist across browser sessions using **localStorage**.
- **Responsive Design**: Mobile-friendly interface that works across all screen sizes.
- **Task Management**: Dynamically manage tasks with intuitive user interaction.

---

## Functionality

### `addTask()`

**Description**:  
This function handles the creation of new tasks. It validates the input, appends the task to the list, and includes a delete button for each task.

**Implementation**:
- It first checks if the input is empty, displaying an alert if so.
- If valid, it creates a `<li>` element with the task content.
- A `<span>` element is also created for the delete button, which uses the Unicode multiplication sign (×).
- The task is added to the list container, and the input field is cleared for the next task.

**Code**:

```js
function addTask() {
    if (inputBox.value === '') {
        alert("You Must Write Something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for ×
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData(); // Save updated task list to localStorage
}
```

---

### `saveData()`

**Description**:  
This function saves the current state of the task list to **localStorage**. It serializes the content of the task list container into a string format that can be retrieved later.

**Implementation**:  
Uses `localStorage.setItem()` to store the list's HTML content, ensuring tasks are persisted across sessions.

**Code**:

```js
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); // Save current tasks to localStorage
}
```

---

### `showTask()`

**Description**:  
This function loads the task list from **localStorage** on page load. It ensures that any previously saved tasks are displayed when the page is refreshed or revisited.

**Implementation**:  
Uses `localStorage.getItem()` to retrieve and inject the saved HTML content into the task list container.

**Code**:

```js
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data"); // Load saved tasks from localStorage
}
```

---

### `listContainer.addEventListener("click")`

**Description**:  
This event listener is used for **event delegation**, allowing dynamic interaction with tasks that are added after the initial page load. It listens for clicks on both tasks (`<li>`) and the delete button (`<span>`).

**Implementation**:
- If a task (`<li>`) is clicked, it toggles the task's checked state by adding or removing the `checked` class, which applies visual styles.
- If the delete button (`<span>`) is clicked, the task is removed from the list.

**Code**:

```js
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save updated task list after task completion toggle
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove task when delete button is clicked
        saveData(); // Save updated task list after task deletion
    }
});
```

---

## Future Improvements & Reviewer Suggestions

1. **Local Storage**:  
   - Already implemented to persist tasks across browser sessions.

2. **Duplicate Task Validation**:
   - Current implementation allows adding duplicate tasks. A validation check can be added to ensure no duplicate tasks are added to the list.
   
   **Suggested Implementation**:
   - Before adding a new task, check if the task already exists in the list.

3. **Keyboard Support**:
   - Add the ability to press `Enter` to add tasks, improving usability.
   
   **Suggested Implementation**:
   - Add an event listener for the `keypress` event on the input box that triggers `addTask()` when the `Enter` key is pressed.

4. **Accessibility Improvements**:
   - Add ARIA roles and labels for improved screen reader support.
   - Example: Use `role="list"` for the `<ul>` element and `role="listitem"` for `<li>` items.

5. **Animations and Transitions**:
   - Implement smooth transitions for adding/removing tasks and toggling completion.
   - Add visual feedback for task completion and deletion.

6. **Advanced Features**:
   - **Due Dates**: Allow users to set due dates for tasks and display them.
   - **Priority Levels**: Enable setting priorities (e.g., Low, Medium, High) for each task.
   - **Task Categories**: Organize tasks into categories (e.g., Personal, Work).
   - **Dark Mode**: Implement a theme switcher to toggle between light and dark modes.

---

## Installation

To run this app, simply download the project files and open the `index.html` file in a browser.

### Project Structure:

```
/ToDoApp
│
├── index.html          # The main HTML file with the task list structure
├── style.css           # The styling file for the app's design
└── script.js           # The JavaScript file containing all the app logic
```

---

## Technologies Used

- **HTML5**: Structure and layout of the app.
- **CSS3**: Styling and responsiveness of the app interface.
- **JavaScript**: Core functionality of the app, including DOM manipulation and event handling.
- **localStorage**: Data persistence across browser sessions.

---

## Contributing

Feel free to fork this project and submit your improvements or fixes via pull requests.

---


