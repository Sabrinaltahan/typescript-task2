Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(){this.todos=[],this.nextId=1,this.loadFromLocalStorage()}addTodo(t,e){if(""===t.trim()||e<1||e>3)return!1;let o={id:this.nextId++,task:t,completed:!1,priority:e,createdAt:new Date};return this.todos.push(o),this.saveToLocalStorage(),!0}editTodo(t,e,o){let d=this.todos.findIndex(e=>e.id===t);return -1!==d&&""!==e.trim()&&!(o<1)&&!(o>3)&&(this.todos[d].task=e,this.todos[d].priority=o,this.saveToLocalStorage(),!0)}deleteTodo(t){this.todos=this.todos.filter(e=>e.id!==t),this.saveToLocalStorage()}markTodoCompleted(t){let e=this.todos.findIndex(e=>e.id===t);-1!==e&&(this.todos[e].completed=!0,this.saveToLocalStorage())}getTodos(){return this.todos}saveToLocalStorage(){localStorage.setItem("todos",JSON.stringify(this.todos))}loadFromLocalStorage(){let t=localStorage.getItem("todos");t&&(this.todos=JSON.parse(t),this.nextId=Math.max(...this.todos.map(t=>t.id),0)+1,this.todos.forEach(t=>{t.createdAt||(t.createdAt=new Date)}))}}document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("todo-form"),o=document.getElementById("todo-list"),d=new t;function i(){o.innerHTML="",d.getTodos().forEach((t,e)=>{let a=document.createElement("li");a.textContent=`${t.task} (Priority: ${t.priority}) - Created at: ${t.createdAt.toLocaleString()}`,t.completed&&(a.style.textDecoration="line-through");let r=document.createElement("button");r.textContent="Edit",r.addEventListener("click",e=>{e.stopPropagation();let o=prompt("Enter new task:",t.task),a=parseInt(prompt("Enter new priority (1-3):",t.priority.toString())||"0");null!==o&&0!==a&&(d.editTodo(t.id,o,a),i())}),a.appendChild(r);let n=document.createElement("button");n.textContent="Delete",n.addEventListener("click",e=>{e.stopPropagation(),confirm("Are you sure you want to delete this todo?")&&(d.deleteTodo(t.id),i())}),a.appendChild(n),a.addEventListener("click",()=>{d.markTodoCompleted(t.id),i()}),o.appendChild(a)})}i(),e.addEventListener("submit",function(t){t.preventDefault();let e=document.getElementById("task"),o=document.getElementById("priority"),a=e.value.trim(),r=parseInt(o.value);d.addTodo(a,r)?(e.value="",o.value="",i()):alert("Please enter a valid task and priority (1-3).")})});
//# sourceMappingURL=index.eb27d92b.js.map
