"use strict";

//documnet: 페이지 그 자체
//querySelector(): document 내의 요소를 검색하고 여러 결과를 찾았다면 첫 번째 요소만 리턴
//#(샵) : private 
const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerBtn = document.querySelector("button");

//정규표현식
const idRegexToString = '^(?=.*[a-zA-Z])(?=.*[0-9]).{5,12}$', 
    nameRegexToString = '^[가-힣]{2,4}$',
    pwRegexToString = '^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$';

//알림 메시지
const validateInputAlaertMsg = "빈 칸을 입력해주세요.",
    validateIdRegexAlertMsg = "아이디는 5자 이상, 12자 이하의 영문, 숫자 조합이어야 합니다.",
    validateNameRegexMsg = "이름은 2자 이상, 4자 이하의 한글 조합이어야 합니다.",
    validatePasswordRegexMsg = "비밀번호는 8자 이상, 12자 이하의 영문, 숫자, 특수문자 조합이어야 합니다.",
    validatePasswordMsg = "비밀번호가 일치하지 않습니다.";

//register 버튼 클릭
registerBtn.addEventListener("click", register);

function register() {
    if(!validateInput(id.value, name.value, password.value, confirmPassword.value)) return alert(validateInputAlaertMsg);
    if(!validateIdRegex(id.value)) return alert(validateIdRegexAlertMsg);
    if(!validateNameRegex(name.value)) return alert(validateNameRegexMsg);
    if(!validatePasswordRegex(password.value)) return alert(validatePasswordRegexMsg);
    if(!validatePassword(password.value, confirmPassword.value)) return alert(validatePasswordMsg);
    
    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    };

    //POST
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
}

// 빈 칸 입력 유효성 검사
function validateInput(id, name, password, confirmPassword){
    if((!id) || (!name) || (!password) || (!confirmPassword)) {
        return false
    }
    return true
}

// 아이디 형식 검사
function validateIdRegex(id) {
    const idRegex = new RegExp(idRegexToString)
    if(!idRegex.test(id)) {
        return false
    }
    return true
}

// 이름 형식 검사
function validateNameRegex(name) {
    const nameRegex = new RegExp(nameRegexToString)
    if(!nameRegex.test(name)) {
        return false
    }
    return true
}

// 비밀번호 형식 검사
function validatePasswordRegex(password) {
    const pwRegex = new RegExp(pwRegexToString)
    if(!pwRegex.test(password)) {
        return false
    }
    return true
}

// 비밀번호, 비밀번호 확인 일치 검사
function validatePassword(password, confirmPassword){
    if(password != confirmPassword) {
        return false
    }
    return true
}