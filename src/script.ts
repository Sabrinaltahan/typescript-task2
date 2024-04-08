// Step 1: Create the Todo interface
interface Todo {
    id: number; // Unique identifier for the todo
    task: string; // The text of the task itself
    completed: boolean; // A boolean variable to mark whether the task is complete or not
    priority: number; // An integer variable from 1 to 3 for priority, where 1 is most important and 3 is least important
    createdAt: Date; // Extended option: Date when the todo was created
}

// Step 2: Implement the TodoList class
class TodoList {
    todos: Todo[]; // Array of Todo
    nextId: number; // Next available id for new todos

    constructor() {
        this.todos = []; // Initialize todos array
        this.nextId = 1; // Initialize nextId to start from 1
        this.loadFromLocalStorage(); // Load todos from local storage if available
    }

    // Method to add a new todo
    addTodo(task: string, priority: number): boolean {
        // Check for valid task and priority
        if (task.trim() === '' || priority < 1 || priority > 3) {
            return false;
        }

        // Create a new todo object
        const newTodo: Todo = {
            id: this.nextId++, // Assign unique id
            task: task,
            completed: false,
            priority: priority,
            createdAt: new Date() // Set creation date
        };

        // Add the new todo to the todos array
        this.todos.push(newTodo);

        // Save todos to local storage
        this.saveToLocalStorage();

        return true;
    }

    // Method to edit an existing todo
    editTodo(todoId: number, newTask: string, newPriority: number): boolean {
        // Find the index of the todo with given id
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
        // Check if the todo with given id exists and new task/priority are valid
        if (todoIndex === -1 || newTask.trim() === '' || newPriority < 1 || newPriority > 3) {
            return false;
        }

        // Update task and priority of the todo
        this.todos[todoIndex].task = newTask;
        this.todos[todoIndex].priority = newPriority;

        // Save todos to local storage
        this.saveToLocalStorage();

        return true;
    }

    // Method to delete a todo
    deleteTodo(todoId: number): void {
        // Filter out the todo with given id
        this.todos = this.todos.filter(todo => todo.id !== todoId);

        // Save todos to local storage
        this.saveToLocalStorage();
    }

    // Method to mark a todo as completed
    markTodoCompleted(todoId: number): void {
        // Find the index of the todo with given id
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
        // Check if the todo with given id exists
        if (todoIndex !== -1) {
            // Mark the todo as completed
            this.todos[todoIndex].completed = true;

            // Save todos to local storage
            this.saveToLocalStorage();
        }
    }

    // Method to get all todos
    getTodos(): Todo[] {
        return this.todos;
    }

    // Method to save todos to local storage
    saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Method to load todos from local storage
    loadFromLocalStorage(): void {
        // Get todos from local storage
        const storedTodos = localStorage.getItem('todos');
        // Parse todos from JSON string if available
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);

            // Update nextId based on the maximum todo id
            this.nextId = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

            // Ensure that todos have createdAt property initialized
            this.todos.forEach(todo => {
                if (!todo.createdAt) {
                    todo.createdAt = new Date();
                }
            });
        }
    }
}

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form') as HTMLFormElement;
    const todoList = document.getElementById('todo-list') as HTMLElement;

    const todoListInstance = new TodoList();

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = ''; // Clear the existing list
        todoListInstance.getTodos().forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${todo.task} (Priority: ${todo.priority}) - Created at: ${todo.createdAt.toLocaleString()}`;
            if (todo.completed) {
                listItem.style.textDecoration = 'line-through';
            }
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the list item
                const newTask = prompt('Enter new task:', todo.task);
                const newPriority = parseInt(prompt('Enter new priority (1-3):', todo.priority.toString()) || '0');
                if (newTask !== null && newPriority !== 0) {
                    todoListInstance.editTodo(todo.id, newTask, newPriority);
                    renderTodos();
                }
            });
            listItem.appendChild(editButton);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the list item
                const confirmDelete = confirm('Are you sure you want to delete this todo?');
                if (confirmDelete) {
                    todoListInstance.deleteTodo(todo.id);
                    renderTodos();
                }
            });
            listItem.appendChild(deleteButton);
    
            listItem.addEventListener('click', () => {
                todoListInstance.markTodoCompleted(todo.id);
                renderTodos();
            });
            
            todoList.appendChild(listItem);
        });
    }
    

    // Render initial todos
    renderTodos();

    // Form submission handler
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.getElementById('task') as HTMLInputElement;
        const priorityInput = document.getElementById('priority') as HTMLInputElement;
        const task = taskInput.value.trim();
        const priority = parseInt(priorityInput.value);

        if (todoListInstance.addTodo(task, priority)) {
            taskInput.value = ''; // Clear the input field
            priorityInput.value = ''; // Clear the input field
            renderTodos(); // Render updated todos
        } else {
            alert('Please enter a valid task and priority (1-3).');
        }
    });
});
