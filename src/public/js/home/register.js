"use strict";

//documnet: 페이지 그 자체
//querySelector(): document 내의 요소를 검색하고 여러 결과를 찾았다면 첫 번째 요소만 리턴
const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerBtn = document.querySelector("button");

//register 버튼 클릭
registerBtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert("아이디를 입력해주세요.");
    if(password.value !== confirmPassword.value) return alert("비밀번호가 일치하지 않습니다.");
    
    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    };

    axios.post("/register", req, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        const res = response.data;
        if(res.success) {
            location.href = "/login";
        } else {
            alert(res.msg);
        }
    })
    .catch((error) => {
        console.error("register Error", error);
    });

    // fetch("/register", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req),
    // }).then((res) => res.json())
    //     .then((res) => {
    //         if(res.success) {
    //             location.href = "/login";
    //         } else {
    //             alert(res.msg);
    //         }
    //     })
    //     .catch((err) => {
    //         console.error("register Error");
    //     });
}