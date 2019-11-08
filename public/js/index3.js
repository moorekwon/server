let todos = [];

const $todos = document.querySelector(.todos);
const $input = document.querySelector(.input-todo);

const render = data => {
    todos = data;

    let html = '';

    todos.forEach(({ id, content, completed }) => {
        html += `
        <li id=${id} class="todo-item">
            <input type="checkbox" id="ck-${id}" class="checkbox" ${completed ? 'checked' : ''}>
            <label for="ck-${id}">${content}</label>
            <button clss="remove-todo">X</button>
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
            // 비동기 함수이기 때문에 return을 못함 -> getTodos(); 후(콜스택이 비면) undefined 반환
            // -> 콜백 함수로 후속 처리 해야함 (get('', 콜백함수))
            // return JSON.parse(xhr.response;

            // xhr.response는 문자열
            f(JSON.parse(xhr.response));
        } else {
            // try(던지면) catch(잡는다)로 에러 처리
            throw new Error('xhr.status');
        }
    };
};

const post = (url, payload, f) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            f(JSON.parse(xhr.response));
        } else {
            throw new Error('xhr.status');
        }
    };
};

const patch = (url, payload, f) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            f(JSON.parse(xhr.response));
        } else {
            throw new Error('xhr.status');
        }
    };
};

const del = (url, f) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            f(JSON.parse(xhr.response));
        } else {
            throw new Error('xhr.status');
        }
    };
};

const getTodos = () => {
    get('/todos', render);
};

window.onload = getTodos;

const generateId = () => {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};

$input.onkeyup = ({ target, keyCode }) => {
    const content = target.vlaue.trim();
    if ( !content || keyCode !== 13) return;
    target.value = '';

    // payload 백엔드로 전달
    const newTodo = { id: generateId(), content, completed: false };
    post('/todos', { id: generateId(), content, completed: false }, render);
};

$todos.onchange = ({ target }) => {
    // 필요한 정보: id, completed 값
    const id = target.parentNode.id;
    const completed = !todos.find(todo => todo.id === +id).completed;
    patch(`/todos/${id}`, { completed }, render);
};

$todos.onclick = ({ target }) => {
    // 필요한 정보: id 값
    if (!target.classList.contains('remove-todo')) return;
    const id = target.parentNode.id;
    del(`/todos/${id}`, render);
};


