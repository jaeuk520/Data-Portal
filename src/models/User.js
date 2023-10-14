"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login(callback) {
    const client = this.body;
    UserStorage.getUserInfo(client.id, (error, userInfo) => {
      if (error) {
        callback({ success: false, msg: "존재하지 않는 아이디입니다." });
      } else {
        console.log('사용자 정보:', userInfo);
        const { id, password } = userInfo;
        if (id) {
          //유저 정보 일치 확인
          if (id === client.id && password === client.password) {
            callback({ success: true, userInfo: userInfo });
          } else {
            callback({ success: false, msg: "비밀번호가 틀렸습니다." });
          }
        }
      }
    });
  }

  register() {
    const client = this.body;
    const response = UserStorage.save(client);
    return response;
  }

  setApiKey() {
    const client = this.body;
    const response = UserStorage.setApiKey(client);
    return response;
  }
}

module.exports = User;