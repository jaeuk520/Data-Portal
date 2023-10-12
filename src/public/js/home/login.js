"use strict";

//const axios = require("axios");

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("button");

//login 버튼 클릭
loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        password: password.value,
    };

    //axios 사용
    axios.post("/login", req, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        const res = response.data;
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((error) => {
        console.error("Login Error", error);
    });
}