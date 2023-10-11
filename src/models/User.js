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
            console.error('오류 발생: ' + error);
            callback({ success: false, msg: "오류 발생" });
          } else {
            console.log('사용자 정보:', userInfo);
            const { id, password } = userInfo;
            console.log('ID:', id);
            console.log('비밀번호:', password);
    
            if (id) {
              if (id === client.id && password === client.password) {
                callback({ success: true });
              } else {
                callback({ success: false, msg: "비밀번호가 틀렸습니다." });
              }
            } else {
              callback({ success: false, msg: "존재하지 않는 아이디입니다." });
            }
          }
        });
      }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;