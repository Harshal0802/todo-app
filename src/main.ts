import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(
  ".todo_container"
) as HTMLDivElement;

const todosInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todosInput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };

  todos.push(todo);
  todosInput.value = "";
  renderTodo(todos);
};

const generateTodo = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");

  todo.className = "todo";
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "text_cut" : "";
  };

  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerHTML = title;
  paragraph.className = isCompleted ? "text_cut" : "";

  const deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.innerHTML = "X";
  deleteButton.className = "deleteBtn";
  deleteButton.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkBox, paragraph, deleteButton);

  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerText = "";
  todos.forEach((item) => {
    generateTodo(item.title, item.isCompleted, item.id);
  });
};
