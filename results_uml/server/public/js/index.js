let todos = [];

// DOMs
const $todos = document.querySelector('.todos');

const render = data => {
  console.log('RENDER');
  todos = data;

  let html = '';

  todos.forEach(({ id, content, completed }) => {
    html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`;
  });

  $todos.innerHTML = html;
};

const get = (url, f) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      f(JSON.parse(xhr.response));
    } else {
      console.error('Error', xhr.status, xhr.statusText);
    }
  };
};

const getTodos = () => {
  get('/todos', render);
};

getTodos();

