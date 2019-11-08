let todos = [];

// DOMs
const $todos = document.querySelector('.todos');

const getTodos = () => {
    const xhr = new XMLHttpRequest();
    // open(메소드, url(절대경로, 상대경로 둘다가능))
    xhr.open('GET', '/todos');
    // request 발생 (그냥 요청만 보낼 뿐 주의)
    // payload있으면 넣어줌
    xhr.send();

    // response -> readyState value가 4일 때 서버 응답 완료 (성공(200)이든 실패(나머지)든,,)
    // status가 어느 순간이 될 때(어느 순간인지는 모르나), 콜백함수가 태스크큐로 들어감
    // 콜스택이 빌 때 실행
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            // 성공 경우 -> 백엔드에서 받은 todos 할당
            todos = JSON.parse(xhr.response);
            console.log('[getTodos]', todos);
            // render 호출 순서 주의!
            render();
        } else {
            // 실패 경우
            // status -> 404, statusText -> Not found
            console.error('Error!', xhr.status, xhr.statusText);
        }
    };
};

const render = () => {
    let html = '';
    // ...
};

getTodos();
// 순서가 보장이 안됨
// render();