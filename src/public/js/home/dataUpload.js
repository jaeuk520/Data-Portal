"use strict";

const fileName = document.querySelector("#fileName"),
    uploadBtn = document.querySelector("button");

//login 버튼 클릭
uploadBtn.addEventListener("click", upload);

function upload() {
    const req = {
        fileName: fileName.value,
    };
    console.log(req);

    //axios 사용
    axios.post("/data/upload", req, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        const res = response.data;
        console.log(res);
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((error) => {
        console.error("Upload Error", error);
    });
}