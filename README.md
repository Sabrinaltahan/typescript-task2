task:

Step 1: Create the Todo interface
Create a TypeScript interface Todo that defines the contract for a to-do task. The interface should contain the following properties:

task (the text of the task itself)
completed (a boolean variable to mark whether the task is complete or not)
priority
(an integer variable from 1 to 3 for priority, where 1 is most important and 3 is least important)
Step 2: Implement the Todo class
Implement a TypeScript class TodoList that implements the created interface. The class should have the following attributes and methods:

todos (an array of Todo items)
addTodo(task: string, priority: number): boolean (method to add new todos with priority. Return true if correct values ​​were entered for task and priority, false otherwise)
markTodoCompleted(todoIndex: number): void (method to mark todos as complete)
getTodos(): Todo[] (method to get the entire list of todos)
saveToLocalStorage(): void (method to save todos to LocalStorage)
loadFromLocalStorage(): void (method to get todos from LocalStorage)
Also use a constructor that initializes the todos array and loads the todos from LocalStorage when creating a new TodoList object.

Do not print to the DOM from your class file. This should be handled in your website. Return values ​​from your methods and use them in your website.

Checking that entered values ​​are correct is done in your class file. If the entered values ​​are incorrect, the method should return false, and an error message will be given in the website.

Step 3: Create a website
Create a simple website with the following functionality:

A form for adding new todos with task and priority text fields
An area to display a list of all todos
A button to mark todos as done
Use the TodoList class to handle the logic for adding and displaying todos. Also use LocalStorage to store todos between page views.

Step 4: Extend the functionality
Explore the possibility of adding additional features to your application, such as editing todos, deleting todos, or implementing a more advanced user interface. Date when a todo was created (as well as marked as done) can also be a good feature to add.

we used npm with typescript, 
first of all, we create the typescritp file with extentin ts, and wrote the interface and class required, in addition to all functions,
translate the ts file to js file using the typescript compiler, tsc
make the html index file, push to github

some commands used:
npm init
npm install --save-dev parcel
npm install -g typescript
npm install
tsc
npm run build
npm run start