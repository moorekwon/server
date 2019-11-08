// 범용적으로 GET함수 쓰기
const render = data => {
    todos = data;
};

// f = render
const get = (url, f) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            // f = render
            f(JSON.parse(xhr.response));
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    };
};

const getTodos = () => {
    // 순서 보장을 위해 get() 내부에 render를 콜백함수로 넣어야 함 (따로 밑에 render(); 호출 안됨)
    // render = f
    get('/todos', render);
    // 순서 보장 안됨
    // get('/todos');
    // render();
};
getTodos();

