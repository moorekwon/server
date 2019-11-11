let todos = [];

// console.log(axios);

const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');

const render = () => {

    let html = '';

    todos.forEach(({
        id,
        content,
        completed
    }) => {
        html += `
        <li id=${id} class="todo-item">
            <input type="checkbox" id="ck-${id}" class="checkbox" ${completed ? 'checked' : ''}>
            <label for="ck-${id}">${content}</label>
            <button clss="remove-todo">X</button>
        </li>`;
    });
    $todos.innerHTML = html;
};

// 비동기 함수
// const ajax = (() => {
//     // promise 사용
//     const req = (method, url, payload) => {
//         return new Promise(resolve, reject) => {
//             const xhr = new XMLHttpRequest();
//             xhr.open(method, url);
//             xhr.setRequestHeader('content-type', 'application/json');
//             xhr.send(JSON.stringify(payload));

//             // xhr.onreadystatechange = () => {
//             //     if (xhr.readyState !== XMLHttpRequest.DONE) return;
//             //     if (xhr.status === 200) {
//             //         resolve(JSON.parse(xhr.response));
//             //     } else {
//             //         reject(new Error(xhr.status));
//             //     }
//             // };

//             xhr.onload = () => {
//                 if (xhr.status === 200 || xhr.status === 201) {
//                     resolve(JSON.parse(xhr.response));
//                 } else {
//                     reject(new Error(xhr.status));
//                 }
//             };
//         };
//     };

//     // req('GET', '/todos');
//     // // .then(함수) .catch(함수)
//     // // res = JSON.parse(xhr.response)
//     // .then(res => todos = res)
//     //     .then(render)
//     //     // catch = new Error(xhr.status)
//     //     .catch(err => console.error(err));

//     return {
//         get(url) {
//             return req('GET', url);
//         },
//         post(url, payload) {
//             return req('POST', url, payload);
//         }
//         patch(url, payload) {
//             return req('PATCH', url, payload)
//         }
//         delete(url) {
//             return req('DELETE', url);
//         }
//     };
// }());

// const getTodos = () => {
//     ajax.get('/todos')
//         .then(_todos => todos = _todos)
//         .then(render);
// };

const getTodos = () => {
    axios.get('/todos')
        .then(res => todos = res.data)
        .then(render)
        .catch(err => console.error(err));

    // fetch 빌트인 함수
    // fetch('/todos')
    // JSON.parse
    // .then(res => res.json())
    // .then(render)
    // .catch(err => console.error(err));
};

const generateId = () => {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};

const addTodo = content => {
    // ajax.post('/todos', {
    //         id: generateId(),
    //         content,
    //         completed: false
    //     })
    //     .then(_todos => todos = _todos)
    //     .then(render)
    //     .catch(err => console.err(err));

    axios.post('/todos', {
            id: generateId(),
            content,
            completed: false
        })
        .then(res => todos = res.data)
        .then(render)
        .catch(err => console.error(err));

    // fetch('/todos', {
    //         method: 'POST',
    // payload가 필요하므로 추가
    // headers: {
    //     'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         id: generateId(),
    //         content,
    //         completed: false
    //     })
    // })
    // .then(res => res.json())
    // .then(_todos => todos = _todos)
    // .then(render)
    // .catch(err => console.error(err));
};

const toggleCompleted = (id, completed) => {
    axios.patch(`/todos/${id}`, {
            completed
        })
        .then(res => todos = res.data)
        .then(render)
        .catch(err => console.error(err));

    // fetch(`/todos/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             completed
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(_todos => todos = _todos)
    //     .then(render)
    //     .catch(err => console.err(err));
};

const removeTodo = id => {
    fetch(`/todos/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(render)
        .catch(err => console.err(err));
};


window.onload = getTodos;

$input.onkeyup = ({
    target,
    keyCode
}) => {
    const content = target.value.trim();
    if (!content || keyCode !== 13) return;
    target.value = '';
    addTodo(content);
};

$todos.onchange = ({
    target
}) => {
    const id = target.parentNode.id;
    const completed = !todos.find(todo => todo.id === +id).completed;
    toggleCompleted(id, completed);
};

$todos.onclick = ({
    target
}) => {
    const id = target.parentNode.id;
    if (!target.classList.contains('remove-todo')) return;
    removeTodo(id);
};