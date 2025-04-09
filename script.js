// ===============================================
// script.js — Core Logic for To-Do App
// ===============================================

/**
 * Grabs the input field where the user types new tasks.
 * @type {HTMLInputElement}
 */
const inputBox = document.getElementById("input-box");

/**
 * References the container <ul> where task <li> items will be appended.
 * @type {HTMLUListElement}
 */
const listContainer = document.getElementById("list-container");

/**
 * Adds a new task to the to-do list.
 * Triggered by the "Add" button click event.
 */
function addTask() {
    // 1. Validate: Prevent empty input
    if (inputBox.value === '') {
        alert("You Must Write Something"); // Feedback for empty submissions
    } else {
        // 2. Create a new list item (<li>) with user input as its text
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li); // Append the task to the list

        // 3. Add a "delete" button to the list item using <span>
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for × (delete icon)
        li.appendChild(span); // Add delete icon to the task
    }

    // 4. Clear the input field for the next task
    inputBox.value = "";

    // 5. Save current state to local storage
    saveData();
}

/**
 * Event delegation to handle dynamic task interaction:
 * - Toggling "checked" state
 * - Deleting tasks
 */
listContainer.addEventListener("click", function (e) {
    // Check if the clicked element is a <li> (task)
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle completion state
        saveData(); // Save state after toggle
    } 
    // Check if the clicked element is a <span> (delete icon)
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the parent task
        saveData(); // Save state after deletion
    }
});

/**
 * Saves the current list state to the browser's localStorage.
 * - Converts HTML content of the list into a string and stores it.
 */
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); // Save current tasks
}

/**
 * Loads and renders saved tasks from localStorage on page load.
 * - Ensures task list persists across sessions.
 */
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data"); // Restore saved tasks
}

// Initial call to load existing tasks on page load
showTask();

/* ======================================================
   Reviewer Suggestions & Possible Enhancements:
   ======================================================

1. ✅ Local Storage:
   - Already implemented via `saveData()` and `showTask()`

2. 🚫 Duplicate Task Validation (Not Yet Implemented):
   - Can add a check before appending new tasks to avoid redundancy.

3. ♿ Accessibility:
   - Add ARIA roles and labels for screen readers.
   - Example: <ul role="list"> and <li role="listitem">.

4. ⌨️ Keyboard Usability:
   - Allow pressing 'Enter' in the input field to trigger `addTask()`.
   - Suggestion: inputBox.addEventListener("keypress", function(e){ if(e.key === "Enter"){ addTask(); } });

5. 🎨 UX/Animations:
   - Add CSS transitions for smoother item add/remove actions.
   - Consider success/error toasts or animations on action feedback.

6. 🧪 Testing:
   - Unit test `addTask`, `saveData`, and `showTask` separately if extending the app.

7. 🛠 Future Feature Ideas:
   - Due dates, task categories, or priorities.
   - Dark mode toggle.
   - Edit functionality for existing tasks.

======================================================
*/
