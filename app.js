const express = require('express');
const app = express();

let todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'JavaScript', completed: false }
];

// 미들웨어
// static 파일을 제공하는 루트 이름을 public으로 사용
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// get(REST API, (두개의 인수(request 객체, response 객체)를 가진)콜백함수)
// app.get('/', (req, res) => {
//     res.send('hello world!');
// });

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.post('/todos', (req, res) => {
    console.log(req.body);
    todos = [req, body, ...todos];
    res.send(todos);
});

app.patch('/todos/:id', (req, res) => {
    // 파라미터(값이 할당)
    const id = req.params.id;
    const completed = req.body.completed;
    todos = todos.map(todo => todo.id === +id ? {...todo, completed} : todo);
    res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== +id);
    res.send(todos);
});

// 비동기는 100% 콜백함수
// 서버를 가동
// listen(포트번호, 콜백함수)
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});